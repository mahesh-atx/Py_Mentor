import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date deterministically so server and client render the same string.
 * Uses "en-US" locale to avoid hydration mismatches from differing system locales.
 *
 * @example formatDate(new Date())          // "Jul 14, 2026"
 * @example formatDate(new Date(), "short") // "Jul 14"
 */
export function formatDate(date: Date, style: "full" | "short" = "full"): string {
  if (style === "short") {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  }
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}
