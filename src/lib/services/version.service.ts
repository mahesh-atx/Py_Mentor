import packageJson from "../../../package.json";

export interface VersionInfo {
  currentVersion: string;
  latestVersion: string;
  updateAvailable: boolean;
}

export class VersionService {
  static async checkUpdate(): Promise<VersionInfo> {
    const currentVersion = packageJson.version;
    
    try {
      // Fetch the latest version info from NPM registry
      const response = await fetch("https://registry.npmjs.org/pymentor/latest", {
        next: { revalidate: 3600 } // Cache for 1 hour to avoid spamming NPM
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch latest version");
      }
      
      const data = await response.json();
      const latestVersion = data.version;
      
      // Simple string comparison works for semantic versioning assuming same major/minor digits format
      // Better approach using basic parts comparison
      const updateAvailable = this.compareVersions(latestVersion, currentVersion) > 0;
      
      return {
        currentVersion,
        latestVersion,
        updateAvailable
      };
    } catch (error) {
      console.error("Error checking for updates:", error);
      // Fail gracefully
      return {
        currentVersion,
        latestVersion: currentVersion,
        updateAvailable: false
      };
    }
  }

  // Returns > 0 if v1 > v2, < 0 if v1 < v2, 0 if equal
  private static compareVersions(v1: string, v2: string): number {
    const p1 = v1.split('.').map(Number);
    const p2 = v2.split('.').map(Number);
    
    for (let i = 0; i < Math.max(p1.length, p2.length); i++) {
      const num1 = p1[i] || 0;
      const num2 = p2[i] || 0;
      if (num1 > num2) return 1;
      if (num1 < num2) return -1;
    }
    return 0;
  }
}
