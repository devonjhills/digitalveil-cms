import React from "react";
import Markdown from "markdown-to-jsx";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface OstMarkdownProps {
  content: string;
  className?: string;
}

// Custom components for special blocks
const ProductCard = ({ children }: { children: React.ReactNode }) => (
  <Card className="p-6 my-8 bg-card border-2 border-primary/10 hover:border-primary/20 transition-all">
    {children}
  </Card>
);

const CTAButton = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Button
    className="w-full sm:w-auto my-4 text-lg py-6 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
    asChild>
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  </Button>
);

const Highlight = ({ children }: { children: React.ReactNode }) => (
  <Alert className="my-6 border-2 border-primary/20 bg-primary/5">
    <AlertDescription>{children}</AlertDescription>
  </Alert>
);

export function OstMarkdown({ content, className }: OstMarkdownProps) {
  return (
    <article className={cn("max-w-3xl mx-auto", className)}>
      <Markdown
        options={{
          overrides: {
            // Headings with improved visual hierarchy
            h1: {
              props: {
                className:
                  "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8 mt-12",
              },
            },
            h2: {
              props: {
                className:
                  "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-12 mb-6",
              },
            },
            h3: {
              props: {
                className:
                  "scroll-m-20 text-2xl font-semibold tracking-tight mt-8 mb-4",
              },
            },
            // Paragraphs with improved readability
            p: {
              props: {
                className:
                  "leading-7 [&:not(:first-child)]:mt-6 text-lg text-muted-foreground",
              },
            },
            // Enhanced links for better CTR
            a: {
              props: {
                className:
                  "font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors",
                target: "_blank",
                rel: "noopener noreferrer",
              },
            },
            // Lists with better spacing and bullets
            ul: {
              props: {
                className:
                  "my-6 ml-6 list-disc [&>li]:mt-2 text-muted-foreground",
              },
            },
            ol: {
              props: {
                className:
                  "my-6 ml-6 list-decimal [&>li]:mt-2 text-muted-foreground",
              },
            },
            // Better code blocks
            pre: {
              props: {
                className:
                  "rounded-lg border bg-muted px-4 py-4 font-mono text-sm font-semibold my-6 overflow-x-auto",
              },
            },
            code: {
              props: {
                className:
                  "relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm bg-muted",
              },
            },
            // Blockquotes for testimonials or important callouts
            blockquote: {
              props: {
                className:
                  "mt-6 border-l-2 border-primary pl-6 italic text-muted-foreground",
              },
            },
            // Custom components
            ProductCard,
            CTAButton,
            Highlight,
            // Tables for product comparisons
            table: {
              props: {
                className: "w-full my-6 border-collapse text-sm",
              },
            },
            th: {
              props: {
                className: "border px-4 py-2 text-left font-bold bg-muted",
              },
            },
            td: {
              props: {
                className: "border px-4 py-2 text-muted-foreground",
              },
            },
            // Images with optimized presentation
            img: {
              props: {
                className: "rounded-lg border my-8 shadow-md",
              },
            },
          },
        }}>
        {content}
      </Markdown>
    </article>
  );
}
