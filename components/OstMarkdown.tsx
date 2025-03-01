"use client";

import React, { useState, useEffect, ReactNode, ReactElement } from "react";
import Markdown from "markdown-to-jsx";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpen, Quote, X, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BottomBannerCTAProps,
  HeadingProps,
  LinkProps,
  OstMarkdownProps,
} from "./types";

// BottomBannerCTA Component with Neobrutalist styling
const BottomBannerCTA: React.FC<BottomBannerCTAProps> = ({
  text,
  link,
  onClose,
}) => {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-accent text-accent-foreground 
                    border-t-2 border-black brutal-border animate-slide-up">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <BookOpen className="h-6 w-6 flex-shrink-0" />
          <div className="relative overflow-hidden w-full">
            <p className="font-bold text-lg whitespace-nowrap animate-ticker">
              {text}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="neobrutalist-button bg-black text-white flex items-center">
            Learn More
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
          <Button
            variant="outline"
            size="icon"
            onClick={onClose}
            aria-label="Close"
            className="brutal-border h-10 w-10 bg-white text-black hover:bg-primary hover:text-white transition-colors">
            <X className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Main Markdown Component with Neobrutalist styling
export function OstMarkdown({
  content,
  className,
  bottomCtaText = "Thanks for stopping by.",
  bottomCtaLink = "#",
  bottomCtaDelay = 3000,
}: OstMarkdownProps) {
  const [showBottomCta, setShowBottomCta] = useState(false);
  const [hasDismissedCta, setHasDismissedCta] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasDismissedCta) {
        setShowBottomCta(true);
      }
    }, bottomCtaDelay);

    return () => clearTimeout(timer);
  }, [bottomCtaDelay, hasDismissedCta]);

  const dismissCta = () => {
    setShowBottomCta(false);
    setHasDismissedCta(true);
  };

  // Neobrutalist markdown overrides
  const markdownOverrides = {
    h1: {
      component: ({ children, ...props }: HeadingProps) => (
        <h1
          className="scroll-m-20 text-4xl font-black tracking-tight lg:text-5xl mb-8 mt-12 
                    relative pl-4 py-2 inline-block brutal-border bg-accent text-accent-foreground
                    brutal-shadow"
          {...props}>
          {children}
          <Separator className="mt-4 h-1 bg-black" />
        </h1>
      ),
    },
    h2: {
      component: ({ children, ...props }: HeadingProps) => (
        <h2
          className="scroll-m-20 text-3xl font-extrabold tracking-tight mt-12 mb-6 pb-2
                    border-b-4 border-primary text-primary relative"
          {...props}>
          <span className="bg-primary/10 px-2">{children}</span>
        </h2>
      ),
    },
    h3: {
      component: ({ children, ...props }: HeadingProps) => (
        <h3
          className="scroll-m-20 text-2xl font-bold tracking-tight mt-8 mb-4 
                    text-secondary relative pl-4 border-l-4 border-secondary"
          {...props}>
          {children}
        </h3>
      ),
    },
    p: {
      component: ({
        children,
        ...props
      }: {
        children: ReactNode;
        [key: string]: unknown;
      }) => {
        // Convert children to an array
        const childArray = React.Children.toArray(children);
        // Check if all children are text (or numbers)
        const allText = childArray.every(
          (child) => typeof child === "string" || typeof child === "number"
        );
        // If the paragraph has only text, use <p>; otherwise, use <div>
        const Tag = allText ? "p" : "div";
        return (
          <Tag
            className="leading-7 [&:not(:first-child)]:mt-6 text-lg"
            {...props}>
            {children}
          </Tag>
        );
      },
    },
    a: {
      component: ({ children, href, ...props }: LinkProps) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={href}
                className="font-bold text-primary text-underline decoration-primary
                          hover:bg-primary hover:text-primary-foreground px-1 py-0.5 transition-all"
                target="_blank"
                rel="noopener noreferrer"
                {...props}>
                {children}
                <ExternalLink className="h-4 w-4 ml-1 inline-block" />
              </a>
            </TooltipTrigger>
            <TooltipContent className="brutal-border bg-black text-white">
              <p>Opens in a new tab</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
    ul: {
      props: {
        className: "my-6 ml-6 list-none space-y-3",
      },
      component: ({
        children,
        ...props
      }: {
        children: ReactNode;
        [key: string]: unknown;
      }) => (
        <ul {...props}>
          {React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) return child;
            return React.cloneElement(
              child as ReactElement<{
                className?: string;
                [key: string]: unknown;
              }>,
              {
                ...(child.props as Record<string, unknown>),
                className: cn(
                  (child.props as { className?: string }).className,
                  "pl-4 border-l-4 border-primary"
                ),
              }
            );
          })}
        </ul>
      ),
    },
    ol: {
      props: {
        className:
          "my-6 ml-6 list-decimal space-y-3 marker:font-bold marker:text-primary",
      },
    },
    li: {
      props: {
        className: "text-foreground font-medium",
      },
    },
    blockquote: {
      component: ({
        children,
        ...props
      }: {
        children: ReactNode;
        [key: string]: unknown;
      }) => (
        <blockquote className="mt-6 accent-box italic" {...props}>
          <Quote className="absolute top-2 left-2 text-accent-foreground/30 text-4xl [transform:scaleX(-1)]" />
          <div className="ml-6 relative z-10">{children}</div>
          <Quote className="absolute bottom-2 right-2 text-accent-foreground/30 text-4xl" />
        </blockquote>
      ),
    },
    table: {
      component: ({
        children,
        ...props
      }: {
        children: ReactNode;
        [key: string]: unknown;
      }) => (
        <div className="w-full overflow-auto my-6 brutal-border brutal-shadow">
          <table className="w-full border-collapse text-sm bg-card" {...props}>
            {children}
          </table>
        </div>
      ),
    },
    th: {
      props: {
        className:
          "border-2 border-black px-4 py-3 text-left font-black bg-primary text-primary-foreground",
      },
    },
    td: {
      props: {
        className: "border-2 border-black px-4 py-3 text-foreground",
      },
    },
    img: {
      component: ({
        src,
        alt,
        ...props
      }: {
        src?: string;
        alt?: string;
        [key: string]: unknown;
      }) => (
        <div className="my-8 brutal-border brutal-shadow overflow-hidden bg-white relative">
          <div className="absolute inset-0 bg-secondary/5 -z-10 translate-x-2 translate-y-2 brutal-border"></div>
          <img
            src={src}
            alt={alt || ""}
            className="w-full object-cover transition-transform hover:scale-105"
            loading="lazy"
            {...props}
          />
          {alt && (
            <div className="brutal-border-t bg-accent px-4 py-2 text-sm font-bold text-accent-foreground">
              {alt}
            </div>
          )}
        </div>
      ),
    },
    // Bold code block styling
    pre: {
      component: ({
        children,
        ...props
      }: {
        children: ReactNode;
        [key: string]: unknown;
      }) => (
        <div className="my-6 brutal-border brutal-shadow bg-muted overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-black text-white font-mono text-xs">
            <div className="flex space-x-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </div>
            <div>code</div>
          </div>
          <pre className="p-4 overflow-x-auto font-mono text-sm" {...props}>
            {children}
          </pre>
        </div>
      ),
    },
    code: {
      props: {
        className:
          "font-mono bg-muted px-1.5 py-0.5 brutal-border text-secondary font-bold",
      },
    },
    hr: {
      component: () => (
        <div className="my-8 relative">
          <Separator className="h-1 bg-black" />
          <div className="absolute right-0 -top-2 h-5 w-5 bg-accent brutal-border transform rotate-45"></div>
        </div>
      ),
    },
  };

  return (
    <>
      <article
        className={cn(
          "max-w-3xl mx-auto prose prose-stone dark:prose-invert",
          className
        )}>
        <Markdown options={{ overrides: markdownOverrides }}>
          {content}
        </Markdown>
      </article>

      {showBottomCta && (
        <BottomBannerCTA
          text={bottomCtaText}
          link={bottomCtaLink}
          onClose={dismissCta}
        />
      )}
    </>
  );
}
