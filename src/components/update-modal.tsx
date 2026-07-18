"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Copy, DownloadCloud, HardDrive, Terminal, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { VersionInfo } from "@/lib/services/version.service";
import { Progress } from "@/components/ui/progress";

interface UpdateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  versionInfo: VersionInfo | null;
}

export function UpdateModal({ open, onOpenChange, versionInfo }: UpdateModalProps) {
  const [copied, setCopied] = useState(false);
  const [updateState, setUpdateState] = useState<'available' | 'downloading' | 'ready' | 'error'>('available');
  const [progress, setProgress] = useState(0);
  const [isElectron, setIsElectron] = useState(false);
  const updateCommand = "npm install -g pymentor@latest";

  useEffect(() => {
    if (typeof window !== 'undefined' && window.electron) {
      setIsElectron(true);
      
      window.electron.onDownloadProgress((info) => {
        setUpdateState('downloading');
        setProgress(Math.round(info.percent));
      });
      
      window.electron.onUpdateDownloaded(() => {
        setUpdateState('ready');
      });
      
      window.electron.onError((error) => {
        setUpdateState('error');
        toast.error("Failed to download update: " + error);
      });
      
      return () => {
        if (window.electron) window.electron.removeAllListeners();
      };
    }
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(updateCommand);
      setCopied(true);
      toast.success("Command copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy command");
    }
  };

  const handleDownload = () => {
    if (window.electron) {
      setUpdateState('downloading');
      setProgress(0);
      window.electron.downloadUpdate();
    }
  };

  const handleInstall = () => {
    if (window.electron) {
      window.electron.installUpdate();
    }
  };

  if (!versionInfo) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-border/50 bg-background/95 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <DownloadCloud className="h-6 w-6 text-primary" />
            Update Available
          </DialogTitle>
          <DialogDescription className="text-base pt-2">
            A new version of PyMentor (<span className="font-semibold text-primary">v{versionInfo.latestVersion}</span>) is available! You are currently on v{versionInfo.currentVersion}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-start gap-3">
            <HardDrive className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground">Your Data is Safe</p>
              <p className="text-muted-foreground mt-1">
                Your progress and database are securely stored in your <code className="bg-muted px-1 py-0.5 rounded text-xs">~/.pymentor</code> directory. Updating will <strong>not</strong> delete or overwrite your data.
              </p>
            </div>
          </div>

          {isElectron ? (
            <div className="space-y-4">
              {updateState === 'available' && (
                <Button className="w-full h-12 text-md" onClick={handleDownload}>
                  Download Update
                </Button>
              )}
              {updateState === 'downloading' && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Downloading...
                    </span>
                    <span className="font-medium">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}
              {updateState === 'ready' && (
                <Button className="w-full h-12 text-md bg-green-600 hover:bg-green-700 text-white" onClick={handleInstall}>
                  Restart & Install Update
                </Button>
              )}
              {updateState === 'error' && (
                <Button className="w-full h-12 text-md" variant="destructive" onClick={handleDownload}>
                  Retry Download
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Run this command in your terminal to update:</label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Terminal className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <input 
                    readOnly 
                    value={updateCommand}
                    className="flex h-12 w-full rounded-md border border-input bg-muted/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 font-mono"
                  />
                </div>
                <Button size="icon" className="h-12 w-12 shrink-0" onClick={handleCopy}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Note: You may need to stop PyMentor (<kbd className="px-1.5 py-0.5 bg-muted rounded border border-border text-[10px]">Ctrl+C</kbd>) before running the update on Windows to avoid file locks.
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
