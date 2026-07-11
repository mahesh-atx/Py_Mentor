/**
 * Context-aware system prompt builder (server-only)
 *
 * Turns the page the learner is currently on into a grounded system prompt so
 * the mentor can actually teach instead of answering in a vacuum. It pulls:
 *   - the current lesson's markdown (via CurriculumService)
 *   - the current exercise's description + starter code (via CurriculumService)
 *   - the learner's code-in-editor (sent from the practice client)
 *   - saved learner memory — weak topics, preferred explanation style
 *     (via MemoryService)
 *
 * Everything here is best-effort: if the DB lookup fails or a context piece is
 * missing, we just omit it and still return a usable prompt.
 */

import { CurriculumService } from "@/lib/services/curriculum.service";
import { MemoryService } from "@/lib/services/memory.service";
import type { ChatMessage } from "./llm";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * What the mentor should know about the learner's current situation. Sent from
 * the client on each request. All fields optional — the mentor works on any
 * page, context just makes it sharper.
 */
export interface MentorContext {
  /** Topic slug (the `[slug]` on `/learn/[slug]`). */
  topicSlug?: string;
  /** Exercise slug (the `[slug]` on `/practice/[slug]`). */
  exerciseSlug?: string;
  /** The learner's current code from the editor (practice/projects pages). */
  code?: string;
  /** The current URL path, used as a fallback signal of where the user is. */
  path?: string;
  /** Optional label of the current page (e.g. "Lesson: For Loops"). */
  pageLabel?: string;
}

// ---------------------------------------------------------------------------
// Persona
// ---------------------------------------------------------------------------

const MENTOR_PERSONA = `You are PyMentor, a patient, encouraging AI mentor for self-learners studying Python (and later, other programming languages). You teach through the PyMentor web app, where users read lessons, solve exercises, take quizzes, and build projects.

Your teaching principles:
- BE CONCISE by default. Favor short, clear explanations over walls of text. Use a friendly, human tone.
- ALWAYS ground your answer in what the learner is currently working on when context is provided.
- Lead with intuition, then a small, runnable code example. Keep examples minimal.
- Use Markdown. Use \`\`\`python fenced code blocks for code. Use > [!TIP] / > [!WARNING] / > [!NOTE] GitHub-style callouts sparingly for emphasis.
- Be a Socratic guide, not an answer machine: when the learner seems stuck or asks a vague question, ask one clarifying question OR give the next concrete step.
- SCAFFOLD, don't spoil. If asked to "debug my code" or "fix this", point out the problem and the *why*, then suggest the fix — don't silently rewrite the whole thing unless asked.
- Correct misconceptions gently. Never make the learner feel dumb.

GUIDANCE — what the learner can ask: One of your jobs is helping learners who don't know what to ask. When the user's question is vague, broad, or open-ended (e.g. "help", "idk", "what now", "explain"), end your reply with a short line listing 2-3 SPECIFIC things they could ask next, formatted EXACTLY as:
>>> What you can ask next:
- <short specific question>
- <short specific question>
- <short specific question>
Make each suggestion concrete and tied to their current topic when known. Do not add suggestions when the question was already specific.`;

// ---------------------------------------------------------------------------
// Context assembly
// ---------------------------------------------------------------------------

interface ResolvedContext {
  /** Human-readable section describing where the learner is + relevant content. */
  block: string;
}

/**
 * Fetch the richest context we can from the curriculum DB based on the
 * provided slugs. Returns an empty block if nothing matches — the caller will
 * simply skip it.
 */
async function resolveCurriculumContext(
  ctx: MentorContext,
): Promise<ResolvedContext> {
  const parts: string[] = [];

  // --- Lesson / topic context ------------------------------------------------
  // Lessons are routed by topic slug, so topicSlug is the key. We also try the
  // exercise's parent topic when only an exerciseSlug is supplied.
  let topicSlug: string | undefined = ctx.topicSlug;
  if (!topicSlug && ctx.exerciseSlug) {
    const ex = await CurriculumService.getExerciseBySlug(ctx.exerciseSlug).catch(() => null);
    topicSlug = ex?.topic?.slug ?? undefined;
  }

  if (topicSlug) {
    const topic = await CurriculumService.getTopicBySlugGlobal(topicSlug).catch(() => null);
    if (topic) {
      const loc = [topic.module?.roadmap?.title, topic.module?.title, topic.title]
        .filter(Boolean)
        .join(" › ");
      if (loc) parts.push(`The learner is on: ${loc}.`);

      const lesson = topic.lessons?.[0];
      if (lesson?.content) {
        // Cap lesson content so we don't blow the context window on huge lessons.
        const max = 4000;
        const content =
          lesson.content.length > max
            ? lesson.content.slice(0, max) + "\n…[lesson truncated]"
            : lesson.content;
        parts.push(`Current lesson ("${lesson.title}") reference material:\n\n${content}`);
      }
    }
  }

  // --- Exercise context ------------------------------------------------------
  if (ctx.exerciseSlug) {
    const exercise = await CurriculumService.getExerciseBySlug(ctx.exerciseSlug).catch(() => null);
    if (exercise) {
      parts.push(
        `The learner is solving the exercise "${exercise.title}".\nExercise description:\n${exercise.description}`,
      );
    }
  }

  // --- Learner code ----------------------------------------------------------
  if (ctx.code && ctx.code.trim().length > 0) {
    const max = 2500;
    const code =
      ctx.code.length > max ? ctx.code.slice(0, max) + "\n…[code truncated]" : ctx.code;
    parts.push(`The learner's current code in the editor:\n\n\`\`\`python\n${code}\n\`\`\``);
  }

  // --- Path fallback ---------------------------------------------------------
  if (parts.length === 0 && ctx.path) {
    parts.push(`The learner is currently viewing the page at "${ctx.path}".`);
  }
  if (ctx.pageLabel && parts.length === 0) {
    parts.push(`Current page: ${ctx.pageLabel}.`);
  }

  return { block: parts.join("\n\n") };
}

/**
 * Pull the learner's saved memory (weak topics, preferred explanation style).
 * Missing/empty memory is fine — we just skip it.
 */
async function resolveMemoryContext(userId: string): Promise<string> {
  const [weakTopics, style] = await Promise.all([
    MemoryService.getMemory(userId, "weak_topics").catch(() => null),
    MemoryService.getMemory(userId, "explanation_style").catch(() => null),
  ]);

  const parts: string[] = [];
  if (weakTopics && (Array.isArray(weakTopics) ? weakTopics.length > 0 : true)) {
    parts.push(
      `Learner's known weak areas (give these a little extra care when relevant): ${JSON.stringify(weakTopics)}`,
    );
  }
  if (style) {
    parts.push(`Learner's preferred explanation style: ${JSON.stringify(style)}`);
  }
  return parts.join("\n");
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Build the full message array for a mentor turn, with a grounded system prompt
 * prepended to the conversation history.
 *
 * @param userId  The local learner's id (for memory lookups).
 * @param history The conversation so far (no system message; we add it).
 * @param ctx     Page context from the client (optional but recommended).
 * @returns       Messages ready to pass to `streamChat`.
 */
export async function buildMentorMessages(
  userId: string,
  history: ChatMessage[],
  ctx: MentorContext = {},
): Promise<ChatMessage[]> {
  const [curriculum, memory] = await Promise.all([
    resolveCurriculumContext(ctx),
    resolveMemoryContext(userId),
  ]);

  const systemParts = [MENTOR_PERSONA];
  if (curriculum.block) systemParts.push(`--- LEARNER CONTEXT ---\n${curriculum.block}`);
  if (memory) systemParts.push(`--- LEARNER MEMORY ---\n${memory}`);
  systemParts.push("--- END CONTEXT ---\nAnswer the learner now.");

  const system: ChatMessage = {
    role: "system",
    content: systemParts.join("\n\n"),
  };

  return [system, ...history];
}

/** Suggested starter questions, adapted to where the learner is. */
export function getSuggestedQuestions(ctx: MentorContext = {}): string[] {
  if (ctx.code) {
    return [
      "My code isn't working — help me debug",
      "Give me a hint, not the full answer",
      "Review my approach and suggest improvements",
      "Explain what my code is doing step by step",
    ];
  }
  if (ctx.exerciseSlug) {
    return [
      "Give me a hint to get started",
      "Explain what this exercise is asking",
      "Show me a small example",
    ];
  }
  if (ctx.topicSlug) {
    return [
      "Explain this lesson in simple terms",
      "What are common mistakes beginners make here?",
      "Give me a practice problem",
      "Show me a real-world example",
    ];
  }
  return [
    "Quiz me on something I should know",
    "What should I learn next?",
    "Explain a Python concept I'm shaky on",
  ];
}
