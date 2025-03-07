import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon, CalendarIcon } from "lucide-react";
import { load } from "outstatic/server";
import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

interface Post {
  title: string;
  description: string;
  slug: string;
  published_at: string;
  cover_image?: string;
  author?: string;
  categories?: string[];
  content?: string;
}

async function getFeaturedPosts(): Promise<Post[]> {
  const db = await load();
  const documents = await db
    .find({ collection: "posts" })
    .project(["title", "slug", "cover_image", "published_at", "description"])
    .toArray();

  //eslint-disable-next-line
  const posts: Post[] = documents.map((doc: any) => ({
    slug: doc.slug,
    cover_image: doc.cover_image,
    title: doc.title,
    published_at: doc.published_at,
    description: doc.description,
  }));

  // Hardcoded slugs for featured posts
  const featuredSlugs = [
    "ergonomic-home-office-setup",
    "productivity-techniques-remote-work",
    "standing-desks-workstations",
  ];

  return posts.filter((post) => featuredSlugs.includes(post.slug));
}

// Helper function to get the latest posts (excluding featured)
async function getLatestPosts(limit: number = 3): Promise<Post[]> {
  const db = await load();
  const featuredPosts = await getFeaturedPosts(); // Get featured posts to exclude
  const featuredSlugs = featuredPosts.map((post) => post.slug);

  const documents = await db
    .find({ collection: "posts" })
    .sort({ published_at: -1 })
    .project(["title", "slug", "cover_image", "published_at", "description"])
    .toArray();

  //eslint-disable-next-line
  const allPosts: Post[] = documents.map((doc: any) => ({
    slug: doc.slug,
    cover_image: doc.cover_image,
    title: doc.title,
    published_at: doc.published_at,
    description: doc.description,
  }));

  // Exclude featured posts and limit
  return allPosts
    .filter((post) => !featuredSlugs.includes(post.slug))
    .slice(0, limit);
}

export default async function Home() {
  const featuredPosts = await getFeaturedPosts();
  const latestPosts = await getLatestPosts(); // Fetch latest posts

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-6 bg-background border-b-2 border-black">
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center space-y-8">
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl font-extrabold text-primary prose dark:prose-invert">
                Modern Living Redefined
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold mt-4 text-muted-foreground prose dark:prose-invert">
                Mindful Living in a Digital World
              </h2>
            </div>
            <p className="text-lg md:text-xl text-foreground/90 max-w-3xl mx-auto leading-relaxed prose dark:prose-invert">
              Discover practical tips and insights for creating balanced,
              healthy, and productive digital spaces that enhance your wellbeing
              and creativity. We focus on actionable advice, not just theory.
            </p>
            {/*  Stronger CTA with benefit */}
            <div className="pt-6">
              <Link href="/posts">
                <button className="neobrutalist-button group">
                  Improve Your Digital Life
                  <ArrowRightIcon className="ml-2 h-4 w-4 inline transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.jpg" //  Use a more evocative image if possible
            alt="Digital mindfulness background"
            fill
            priority
            className="object-cover opacity-20 backdrop-blur-sm"
          />
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 px-4 md:px-6 bg-card">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {" "}
            {/* Changed to h2 and added text-center */}
            Featured Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <Card
                key={post.slug}
                className="overflow-hidden border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] transition-all duration-300 flex flex-col">
                <Link
                  href={`/posts/${post.slug}`}
                  className="h-full flex flex-col">
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
                  <CardHeader className="p-4">
                    <h3 className="text-xl font-bold prose dark:prose-invert">
                      {post.title}
                    </h3>
                  </CardHeader>
                  <CardContent className="p-4 flex-grow">
                    <p className="text-muted-foreground line-clamp-2 prose dark:prose-invert">
                      {post.description}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 mt-auto flex justify-between">
                    <div className="text-sm text-muted-foreground flex items-center prose dark:prose-invert">
                      <CalendarIcon className="w-3 h-3 mr-1" />
                      {formatDate(post.published_at)}
                    </div>
                    <span className="text-sm font-medium flex items-center gap-1 prose dark:prose-invert">
                      Read more <ArrowRightIcon className="w-3 h-3" />
                    </span>
                  </CardFooter>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/*  Latest Posts Section */}
      <section className="py-16 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {" "}
            {/* Changed to h2 and added text-center */}
            Latest Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <Card
                key={post.slug}
                className="overflow-hidden border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] transition-all duration-300 flex flex-col">
                <Link
                  href={`/posts/${post.slug}`}
                  className="block h-full flex flex-col">
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
                  <CardHeader className="p-4">
                    <h3 className="text-xl font-bold prose dark:prose-invert">
                      {post.title}
                    </h3>
                  </CardHeader>
                  <CardContent className="p-4 flex-grow">
                    <p className="text-muted-foreground line-clamp-2 prose dark:prose-invert">
                      {post.description}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 mt-auto flex justify-between">
                    <div className="text-sm text-muted-foreground flex items-center prose dark:prose-invert">
                      <CalendarIcon className="w-3 h-3 mr-1" />
                      {formatDate(post.published_at)}
                    </div>
                    <span className="text-sm font-medium flex items-center gap-1 prose dark:prose-invert">
                      Read more <ArrowRightIcon className="w-3 h-3" />
                    </span>
                  </CardFooter>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/*  Final CTA Section */}
      <section className="py-16 px-4 md:px-6 bg-secondary border-t-2 border-black">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight prose dark:prose-invert">
            Explore More
          </h2>
          <p className="text-lg max-w-2xl mx-auto prose dark:prose-invert">
            Ready to dive deeper? Browse all our articles and start transforming
            your digital life.
          </p>
          <div className="pt-4">
            <Link href="/posts">
              <button className="neobrutalist-button bg-primary hover:bg-primary/90 group">
                Browse All Articles
                <ArrowRightIcon className="ml-2 h-4 w-4 inline transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
