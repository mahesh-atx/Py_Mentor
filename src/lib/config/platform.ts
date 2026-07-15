export type PlatformLanguage = "python" | "javascript";

export interface PlatformConfig {
  appName: string;
  language: PlatformLanguage;
  languageCapitalized: string;
}

export function getPlatformConfig(): PlatformConfig {
  // Read purely from server environment variables (no NEXT_PUBLIC_)
  const lang = (process.env.SEED_LANG || "python").toLowerCase();
  
  if (lang === "javascript") {
    return {
      appName: "JSMentor",
      language: "javascript",
      languageCapitalized: "JavaScript",
    };
  }

  return {
    appName: "PyMentor",
    language: "python",
    languageCapitalized: "Python",
  };
}
