export interface ElectronUpdaterAPI {
  checkForUpdates: () => void;
  downloadUpdate: () => void;
  installUpdate: () => void;
  onUpdateAvailable: (callback: (info: any) => void) => void;
  onUpdateNotAvailable: (callback: (info: any) => void) => void;
  onDownloadProgress: (callback: (progress: any) => void) => void;
  onUpdateDownloaded: (callback: (info: any) => void) => void;
  onError: (callback: (error: string) => void) => void;
  getVersion: () => Promise<string>;
  removeAllListeners: () => void;
}

declare global {
  interface Window {
    electron?: ElectronUpdaterAPI;
  }
}
