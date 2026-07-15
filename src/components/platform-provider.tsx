"use client";

import React, { createContext, useContext } from "react";
import type { PlatformConfig } from "@/lib/config/platform";

const PlatformContext = createContext<PlatformConfig | null>(null);

export function PlatformProvider({
  config,
  children,
}: {
  config: PlatformConfig;
  children: React.ReactNode;
}) {
  return (
    <PlatformContext.Provider value={config}>
      {children}
    </PlatformContext.Provider>
  );
}

export function usePlatform(): PlatformConfig {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error("usePlatform must be used within a PlatformProvider");
  }
  return context;
}
