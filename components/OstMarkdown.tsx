import React from "react";
import Markdown from "markdown-to-jsx";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight } from "lucide-react";

interface OstMarkdownProps {
  content: string;
  className?: string;
}

// Custom components for affiliate elements
const JohnsonBox = ({
  title,
  text,
  button,
  link,
}: {
  title: string;
  text: string;
  button: string;
  link: string;
}) => (
  <Card className="p-6 my-8 bg-primary/10 border-2 border-primary/20 hover:border-primary transition-all text-center">
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <p className="text-lg mb-4">{text}</p>
    <Button asChild className="w-full sm:w-auto text-lg py-6 px-8">
      <a href={link} target="_blank" rel="noopener noreferrer">
        {button}
      </a>
    </Button>
  </Card>
);

const DropdownChoices = ({ options }: { options: string[] }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline">Choose an option</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      {options.map((option, index) => (
        <DropdownMenuItem key={index}>{option}</DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

const ProductCard = ({
  title,
  image,
  link,
  children,
}: {
  title: string;
  image?: string;
  link: string;
  children: React.ReactNode;
}) => (
  <Card className="my-8 bg-card border-2 border-primary/10 hover:border-primary/20 hover:shadow-lg transition-all group">
    {image && (
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
      />
    )}
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
    <CardFooter>
      <Button asChild className="w-full sm:w-auto">
        <a href={link} target="_blank" rel="noopener noreferrer">
          Learn More <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </CardFooter>
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
    className="w-full sm:w-auto text-lg py-6 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
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

const TrustSignals = ({ logos }: { logos: string[] }) => (
  <div className="flex justify-center gap-4 my-8">
    {logos.map((logo, index) => (
      <img key={index} src={logo} alt="Trust logo" className="h-8" />
    ))}
  </div>
);

const UrgencyBadge = ({ text }: { text: string }) => (
  <Badge
    variant="destructive"
    className="mb-2 inline-flex items-center px-3 py-1 text-sm font-medium" // Adjusted styling
  >
    <Clock className="h-4 w-4 mr-1" /> {text}
  </Badge>
);

const FAQSection = ({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) => (
  <div className="my-8">
    {faqs.map((faq, index) => (
      <details key={index} className="mb-4">
        <summary className="font-bold text-lg cursor-pointer">
          {faq.question}
        </summary>
        <p className="text-muted-foreground mt-2">{faq.answer}</p>
      </details>
    ))}
  </div>
);

export function OstMarkdown({ content, className }: OstMarkdownProps) {
  return (
    <article className={cn("max-w-3xl mx-auto", className)}>
      <Markdown
        options={{
          overrides: {
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
            p: {
              props: {
                className:
                  "leading-7 [&:not(:first-child)]:mt-6 text-lg text-muted-foreground",
              },
            },
            a: {
              props: {
                className:
                  "font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors",
                target: "_blank",
                rel: "noopener noreferrer",
              },
            },
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
            blockquote: {
              props: {
                className:
                  "mt-6 border-l-2 border-primary pl-6 italic text-muted-foreground",
              },
            },
            table: {
              props: { className: "w-full my-6 border-collapse text-sm" },
            },
            th: {
              props: {
                className: "border px-4 py-2 text-left font-bold bg-muted",
              },
            },
            td: {
              props: { className: "border px-4 py-2 text-muted-foreground" },
            },
            img: { props: { className: "rounded-lg border my-8 shadow-md" } },

            // New custom components
            JohnsonBox,
            DropdownChoices,
            ProductCard,
            CTAButton,
            Highlight,
            TrustSignals,
            UrgencyBadge,
            FAQSection,

            // Fixed list items with icons
            li: {
              component: ({ children, ...props }) => (
                <li className="flex items-center gap-2" {...props}>
                  <span>{children}</span>
                </li>
              ),
            },
          },
        }}>
        {content}
      </Markdown>
    </article>
  );
}
