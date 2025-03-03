import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getDocumentBySlug, getDocumentSlugs } from "outstatic/server";
import { OstMarkdown } from "@/components/OstMarkdown";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, TagIcon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const dynamic = "force-static";

// Post type definition based on Outstatic schema
type Post = {
  title: string;
  description: string;
  content: string;
  slug: string;
  cover_image: string;
  published_at: string;
  author: string;
  categories: string[];
  tags: string[];
};

// Define Params type as a Promise for Next.js 15
type Params = Promise<{ slug: string }>;

// Generate static routes at build time
export async function generateStaticParams() {
  // Use getDocumentSlugs instead of getDocumentPaths for the app router
  const slugs = getDocumentSlugs("posts");
  // Return an array of objects with the slug property
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  // Await params before accessing slug
  const { slug } = await params;

  const post = (getDocumentBySlug("posts", slug, [
    "title",
    "description",
    "cover_image",
    "published_at",
  ])) as Post | null;

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/posts/${slug}`,
      images: [
        {
          url: post.cover_image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.cover_image],
    },
  };
}

// Format date helper function
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Beautified Blog Post Page using Tailwind, shadcn components, and best practice layout
export default async function PostPage({ params }: { params: Params }) {
  // Await params before accessing slug
  const { slug } = await params;

  const post = (await getDocumentBySlug("posts", slug, [
    "title",
    "description",
    "content",
    "cover_image",
    "published_at",
    "author",
    "categories",
    "tags",
  ])) as Post | null;

  if (!post) {
    notFound();
  }

  return (
    <main className="container py-12">
      <div className="neobrutalist-card p-8">
        {/* Cover Image */}
        {post.cover_image && (
          <div className="relative w-full h-96 mb-8 rounded overflow-hidden brutal-border brutal-shadow">
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              priority
              unoptimized
              className="object-cover transition-transform duration-200 hover:scale-105"
            />
          </div>
        )}

        {/* Header: Title, Meta, and Author */}
        <header className="mb-6">
          <h1 className="text-4xl font-extrabold mb-2">{post.title}</h1>
          <p className="text-lg text-muted-foreground mb-4">
            {post.description}
          </p>
          <div className="flex items-center gap-4">
            {/* Author Avatar */}
            <Avatar className="w-10 h-10">
              <AvatarImage src="/media/avatar.jpg" alt={post.author} />
              <AvatarFallback>{post.author[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold">{post.author}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarIcon className="w-4 h-4 mr-1" />
                <time dateTime={post.published_at}>
                  {formatDate(post.published_at)}
                </time>
              </div>
            </div>
          </div>
        </header>

        {/* Post Content */}
        <article className="prose dark:prose-invert max-w-none">
          <OstMarkdown content={post.content} />
        </article>

        {/* Footer Section for Categories and Tags */}
        {(post.categories.length > 0 || post.tags.length > 0) && (
          <footer className="mt-10 pt-6 border-t border-black">
            {post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map((category) => (
                  <Badge
                    key={category}
                    variant="secondary"
                    className="text-xs py-1 px-2">
                    {category}
                  </Badge>
                ))}
              </div>
            )}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs py-1 px-2 flex items-center gap-1">
                    <TagIcon className="w-3 h-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </footer>
        )}
      </div>
    </main>
  );
}