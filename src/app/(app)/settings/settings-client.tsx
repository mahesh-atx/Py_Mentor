"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Monitor, Moon, Sun, Bell, Shield, UserCog, DownloadCloud } from "lucide-react";
import { usePlatform } from "@/components/platform-provider";
import { toast } from "sonner";

export function SettingsClient() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [version, setVersion] = useState("…");
  const [isChecking, setIsChecking] = useState(false);
  const config = usePlatform();

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined' && window.electron) {
      window.electron.getVersion().then(v => setVersion(v));
    } else {
      // Web/CLI mode: ask the server for the real app version instead of
      // showing a hardcoded (and quickly stale) fallback.
      fetch("/api/version")
        .then(r => (r.ok ? r.json() : null))
        .then(data => { if (data?.currentVersion) setVersion(data.currentVersion); })
        .catch(() => setVersion("unknown"));
    }
  }, []);

  const handleCheckUpdates = () => {
    setIsChecking(true);
    if (typeof window !== 'undefined' && window.electron) {
      window.electron.checkForUpdates();
      toast.info("Checking for updates...");
      setTimeout(() => setIsChecking(false), 2000);
    } else {
      toast.error("Updates are only available in the Desktop App");
      setIsChecking(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account preferences and application settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-1">
          <Button variant="secondary" className="w-full justify-start">
            <UserCog className="mr-2 h-4 w-4" />
            General
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Monitor className="mr-2 h-4 w-4" />
            Appearance
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Shield className="mr-2 h-4 w-4" />
            Privacy
          </Button>
        </div>

        <div className="md:col-span-3 space-y-6">
          <div className="group relative overflow-hidden flex flex-col p-6 sm:p-8 rounded-3xl border border-border/50 bg-card/30 hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="mb-8 relative z-10">
              <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">Appearance</h3>
              <p className="text-muted-foreground mt-1">Customize how {config.appName} looks on your device.</p>
            </div>
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-border/50">
                <div className="space-y-1">
                  <Label className="text-base font-semibold">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Switch between light and dark themes.</p>
                </div>
                <Switch 
                  checked={mounted && theme === 'dark'} 
                  onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')} 
                />
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden flex flex-col p-6 sm:p-8 rounded-3xl border border-border/50 bg-card/30 hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="mb-8 relative z-10">
              <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">Notifications</h3>
              <p className="text-muted-foreground mt-1">Configure how you receive alerts and updates.</p>
            </div>
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-border/50">
                <div className="space-y-1">
                  <Label className="text-base font-semibold">Daily Reminders</Label>
                  <p className="text-sm text-muted-foreground">Get reminded to keep your learning streak.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-border/50">
                <div className="space-y-1">
                  <Label className="text-base font-semibold">Product Updates</Label>
                  <p className="text-sm text-muted-foreground">Receive news about new courses and features.</p>
                </div>
                <Switch defaultChecked={false} />
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden flex flex-col p-6 sm:p-8 rounded-3xl border border-border/50 bg-card/30 hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="mb-8 relative z-10">
              <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">About & Updates</h3>
              <p className="text-muted-foreground mt-1">Keep your {config.appName} app up to date.</p>
            </div>
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-border/50">
                <div className="space-y-1">
                  <Label className="text-base font-semibold">Current Version</Label>
                  <p className="text-sm text-muted-foreground">Version {version}</p>
                </div>
                <Button 
                  onClick={handleCheckUpdates} 
                  disabled={isChecking}
                  className="flex items-center gap-2"
                >
                  <DownloadCloud className="h-4 w-4" />
                  {isChecking ? "Checking..." : "Check for Updates"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
