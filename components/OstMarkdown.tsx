"use client";

import React, { useState, useEffect } from "react";
import Markdown from "markdown-to-jsx";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowRight,
  X,
  ExternalLink,
  BookOpen,
  Quote,
  ArrowDown,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  BlockquoteProps,
  BottomBannerCTAProps,
  CalloutBoxProps,
  CTAButtonProps,
  HeadingProps,
  HighlightProps,
  ImageProps,
  JohnsonBoxProps,
  LinkProps,
  ListItemProps,
  OstMarkdownProps,
  ProductCardProps,
  TableProps,
} from "./types";

const BottomBannerCTA: React.FC<BottomBannerCTAProps> = ({
  text,
  link,
  onClose,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg animate-slide-up">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <BookOpen className="h-6 w-6" />
          <p className="font-medium text-lg">{text}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="default"
            size="lg"
            className="bg-white text-primary hover:bg-primary/10 hover:text-primary-foreground transition-colors"
            onClick={() => window.open(link, "_blank")}>
            Learn More
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-primary/20 hover:text-white"
            onClick={onClose}
            aria-label="Close">
            <X className="ml-4 h-7 w-7" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export function OstMarkdown({
  content,
  className,
  bottomCtaText = "Want to learn more about our products?",
  bottomCtaLink = "#",
  bottomCtaDelay = 3000,
}: OstMarkdownProps) {
  const [showBottomCta, setShowBottomCta] = useState(false);
  const [hasDismissedCta, setHasDismissedCta] = useState(false);

  useEffect(() => {
    // Show the bottom CTA after the specified delay, unless it's been dismissed
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

  const markdownOverrides = {
    h1: {
      component: ({ children, ...props }: HeadingProps) => (
        <h1
          className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8 mt-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
          {...props}>
          {children}
          <Separator className="mt-4 bg-gradient-to-r from-primary/20 to-transparent" />
        </h1>
      ),
    },
    h2: {
      component: ({ children, ...props }: HeadingProps) => (
        <h2
          className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mt-12 mb-6 text-primary/90"
          {...props}>
          {children}
        </h2>
      ),
    },
    h3: {
      component: ({ children, ...props }: HeadingProps) => (
        <h3
          className="scroll-m-20 text-2xl font-semibold tracking-tight mt-8 mb-4"
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
        children: React.ReactNode;
        className?: string;
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
            className="leading-7 [&:not(:first-child)]:mt-6 text-lg text-muted-foreground"
            {...props}>
            {children}
          </Tag>
        );
      },
    },

    a: {
      component: ({ children, ...props }: LinkProps) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 inline-flex items-center gap-1 transition-all"
                target="_blank"
                rel="noopener noreferrer"
                {...props}>
                {children}
                <ExternalLink className="h-4 w-4 ml-1 opacity-70" />
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Opens in a new tab</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
    ul: {
      props: {
        className: "my-6 ml-6 list-disc [&>li]:mt-2 text-muted-foreground",
      },
    },
    ol: {
      props: {
        className: "my-6 ml-6 list-decimal [&>li]:mt-2 text-muted-foreground",
      },
    },
    li: {
      component: ({ children, ...props }: ListItemProps) => (
        <li className="text-muted-foreground" {...props}>
          <span className="text-primary/80 font-medium">{children}</span>
        </li>
      ),
    },
    blockquote: {
      component: ({ children, ...props }: BlockquoteProps) => (
        <blockquote
          className="mt-6 border-l-2 border-primary pl-6 italic text-muted-foreground relative py-2"
          {...props}>
          <Quote className="absolute -top-2 -left-8 text-primary/20 text-4xl [transform:scaleX(-1)]" />
          {children}
          <Quote className="absolute -bottom-4 -right-4 text-primary/20 text-4xl" />
        </blockquote>
      ),
    },
    table: {
      component: ({ children, ...props }: TableProps) => (
        <div className="my-6 w-full overflow-y-auto">
          <table className="w-full border-collapse text-sm" {...props}>
            {children}
          </table>
        </div>
      ),
    },
    th: {
      props: {
        className: "border px-4 py-2 text-left font-bold bg-muted",
      },
    },
    td: {
      props: { className: "border px-4 py-2 text-muted-foreground" },
    },
    img: {
      component: ({ src, alt, ...props }: ImageProps) => (
        <div className="my-8 overflow-hidden rounded-lg border shadow-md transition-all hover:shadow-lg">
          <img
            src={src}
            alt={alt || ""}
            className="w-full object-cover transition-transform hover:scale-105"
            loading="lazy"
            {...props}
          />
          {alt && (
            <div className="bg-muted/50 px-4 py-2 text-sm text-muted-foreground text-center">
              {alt}
            </div>
          )}
        </div>
      ),
    },

    // Custom components
    JohnsonBox: {
      component: ({ children, title }: JohnsonBoxProps) => (
        <Card className="my-8 rounded-2xl overflow-hidden shadow-lg border-2 border-primary/20 hover:border-primary/30 transition-all">
          {title && (
            <CardHeader className="bg-primary/10 px-6 py-4 border-b border-primary/20">
              <CardTitle className="text-2xl font-bold text-primary">
                {title}
              </CardTitle>
            </CardHeader>
          )}
          <CardContent className="px-6 py-8">
            <ScrollArea className="max-h-96">
              <div className="text-lg text-muted-foreground">{children}</div>
            </ScrollArea>
          </CardContent>
        </Card>
      ),
    },

    ProductCard: {
      component: ({ children, title, badge }: ProductCardProps) => (
        <Card className="my-8 border-2 border-primary/10 hover:border-primary/20 hover:shadow-lg transition-all overflow-hidden">
          {title && (
            <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 flex flex-row items-center justify-between">
              <CardTitle className="text-2xl">{title}</CardTitle>
              {badge && (
                <Badge
                  variant="secondary"
                  className="bg-primary/20 text-primary-foreground">
                  {badge}
                </Badge>
              )}
            </CardHeader>
          )}
          <CardContent className="pt-6">{children}</CardContent>
        </Card>
      ),
    },

    CTAButton: {
      component: ({
        href,
        children,
        variant = "default",
        ...props
      }: CTAButtonProps) => {
        const className =
          "w-full sm:w-auto text-lg py-6 px-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow";

        return href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
            {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
            <Button className={className} variant={variant}>
              {children}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </a>
        ) : (
          <Button
            className={className}
            variant={variant}
            {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
            {children}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        );
      },
    },

    Highlight: {
      component: ({ children, title }: HighlightProps) => (
        <Alert className="my-6 border-2 border-primary/20 bg-primary/5">
          {title && <AlertTitle className="text-primary">{title}</AlertTitle>}
          <AlertDescription className="flex items-start gap-2">
            <div className="h-full w-1 bg-primary/50 rounded-full mt-1 flex-shrink-0" />
            <div>{children}</div>
          </AlertDescription>
        </Alert>
      ),
    },

    FAQ: {
      component: ({ children }: { children: React.ReactNode }) => {
        const childArray = React.Children.toArray(children);
        const question = childArray[0];
        const answerElements = childArray.slice(1);

        return (
          <details className="mb-4 group">
            <summary className="flex items-center cursor-pointer list-none p-4 bg-muted/50 hover:bg-muted transition-colors rounded-lg">
              <span className="flex-1 font-medium">{question}</span>
              <ArrowDown className="ml-2 h-5 w-5 transform transition-transform group-open:rotate-180" />
            </summary>
            <div className="mt-2 px-4 pb-4 text-muted-foreground">
              {answerElements}
            </div>
          </details>
        );
      },
    },

    CalloutBox: {
      component: ({ children, type = "info" }: CalloutBoxProps) => {
        // Map the type to the corresponding tailwind classes
        const typeStyles = {
          info: "border-blue-200 bg-blue-50 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-100",
          warning:
            "border-yellow-200 bg-yellow-50 text-yellow-800 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-100",
          success:
            "border-green-200 bg-green-50 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-100",
          error:
            "border-red-200 bg-red-50 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-100",
        };

        return (
          <Alert className={`my-6 border-2 ${typeStyles[type]}`}>
            <AlertDescription>{children}</AlertDescription>
          </Alert>
        );
      },
    },
  };

  return (
    <>
      <article
        className={cn(
          "max-w-3xl mx-auto prose prose-slate dark:prose-invert",
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

/* 
## OstMarkdown Component Guide

The OstMarkdown component renders Markdown content with enhanced styling and custom components using shadcn/ui and Tailwind CSS.

### Basic Usage

```jsx
import { OstMarkdown } from "@/components/OstMarkdown";

export default function Page() {
  const content = `# My Markdown Content
  
This is a paragraph with some **bold** and *italic* text.`;

  return <OstMarkdown content={content} />;
}
```

### Component Props

- `content`: (required) The markdown content as a string
- `className`: (optional) Additional CSS classes for the container
- `bottomCtaText`: (optional) Text for the call-to-action banner (default: "Want to learn more about our products?")
- `bottomCtaLink`: (optional) URL for the CTA banner (default: "#")
- `bottomCtaDelay`: (optional) Delay in milliseconds before showing the CTA (default: 3000)

### Standard Markdown Elements

All standard markdown elements (headings, paragraphs, lists, etc.) are styled consistently with the design system.

#### Headings

- `# Heading 1` - Gradient text with separator
- `## Heading 2` - Border-bottom style with primary color
- `### Heading 3` - Larger text with proper spacing

#### Text Formatting

- Paragraphs - Properly spaced with muted foreground color
- **Bold text** - `**bold**`
- *Italic text* - `*italic*`
- [Links](https://example.com) - `[text](url)` - Shows with external link icon and tooltip
- Lists - Unordered (`- item`) and ordered (`1. item`) with proper spacing

#### Block Elements

- > Blockquotes - With decorative quote icons
- Code blocks - ``` ``` - Syntax highlighting
- Tables - Standard markdown tables with responsive container
- Images - `![alt](src)` - Rounded containers with hover effects and optional captions

### Custom Components

#### JohnsonBox

A card-like container with an optional title and scrollable content.

```md
<JohnsonBox title="Optional Title">
Your content here
</JohnsonBox>
```

#### ProductCard

A styled card for product information with optional badge.

```md
<ProductCard title="Product Title" badge="New">
Product details here
</ProductCard>
```

#### CTAButton

A prominent call-to-action button.

```md
<CTAButton href="https://example.com">
Call to Action
</CTAButton>
```

#### Highlight

An alert-style box to emphasize important content.

```md
<Highlight title="Important Note">
This is highlighted information
</Highlight>
```

#### FAQ

An expandable details/summary component for FAQs.

```md
<FAQ>
  <h3>Question goes here?</h3>
  <p>Answer content goes here...</p>
</FAQ>
```

#### CalloutBox

A colored alert box with different semantic types.

```md
<CalloutBox type="info">
Information message
</CalloutBox>
```

Supported types: "info" (default), "warning", "success", "error"

### Bottom CTA Banner

*/
