import Link from "next/link";
import { Code2 } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 py-4 border-b bg-background/80 backdrop-blur-md">
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Code2 className="h-8 w-8 text-primary" />
          <span className="font-bold text-xl">digital veil</span>
        </Link>
        <div className="flex items-center gap-6">
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link
                  href="/posts"
                  className="hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </nav>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
