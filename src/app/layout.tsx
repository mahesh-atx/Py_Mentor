import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const fontSans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
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
