import { Copyright } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-8 border-t">
      <div className="container">
        <div className="text-center text-muted-foreground">
          <div className="flex justify-center items-center">
            <Copyright className="h-4 w-4 mr-1" />
            <span>
              {new Date().getFullYear()} digital veil media. All rights
              reserved.
            </span>
          </div>
        </div>
        <div className="mt-4 flex justify-center space-x-4">
          <Link
            href="/privacy"
            className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
