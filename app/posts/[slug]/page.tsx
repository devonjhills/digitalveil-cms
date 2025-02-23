// app/posts/[slug]/page.tsx

import { load } from "outstatic/server";
import { notFound } from "next/navigation";
import { OstMarkdown } from "@/components/OstMarkdown";
import Image from "next/image";
import { Metadata } from "next";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const db = await load();
  const posts = await db
    .find({ collection: "posts" })
    .project(["slug"])
    .toArray();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each post
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  if (!params?.slug) {
    return {};
  }
  const db = await load();
  const post = await db
    .find({ collection: "posts", slug: params.slug })
    .project(["title", "description", "coverImage"]) // Fetch title and description
    .first();

  if (!post) {
    return {}; // Return empty metadata if post not found.
  }

  const metadata: Metadata = {
    title: post.title,
    description: post.description,
  };

  // Conditionally add openGraph if coverImage exists.
  if (post.coverImage) {
    metadata.openGraph = {
      title: post.title,
      description: post.description,
      images: [{ url: post.coverImage }], // Correctly format images
    };
  }
  return metadata;
}

export default async function PostPage({ params }: PageProps) {
  const db = await load();
  if (!params?.slug) {
    notFound();
  }
  const post = await db
    .find({ collection: "posts", slug: params.slug })
    .project(["title", "publishedAt", "content", "coverImage", "description"])
    .first();

  if (!post) {
    notFound();
  }

  return (
    <article className="container prose prose-slate max-w-none dark:prose-invert">
      <header className="mb-8">
        {post.coverImage && (
          <div className="relative aspect-w-16 aspect-h-9 mb-4 rounded-lg overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <p className="text-muted-foreground text-sm">
          Published: {post.publishedAt}
        </p>
      </header>

      <OstMarkdown content={post.content} />
    </article>
  );
}
