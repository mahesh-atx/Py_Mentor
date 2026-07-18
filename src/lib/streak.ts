/**
 * Streak calculation — pure helper (no DB access, unit-testable).
 *
 * A streak is the number of consecutive days with activity, counting
 * backwards from today. The streak is still ALIVE when the most recent
 * activity was yesterday (the user has the whole of today to continue
 * it) — so it must not show 0 just because nothing was done yet today.
 */

const DAY_MS = 24 * 60 * 60 * 1000;

function dayStart(d: Date): number {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  return copy.getTime();
}

/**
 * @param activityDates  Dates with recorded activity (any order, may contain duplicates)
 * @param today          Reference "today" (injectable for tests)
 * @returns              Current streak length in days (0 when the streak is dead)
 */
export function computeCurrentStreak(
  activityDates: readonly Date[],
  today: Date = new Date()
): number {
  if (activityDates.length === 0) return 0;

  // Normalize: unique calendar days, most recent first
  const days = Array.from(new Set(activityDates.map(dayStart))).sort(
    (a, b) => b - a
  );

  const todayStart = dayStart(today);
  const gapToToday = Math.round((todayStart - days[0]) / DAY_MS);

  // Most recent activity must be today or yesterday, otherwise the streak is dead
  if (gapToToday > 1) return 0;

  let streak = 0;
  let expected = todayStart - gapToToday * DAY_MS;
  for (const day of days) {
    if (day === expected) {
      streak++;
      expected -= DAY_MS;
    } else if (day < expected) {
      break;
    }
  }
  return streak;
}
