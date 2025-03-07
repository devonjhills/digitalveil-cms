"use client";

import React from "react";
import Markdown from "markdown-to-jsx";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  BookOpen,
  Quote,
  X,
  ArrowRight,
  Hash,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { LinkPreview } from "@/components/ui/link-preview";
import {
  BottomBannerCTAProps,
  HeadingProps,
  LinkProps,
  OstMarkdownProps,
} from "./types";

const BottomBannerCTA: React.FC<BottomBannerCTAProps> = React.memo(
  function BottomBannerCTA(props) {
    return (
      <div
        className="fixed bottom-0 left-0 right-0 z-50 p-1 bg-accent text-accent-foreground
                 border-t-2 border-black brutal-border animate-slide-up">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <BookOpen className="h-6 w-6 flex-shrink-0" />
            <p className="font-bold text-lg">{props.text}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              asChild
              className="neobrutalist-button bg-black text-white flex items-center">
              <a href={props.link} target="_blank" rel="noopener noreferrer">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={props.onClose}
              aria-label="Close"
              className="brutal-border h-10 w-10 bg-white text-black hover:bg-primary hover:text-white transition-colors">
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

// --- Header Override Components ---

const H1Override: React.FC<HeadingProps> = ({ children, id, ...props }) => {
  return (
    <div className="relative mt-16 mb-8 group">
      <h1
        id={id}
        className="group/header scroll-m-20 text-4xl font-semibold tracking-tight
                 relative pb-3
                 text-foreground
                 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-1/3 after:h-0.5 after:bg-primary group-hover/header:after:w-full transition-all"
        {...props}>
        <a
          href={`#${id}`}
          className="group-hover/header:text-primary-foreground no-underline" // Removed hover:text-primary-foreground
        >
          <Hash className="inline-block mr-2 h-4 w-4 opacity-60 align-middle translate-y-[-1px]" />{" "}
          {children}
        </a>
        <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-secondary rounded-full opacity-40"></span>{" "}
      </h1>
    </div>
  );
};

const H2Override: React.FC<HeadingProps> = ({ children, id, ...props }) => {
  return (
    <div className="relative mt-12 mb-6 group">
      <h2
        id={id}
        className="group/header scroll-m-20 text-3xl font-semibold tracking-tight
                 text-foreground pb-2 relative
                 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-1/4 after:h-0.5 after:bg-secondary group-hover/header:after:w-full transition-all"
        {...props}>
        <a
          href={`#${id}`}
          className="group-hover/header:text-primary-foreground no-underline" // Removed hover:text-primary-foreground
        >
          <Hash className="inline-block mr-2 h-4 w-4 opacity-60 align-middle translate-y-[-1px]" />{" "}
          {children}
        </a>
        <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-secondary rounded-full opacity-40"></span>{" "}
      </h2>
    </div>
  );
};

const H3Override: React.FC<HeadingProps> = ({ children, id, ...props }) => {
  return (
    <div className="group relative mt-10 mb-4">
      <h3
        id={id}
        className="group/header scroll-m-20 text-2xl font-semibold tracking-tight
                 text-foreground pb-1.5 relative
                 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-1/5 after:h-0.5 after:bg-accent group-hover/header:after:w-full transition-all"
        {...props}>
        <a
          href={`#${id}`}
          className="group-hover/header:text-primary-foreground no-underline" // Removed hover:text-primary-foreground
        >
          <Hash className="inline-block mr-2 h-4 w-4 opacity-60 align-middle translate-y-[-1px]" />{" "}
          {children}
        </a>
        <span className="absolute -bottom-0.5 left-0 right-0 h-[1px] bg-accent rounded-full opacity-40"></span>{" "}
      </h3>
    </div>
  );
};

const H4Override: React.FC<HeadingProps> = ({ children, id, ...props }) => {
  return (
    <div className="relative mt-8 mb-4 group">
      <h4
        id={id}
        className="group/header scroll-m-20 text-xl font-semibold tracking-tight
                text-foreground pl-0 pb-1 relative
                after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-1/6 after:h-0.5 after:bg-muted-foreground group-hover/header:after:w-full transition-all"
        {...props}>
        <a
          href={`#${id}`}
          className="group-hover/header:text-primary-foreground no-underline" // Removed hover:text-primary-foreground
        >
          <Hash className="inline-block mr-2 h-4 w-4 opacity-60 align-middle translate-y-[-1px]" />{" "}
          {children}
        </a>
        <span className="absolute -bottom-0.5 left-0 right-0 h-[1px] bg-muted-foreground rounded-full opacity-40"></span>{" "}
      </h4>
    </div>
  );
};

export function OstMarkdown({
  content,
  className,
  bottomCtaText = "Thanks for stopping by.",
  bottomCtaLink = "#",
  bottomCtaDelay = 3000,
}: OstMarkdownProps) {
  const [showBottomCta, setShowBottomCta] = React.useState(false);
  const [hasDismissedCta, setHasDismissedCta] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasDismissedCta) {
        setShowBottomCta(true);
      }
    }, bottomCtaDelay);
    return () => clearTimeout(timer);
  }, [bottomCtaDelay, hasDismissedCta]);

  const dismissCta = React.useCallback(() => {
    setShowBottomCta(false);
    setHasDismissedCta(true);
  }, []);

  const markdownOverrides = React.useMemo(
    () => ({
      h1: {
        component: H1Override,
      },
      h2: {
        component: H2Override,
      },
      h3: {
        component: H3Override,
      },
      h4: {
        component: H4Override,
      },
      p: {
        component: ({
          children,
          ...props
        }: {
          children: React.ReactNode;
          [key: string]: unknown;
        }) => {
          const childArray = React.Children.toArray(children);
          const allText = childArray.every(
            (child) => typeof child === "string" || typeof child === "number"
          );
          const Tag = allText ? "p" : "div";
          return (
            <Tag
              className="leading-relaxed [&:not(:first-child)]:mt-4 text-foreground/90"
              {...props}>
              {children}
            </Tag>
          );
        },
      },
      a: {
        component: ({ children, href, ...props }: LinkProps) => {
          const isExternal = href?.startsWith("http");
          if (isExternal && href) {
            return (
              <a
                href={href}
                // Removed hover:text-primary-foreground
                className="font-medium text-primary underline-offset-2 transition-colors text-underline decoration-2"
                {...props}
                target="_blank"
                rel="noopener noreferrer">
                {children}
                <ExternalLink className="h-4 w-4 ml-1 inline-block align-baseline" />
              </a>
            );
          }
          const fullUrl = href
            ? `https://www.thedigitalveil.com${
                href.startsWith("/") ? href : `/${href}`
              }`
            : "https://www.thedigitalveil.com";
          return (
            <LinkPreview
              url={fullUrl}
              forceCacheReset={true}
              // Removed hover:text-primary-foreground
              className="font-medium text-primary underline-offset-2 transition-colors text-underline decoration-2">
              {children}
            </LinkPreview>
          );
        },
      },
      ul: {
        component: ({ children }: { children: React.ReactNode }) => (
          <ul className="my-6 ml-6 list-disc space-y-3">
            {React.Children.map(children, (child) => {
              if (!React.isValidElement(child)) return child;
              //eslint-disable-next-line
              return React.cloneElement(child as any, {
                className: cn(
                  //eslint-disable-next-line
                  (child.props as any).className,
                  "pl-2"
                ),
              });
            })}
          </ul>
        ),
      },
      ol: {
        props: {
          className:
            "my-6 ml-6 list-decimal space-y-3 marker:text-foreground/80",
        },
      },
      li: {
        props: {
          className: "text-foreground/90 font-medium",
        },
      },
      blockquote: {
        component: ({
          children,
        }: {
          children: React.ReactNode;
          [key: string]: unknown;
        }) => (
          <blockquote className="mt-6 border-l-2 border-accent pl-4 italic">
            {" "}
            <Quote className="inline-block mr-2 h-4 w-4 text-accent opacity-60 align-top" />
            {children}
          </blockquote>
        ),
      },
      table: {
        component: ({
          children,
          ...props
        }: {
          children: React.ReactNode;
          [key: string]: unknown;
        }) => (
          <div className="w-full overflow-auto my-6 rounded-md border border-border">
            {" "}
            <table className="w-full border-collapse text-sm" {...props}>
              {children}
            </table>
          </div>
        ),
      },
      th: {
        props: {
          className:
            "border-b font-medium p-4 text-left [&[align=center]]:text-center [&:not(:last-child)]:border-r",
        },
      },
      td: {
        props: {
          className: "p-4 align-top [&:not(:last-child)]:border-r",
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
          <div className="my-8 rounded-md shadow-md overflow-hidden bg-card relative group">
            {" "}
            <img
              src={src}
              alt={alt || ""}
              className="w-full object-cover transition-opacity hover:opacity-90 duration-200"
              loading="lazy"
              style={{ aspectRatio: "16/9" }}
              {...props}
            />
            {alt && (
              <div className="bg-card px-4 py-2 text-sm text-foreground/80">
                {alt}
              </div>
            )}
          </div>
        ),
      },
      pre: {
        component: ({
          children,
          ...props
        }: {
          children: React.ReactNode;
          [key: string]: unknown;
        }) => (
          <div className="my-6 rounded-md border border-border bg-muted overflow-hidden">
            {" "}
            <div className="flex items-center justify-between px-4 py-2 bg-muted-foreground/80 text-foreground font-mono text-xs rounded-t-md">
              {" "}
              <span>Code</span>
              <div className="flex space-x-2">
                {" "}
                <div className="h-2 w-2 rounded-full bg-red-500 opacity-70" />
                <div className="h-2 w-2 rounded-full bg-yellow-500 opacity-70" />
                <div className="h-2 w-2 rounded-full bg-green-500 opacity-70" />
              </div>
            </div>
            <pre
              className="p-4 overflow-x-auto font-mono text-sm text-foreground/90"
              {...props}>
              {" "}
              {children}
            </pre>
          </div>
        ),
      },
      code: {
        props: {
          className:
            "font-mono bg-muted rounded-sm px-1 py-0.5 text-accent/90 font-medium text-sm",
        },
      },
      hr: {
        component: () => <Separator className="my-8 opacity-50" />,
      },
    }),
    []
  );

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
