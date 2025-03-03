import { load } from "outstatic/server";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  ArrowRightIcon,
  BookOpenIcon,
  ClockIcon,
} from "lucide-react";

// Format date helper function
function formatDate(dateString: string): string {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Get estimated reading time
function getReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const numberOfWords = text.split(/\s/g).length;
  return Math.ceil(numberOfWords / wordsPerMinute);
}

// Define an interface that matches what we get from Outstatic
interface PostData {
  title: string;
  description: string;
  slug: string;
  published_at: string;
  cover_image?: string;
  author?: string;
  categories?: string[];
  content?: string;
}

export default async function PostsHome() {
  const db = await load();
  const posts = await db
    .find({ collection: "posts" })
    .project([
      "title",
      "description",
      "slug",
      "published_at",
      "cover_image",
      "author",
      "categories",
      "content", // Include content to calculate reading time
    ])
    .sort({ published_at: -1 })
    .limit(6) // Increased to show more posts
    .toArray();

  // Convert the posts to our expected format
  const typedPosts = posts as unknown as PostData[];

  const heroPost = typedPosts[0];
  const featuredPosts = typedPosts.slice(1, 3);
  const recentPosts = typedPosts.slice(3);

  return (
    <main className="container py-12">
      {/* Hero Section */}
      {heroPost && (
        <section className="mb-16">
          <Card className="overflow-hidden border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,0.8)] transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              {heroPost.cover_image && (
                <div className="relative w-full h-96 md:h-[500px]">
                  <Image
                    src={heroPost.cover_image}
                    alt={heroPost.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )}
              <div className="p-8 md:p-10">
                {heroPost.categories && heroPost.categories.length > 0 && (
                  <Badge className="mb-4 text-xs px-3 py-1 bg-primary/90 hover:bg-primary">
                    {String(heroPost.categories[0])}
                  </Badge>
                )}
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  {heroPost.title}
                </h1>
                <p className="text-muted-foreground mb-6">
                  {heroPost.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    <time dateTime={heroPost.published_at}>
                      {formatDate(heroPost.published_at)}
                    </time>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    <span>
                      {getReadingTime(heroPost.content || "")} min read
                    </span>
                  </div>
                </div>
                <Link
                  href={`/posts/${heroPost.slug}`}
                  className="flex items-center gap-2 font-medium group">
                  Read full article
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </Card>
        </section>
      )}

      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Posts</h2>
            <Link
              href="/posts"
              className="text-sm font-medium flex items-center gap-1 hover:underline">
              View all <ArrowRightIcon className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <Card
                key={post.slug}
                className="overflow-hidden border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] transition-all duration-300">
                <Link href={`/posts/${post.slug}`} className="block h-full">
                  {post.cover_image && (
                    <div className="relative w-full h-64">
                      <Image
                        src={post.cover_image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex gap-2 mb-2">
                      {post.categories && post.categories.length > 0 && (
                        <Badge variant="outline" className="text-xs">
                          {String(post.categories[0])}
                        </Badge>
                      )}
                      <div className="text-xs text-muted-foreground flex items-center">
                        <ClockIcon className="w-3 h-3 mr-1" />
                        {getReadingTime(post.content || "")} min
                      </div>
                    </div>
                    <h3 className="text-xl font-bold">{post.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-2">
                      {post.description}
                    </p>
                  </CardContent>
                  <CardFooter className="pt-0 flex justify-between">
                    <div className="text-sm text-muted-foreground flex items-center">
                      <CalendarIcon className="w-3 h-3 mr-1" />
                      {formatDate(post.published_at)}
                    </div>
                    <span className="text-sm font-medium flex items-center gap-1">
                      Read more <ArrowRightIcon className="w-3 h-3" />
                    </span>
                  </CardFooter>
                </Link>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Recent Posts Section */}
      {recentPosts.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Recent Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <Card
                key={post.slug}
                className="overflow-hidden border border-black/60 hover:border-black shadow-md hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-300">
                <Link href={`/posts/${post.slug}`} className="block h-full">
                  {post.cover_image && (
                    <div className="relative w-full h-48">
                      <Image
                        src={post.cover_image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <time dateTime={post.published_at}>
                        {formatDate(post.published_at)}
                      </time>
                      <div className="flex items-center gap-1">
                        <BookOpenIcon className="w-3 h-3" />
                        {getReadingTime(post.content || "")} min
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
