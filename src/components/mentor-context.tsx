"use client";

/**
 * MentorContext
 *
 * Lets any page declare what the learner is currently doing so the floating AI
 * Mentor can give grounded, relevant answers instead of generic ones.
 *
 * Usage (server components that render a client island):
 *   <MentorContextProvider topicSlug="for-loops" pageLabel="Lesson: For Loops">
 *     {children}
 *   </MentorContextProvider>
 *
 * Usage (client components with live state, e.g. the editor):
 *   const updateMentorCtx = useMentorContextUpdater();
 *   updateMentorCtx({ code });
 *
 * The floating mentor reads the resolved context and sends it with every
 * request to /api/ai-mentor.
 */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface MentorContextValue {
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

interface MentorContextState {
  /** The static context declared by the page. */
  base: MentorContextValue;
  /** Live updates (e.g. current editor code) layered on top of the base. */
  live: Partial<MentorContextValue>;
  /** Replace the base context (used by page providers). */
  setBase: (value: MentorContextValue) => void;
  /** Patch live values (e.g. code). Shallow-merged over the base. */
  patchLive: (value: Partial<MentorContextValue>) => void;
  /** The fully-merged context actually sent to the mentor. */
  resolved: MentorContextValue;
}

const MentorContext = createContext<MentorContextState | null>(null);

export function MentorContextProvider({
  children,
  ...initial
}: MentorContextValue & { children: ReactNode }) {
  const [base, setBase] = useState<MentorContextValue>(initial);
  const [live, setLive] = useState<Partial<MentorContextValue>>({});

  const patchLive = useCallback((value: Partial<MentorContextValue>) => {
    setLive((prev) => ({ ...prev, ...value }));
  }, []);

  const resolved = useMemo<MentorContextValue>(
    () => ({ ...base, ...live }),
    [base, live],
  );

  const value = useMemo<MentorContextState>(
    () => ({ base, live, resolved, setBase, patchLive }),
    [base, live, resolved, setBase, patchLive],
  );

  return <MentorContext.Provider value={value}>{children}</MentorContext.Provider>;
}

/** Read the fully-resolved mentor context (used by the floating mentor). */
export function useMentorContext(): MentorContextValue {
  const ctx = useContext(MentorContext);
  // Outside a provider, return an empty context — the mentor still works,
  // just without page grounding.
  return ctx?.resolved ?? {};
}

/**
 * Patch live values into the nearest provider. Used by the code editor to share
 * the learner's current code with the mentor. No-op (and safe) when no provider
 * is mounted.
 */
export function useMentorContextUpdater(): (value: Partial<MentorContextValue>) => void {
  const ctx = useContext(MentorContext);
  return ctx?.patchLive ?? noop;
}

const noop = () => {};
