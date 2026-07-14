import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

// ── Fonts ────────────────────────────────────────────────────────────────
// For the npm distribution, we use local fonts instead of Google Fonts
// so the app works fully offline. Manrope is loaded with multiple weights
// (400 Regular, 600 SemiBold, 700 Bold, 800 ExtraBold) to match the
// original Google Fonts variable font behaviour. The browser falls back
// to the system sans-serif font via CSS if files are missing.

const fontSans = localFont({
  src: [
    {
      path: "../../public/fonts/Manrope.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Manrope-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Manrope-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Manrope-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
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
