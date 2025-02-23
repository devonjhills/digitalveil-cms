// components/ModeToggle.tsx
"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react"; // Install lucide-react: npm install lucide-react
import { Button } from "@/components/ui/button"; //Import button component

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Or a placeholder
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
