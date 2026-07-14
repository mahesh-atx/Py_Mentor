import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

// ── Fonts ────────────────────────────────────────────────────────────────
// For the npm distribution, we use local fonts instead of Google Fonts
// so the app works fully offline. Manrope is loaded as a local variable
// font; if the font file is missing (e.g., during sandbox builds), the
// browser falls back to the system sans-serif font via CSS.

const fontSans = localFont({
  src: "../../public/fonts/Manrope.woff2",
  variable: "--font-sans",
  fallback: [
    "system-ui",
    "-apple-system",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
  // If the font file doesn't exist, don't crash the build.
  // The CSS variable still gets set and the fallback stack applies.
  display: "swap",
  adjustFontFallback: "Arial",
});

const fontMono = localFont({
  src: "../../public/fonts/PaperMono.woff2",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "PyMentor",
  description: "Learn Programming by Building Logic.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fontSans.variable} ${fontMono.variable} font-sans h-full antialiased`}>
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            {children}
            <Toaster position="bottom-right" />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
