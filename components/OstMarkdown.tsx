"use client";

import React, { useState, useEffect } from "react";
import Markdown from "markdown-to-jsx";
import { cn } from "@/lib/utils";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
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
  CardFooterProps,
  CardHeaderProps,
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
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="h-6 w-6" />
          <p className="font-medium">{text}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90"
            onClick={() => window.open(link, "_blank")}>
            Learn More
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-primary/20 hover:text-white"
            onClick={onClose}>
            <X className="h-5 w-5" />
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
          className="scroll-m-20 text-2xl font-semibold tracking-tight mt-8 mb-4 flex items-center gap-2"
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
                className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 inline-flex items-center gap-1 transition-all align-middle"
                target="_blank"
                rel="noopener noreferrer"
                {...props}>
                {children}
                <ExternalLink className="h-4 w-4 ml-2 opacity-70 inline-block align-baseline" />
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
          className="mt-6 border-l-2 border-primary pl-6 italic text-muted-foreground"
          {...props}>
          <div className="relative">
            <div className="absolute -top-2 -left-8 text-primary/20 text-4xl">
              <Quote className="[transform:scaleX(-1)]" />
            </div>
            {children}
            <div className="absolute -bottom-4 -right-4 text-primary/20 text-4xl">
              <Quote />
            </div>
          </div>
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
            alt={alt}
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

    // Enhanced custom components
    JohnsonBox: {
      component: ({ children, title }: JohnsonBoxProps) => (
        <Card className="p-6 my-8 bg-primary/10 border-2 border-primary/20 hover:border-primary/30 transition-all text-center backdrop-blur-sm">
          {title && (
            <CardHeader className="pb-2 pt-2">
              <CardTitle className="text-xl">{title}</CardTitle>
            </CardHeader>
          )}
          <CardContent className="pt-0">
            <ScrollArea className="h-full max-h-80">{children}</ScrollArea>
          </CardContent>
        </Card>
      ),
    },

    ProductCard: {
      component: ({ children, title, badge }: ProductCardProps) => (
        <Card className="my-8 bg-card border-2 border-primary/10 hover:border-primary/20 hover:shadow-lg transition-all group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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
        return href ? (
          <a
            href={href}
            {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
            <Button
              className="w-full sm:w-auto text-lg py-6 px-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              variant={variant}>
              {children}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </a>
        ) : (
          <Button
            className="w-full sm:w-auto text-lg py-6 px-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
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
        <Alert className="my-6 border-2 border-primary/20 bg-primary/5 backdrop-blur-sm">
          {title && <AlertTitle className="text-primary">{title}</AlertTitle>}
          <AlertDescription className="flex items-start gap-2">
            <div className="h-full w-1 bg-primary/50 rounded-full mt-1" />
            <div>{children}</div>
          </AlertDescription>
        </Alert>
      ),
    },

    FAQ: {
      component: ({ children }: { children: React.ReactNode }) => {
        // Expect children to be a heading (question) followed by content (answer)
        const [question, ...answerElements] = React.Children.toArray(children);

        return (
          <details className="mb-4 group">
            <summary className="flex items-center cursor-pointer list-none p-4 bg-muted/50 hover:bg-muted transition-colors rounded-lg">
              <span className="flex-1 font-medium">
                {/* Render the question (which should be an h3) */}
                {question}
              </span>
              <ArrowDown className="ml-2 h-5 w-5 transform transition-transform group-open:rotate-180" />
            </summary>
            {/* Render the answer (which could be multiple elements) */}
            <div className="mt-2 px-4 pb-4 text-muted-foreground">
              {answerElements}
            </div>
          </details>
        );
      },
    },

    "card-header": {
      component: ({ children, subtitle }: CardHeaderProps) => (
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
          <CardTitle className="text-2xl">{children}</CardTitle>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </CardHeader>
      ),
    },

    "card-footer": {
      component: ({ children, url }: CardFooterProps) => {
        return (
          <CardFooter className="flex justify-end pt-4 border-t">
            {url ? (
              <a href={url} target="_blank" rel="noopener noreferrer">
                <Button className="group">
                  {React.isValidElement(children) ? children : "Learn More"}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
            ) : (
              <Button className="group">
                {React.isValidElement(children) ? children : "Learn More"}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            )}
          </CardFooter>
        );
      },
    },

    // New component: CalloutBox
    CalloutBox: {
      component: ({ children, type = "info" }: CalloutBoxProps) => {
        // Map the type to the corresponding tailwind classes.
        const alertStyles = {
          info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900 dark:border-blue-800 dark:text-blue-100",
          warning:
            "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:border-yellow-800 dark:text-yellow-100",
          success:
            "bg-green-50 border-green-200 text-green-800 dark:bg-green-900 dark:border-green-800 dark:text-green-100",
          error:
            "bg-red-50 border-red-200 text-red-800 dark:bg-red-900 dark:border-red-800 dark:text-red-100",
        };

        return (
          <Alert className={`not-prose my-6 border-2 ${alertStyles[type]}`}>
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
          "max-w-3xl mx-auto relative prose prose-slate dark:prose-invert",
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

/* USAGE 
Quick Instruction Set for OstMarkdown & Custom Components
Overall Structure & Rendering
Article Container:
Wrap the entire markdown content in an article element.
The OstMarkdown component applies the classes "max-w-3xl mx-auto relative prose prose-slate dark:prose-invert", so simply output the markdown content normally.

Automatic Bottom CTA:
Do not include any manual bottom call-to-action; OstMarkdown automatically renders a banner (via BottomBannerCTA) after a delay (default 3000 ms) using the bottomCtaText and bottomCtaLink props.

Standard Markdown Elements (Handled via Overrides)
Headings:
H1: Use # Heading Title
Renders with an extra-bold, gradient text style and a separator below.

H2: Use ## Heading Title
Renders with a bottom border and larger, prominent text.

H3: Use ### Heading Title
Renders with a flex layout and spacing.

Paragraphs:
Write paragraphs in normal markdown syntax.
The renderer will automatically decide between a <p> (for pure text) or a <div> (if there are mixed children).

Links:
Use standard markdown link syntax: [Link Text](https://example.com)
Links are automatically rendered with an underline, a tooltip (“Opens in a new tab”), and an external link icon.

Lists:
Unordered lists (- or *) and ordered lists (1.) are styled with proper indentation and spacing.
List items (li) wrap their content in a span styled with a primary accent.

Blockquotes:
Use > to start a blockquote.
Blockquotes render with decorative quote icons on both sides.

Tables:
Write tables in the standard markdown table syntax.
Tables render inside a scrollable container; header cells (th) and data cells (td) are styled with borders and padding.

Images:
Use standard image syntax: ![Alt Text](image_url)
Images are rendered in a bordered, rounded container with a hover zoom effect. If an alt text is provided, it appears as a caption.
Custom Component Overrides (Embed as Custom HTML Tags in Markdown)

JohnsonBox:
Usage: <JohnsonBox title="Optional Title">Your content here</JohnsonBox>
Renders a card with an optional header and a scrollable content area.

ProductCard:
Usage: <ProductCard title="Product Title" badge="Badge Text">Product details here</ProductCard>
Renders a styled card with a header (and optional badge) and content.

CTAButton:
Usage: <CTAButton href="https://example.com">Call to Action</CTAButton>
Renders a large, responsive button with an arrow icon. If href is omitted, it renders as a standard button.

Highlight:
Usage: <Highlight title="Optional Title">Important highlight message</Highlight>
Renders an alert-like box emphasizing the content.

FAQ:
Usage:
<FAQ>
  <h3>Question goes here</h3>
  <p>Answer content goes here...</p>
</FAQ>
Expects the first child to be the question (typically an <h3>) and subsequent elements as the answer. Renders as an expandable/collapsible details block.

card-header & card-footer:
Usage:
<card-header subtitle="Optional Subtitle">Header Text</card-header>
<card-footer url="https://example.com">Footer Text</card-footer>
These render parts of a card, with the footer optionally linking to an external URL.

CalloutBox:
Usage: <CalloutBox type="info">Your callout message</CalloutBox>
Supports type values of "info", "warning", "success", or "error" to adjust the styling of the alert.

Best Practices & Tips
Consistency:
Use standard markdown for common elements; the overrides will ensure a consistent, styled output.
Component Tag Names:
When embedding custom components, ensure that the tag names (e.g., <FAQ>, <Highlight>) exactly match those defined in the overrides so that the proper component is rendered.
Focus on Content:
Concentrate on the content and structure. The component logic (styling, interactivity, responsiveness) is already encapsulated in the overrides.
No Manual CTA:
Do not attempt to manually insert the bottom call-to-action—this is managed automatically by OstMarkdown.
*/
