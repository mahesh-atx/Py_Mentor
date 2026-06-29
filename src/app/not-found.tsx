import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Terminal, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 text-center">
      <div className="h-20 w-20 bg-muted/30 rounded-2xl flex items-center justify-center mb-6">
        <Terminal className="h-10 w-10 text-muted-foreground" />
      </div>
      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4">404</h1>
      <h2 className="text-xl sm:text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        Oops! It looks like you've navigated to a route that doesn't exist in the PyMentor curriculum.
      </p>
      <Link href="/">
        <Button size="lg" className="gap-2">
          <Home className="h-4 w-4" />
          Return to Dashboard
        </Button>
      </Link>
    </div>
  );
}
