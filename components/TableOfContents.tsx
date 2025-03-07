"use client";

import React, { useState, useEffect } from "react";
import { CardHeader, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";

interface Heading {
  id: string;
  text: string;
  level: string;
}

// Custom hook to detect mobile viewports with a 768px breakpoint
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      // Mobile layout kicks in when viewport is less than 768px
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

const TableOfContents = () => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  // Collect headings from the article
  useEffect(() => {
    const articleElements = document.querySelectorAll(".prose h2, .prose h3");

    const articleHeadings = Array.from(articleElements).map((heading) => {
      if (!heading.id) {
        const text = heading.textContent || "";
        const id = text.toLowerCase().replace(/[^\w]+/g, "-");
        heading.setAttribute("id", id);
      }

      return {
        id: heading.id,
        text: heading.textContent || "",
        level: heading.tagName.toLowerCase(),
      };
    });

    setHeadings(articleHeadings);
  }, []);

  // Update the active heading on scroll
  useEffect(() => {
    const handleScroll = () => {
      const headingElements = Array.from(
        document.querySelectorAll(".prose h2, .prose h3")
      );

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const heading = headingElements[i];
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 100 && heading.id) {
          setActiveId(heading.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (headings.length === 0) return null;

  // Always position the trigger icon in the top left
  const buttonPositionClasses =
    "fixed left-4 top-20 z-50 hover:bg-accent hover:text-accent-foreground";

  // For mobile, use a bottom sheet with full width; on larger screens, a left sidebar
  const sheetContentClasses = isMobile
    ? "w-full h-[calc(100vh-80px)] border-t-2 border-black shadow-md p-0"
    : "w-64 border-r-2 border-black shadow-md p-0";

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className={buttonPositionClasses}
          aria-label="Open Table of Contents">
          <MenuIcon className="h-7 w-7" />
          {/* On non-mobile screens, show text; on mobile, only the icon */}
          <span className={isMobile ? "sr-only" : "hidden sm:inline"}>
            Table of Contents
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side={isMobile ? "bottom" : "left"}
        className={sheetContentClasses}>
        <CardHeader className="px-4 py-3 border-b border-black">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-sm font-bold uppercase tracking-wider">
              Contents
            </SheetTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="max-h-[calc(100vh-80px)] overflow-auto px-4 py-2">
            <nav className="toc-nav">
              <ul className="space-y-2">
                {headings.map((heading) => (
                  <li
                    key={heading.id}
                    className={`py-1 ${
                      heading.level === "h3"
                        ? "pl-3 border-l-2 border-muted"
                        : ""
                    }`}>
                    <a
                      href={`#${heading.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById(heading.id);
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                          setIsOpen(false);
                        }
                      }}
                      className={`block transition-colors hover:text-primary ${
                        activeId === heading.id ? "" : "text-muted-foreground"
                      }`}>
                      {activeId === heading.id ? (
                        <Badge
                          variant="default"
                          className="font-medium text-xs whitespace-normal">
                          {heading.text}
                        </Badge>
                      ) : (
                        <span className="text-sm whitespace-normal">
                          {heading.text}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </ScrollArea>
        </CardContent>
      </SheetContent>
    </Sheet>
  );
};

export default TableOfContents;
