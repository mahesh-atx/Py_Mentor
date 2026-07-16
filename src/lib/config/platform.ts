export type PlatformLanguage = "python";

export interface PlatformConfig {
  appName: string;
  language: PlatformLanguage;
  languageCapitalized: string;
}

export function getPlatformConfig(): PlatformConfig {
  return {
    appName: "PyMentor",
    language: "python",
    languageCapitalized: "Python",
  };
}
