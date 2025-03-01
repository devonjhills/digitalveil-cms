// app/posts/[slug]/page.tsx

import { load } from "outstatic/server";
import { notFound } from "next/navigation";
import { OstMarkdown } from "@/components/OstMarkdown";
import Image from "next/image";
import { Metadata } from "next";
import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type Params = Promise<{ slug: string }>;

interface PageProps {
  params: Params;
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

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  if (!params?.slug) {
    return {};
  }

  const db = await load();
  const post = await db
    .find({ collection: "posts", slug: params.slug })
    .project(["title", "description", "coverImage ", "author"])
    .first();

  if (!post) {
    return {};
  }

  const metadata: Metadata = {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author?.name }],
  };

  if (post.coverImage ) {
    metadata.openGraph = {
      title: post.title,
      description: post.description,
      images: [{ url: post.coverImage  }],
    };
  }
  return metadata;
}

export default async function PostPage(props: PageProps) {
  const params = await props.params;
  if (!params?.slug) {
    notFound();
  }

  const db = await load();
  const post = await db
    .find({ collection: "posts", slug: params.slug })
    .project([
      "title",
      "publishedAt",
      "content",
      "coverImage ",
      "description",
      "author",
    ])
    .first();

  if (!post) {
    notFound();
  }

  console.log(post.publishedAt);

  const formattedDate = format(new Date(post.publishedAt), "MMMM d, yyyy");
  const formattedTime = format(new Date(post.publishedAt), "h:mm a");

  return (
    <main className="container max-w-4xl py-6 lg:py-10">
      <Card className="border-none shadow-none">
        <CardHeader className="space-y-6">
          {post.coverImage  && (
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src={post.coverImage }
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
              />
            </div>
          )}

          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
              {post.title}
            </h1>

            {post.description && (
              <p className="text-lg text-muted-foreground">
                {post.description}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {post.author && (
              <div className="flex items-center space-x-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={post.author.picture}
                    alt={post.author.name}
                  />
                  {post.author.name && (
                    <AvatarFallback>
                      {post.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{post.author.name}</span>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.publishedAt}>{formattedDate}</time>
                    <span>•</span>
                    <Clock className="h-4 w-4" />
                    <time dateTime={post.publishedAt}>{formattedTime}</time>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardHeader>

        <Separator className="my-6" />

        <CardContent>
          <OstMarkdown content={post.content} />
        </CardContent>
      </Card>
    </main>
  );
}
