"use client";

export interface LearnLayoutProps {
  children: React.ReactNode;
}

export function LearnLayout({ children }: LearnLayoutProps) {
  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] relative overflow-hidden bg-background -m-6">
      <div className="flex-1 h-full relative z-0">
        {children}
      </div>
    </div>
  );
}
