import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getDocumentBySlug, getDocumentSlugs } from "outstatic/server";
import { OstMarkdown } from "@/components/OstMarkdown";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, TagIcon, FolderIcon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";
import TableOfContents from "@/components/TableOfContents";

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

  const post = getDocumentBySlug("posts", slug, [
    "title",
    "description",
    "cover_image",
    "published_at",
    "author",
  ]) as Post | null;

  if (!post) {
    return {};
  }

  // Create a rich metadata object with enhanced properties
  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
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
      publishedTime: post.published_at,
      authors: [post.author],
      siteName: process.env.NEXT_PUBLIC_SITE_NAME || "My Blog",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.cover_image],
      creator: `@${process.env.NEXT_PUBLIC_TWITTER_HANDLE || "yourusername"}`,
    },
  };
}

// Beautified Blog Post Page with improved layout for link previews
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
      <TableOfContents />
      <div className="neobrutalist-card p-8">
        {/* Header: Title, Description, and Metadata Bar */}
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold mb-4">{post.title}</h1>
          <p className="text-lg text-muted-foreground mb-4">
            {post.description}
          </p>

          {/* Metadata Bar: Author, Date, Categories in a single line */}
          <div className="flex flex-wrap items-center gap-4 py-3 px-4 bg-muted rounded-md">
            {/* Author */}
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/media/avatar.jpg" alt={post.author} />
                <AvatarFallback>{post.author[0]}</AvatarFallback>
              </Avatar>
              <span className="font-medium">{post.author}</span>
            </div>

            {/* Date */}
            <div className="flex items-center text-sm">
              <CalendarIcon className="w-4 h-4 mr-1" />
              <time dateTime={post.published_at}>
                {formatDate(post.published_at)}
              </time>
            </div>

            {/* Categories */}
            {post.categories.length > 0 && (
              <div className="flex items-center gap-2">
                <FolderIcon className="w-4 h-4" />
                <div className="flex gap-1">
                  {post.categories.slice(0, 3).map((category) => (
                    <Badge
                      key={category}
                      variant="default"
                      className="text-xs py-0.5 px-2">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </header>

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

        {/* Post Content */}
        <article className="prose dark:prose-invert max-w-none mb-10">
          <OstMarkdown content={post.content} />
        </article>

        {/* Footer with full categories and tags */}
        <footer className="mt-6 pt-6 border-t border-black">
          {/* Full Categories and Tags Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Categories */}
            {post.categories.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
                  <FolderIcon className="w-4 h-4" />
                  Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((category) => (
                    <Badge
                      key={category}
                      variant="secondary"
                      className="py-1 px-3 text-sm">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {post.tags.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
                  <TagIcon className="w-4 h-4" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="py-1 px-3 text-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Author Signature - could add social links here */}
          <div className="flex justify-between items-center flex-wrap gap-4 mt-6 pt-6 border-t border-muted">
            <p className="text-sm text-muted-foreground">
              Published on {formatDate(post.published_at)}
            </p>

            {/* Share links could go here */}
            <div className="flex gap-2">
              {/* Add your share buttons here */}
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
