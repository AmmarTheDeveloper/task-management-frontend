import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md w-full space-y-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 bg-muted rounded-full opacity-50"></div>
          </div>
          <div className="relative z-10 py-12">
            <h1 className="text-9xl font-extrabold text-primary">404</h1>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Page not found
          </h2>
          <p className="text-xl text-muted-foreground">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>
        <div>
          <Link href="/">
            <Button className="inline-flex items-center">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
