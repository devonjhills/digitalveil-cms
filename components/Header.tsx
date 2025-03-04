import Link from "next/link";
import Image from "next/image"; // Import the Image component
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { Coffee } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 py-4 border-b bg-background/80 backdrop-blur-md">
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Digital Veil Logo"
            width={24}
            height={24}
            className="h-8 w-8 text-primary"
          />
          <span className="font-bold text-xl">digital veil</span>
        </Link>
        <div className="flex items-center gap-6">
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Button variant="outline">
                  <Link
                    href="/posts"
                    className="hover:text-primary transition-colors">
                    Blog
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant="secondary">
                  <Coffee className="h-4 w-4 mr-1" />
                  <Link href="https://buymeacoffee.com/digitalvei6">Buy Me a Coffee</Link>
                </Button>
              </li>
            </ul>
          </nav>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
