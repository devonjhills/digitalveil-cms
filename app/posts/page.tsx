// app/page.tsx

import { load } from "outstatic/server";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import Image from "next/image"; // Import Next.js Image component

export default async function PostsHome() {
  const db = await load();
  const posts = await db
    .find({ collection: "posts" })
    .project(["title", "description", "slug", "publishedAt", "coverImage"]) // Fetch coverImage
    .sort({ publishedAt: -1 })
    .limit(3) // Limit to 3 featured posts, adjust as needed.
    .toArray();

  const heroPost = posts[0]; // Get most recent post for hero
  const featuredPosts = posts.slice(1); // remaining posts for featured section

  return (
    <main className="container">
      {/* Hero Section */}
      {heroPost && (
        <section className="py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                {heroPost.title}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mt-4">
                {heroPost.description}
              </p>
              <Link
                href={`/posts/${heroPost.slug}`}
                className="mt-6 inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">
                Read More
              </Link>
            </div>
            {heroPost.coverImage && (
              <div className="relative aspect-w-16 aspect-h-9">
                <Image
                  src={heroPost.coverImage}
                  alt={heroPost.title}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <section className="py-12">
          <h2 className="text-3xl font-bold mb-8">Featured Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredPosts.map((post) => (
              <Card
                key={post.slug}
                className="hover:shadow-lg transition-shadow">
                <Link href={`/posts/${post.slug}`}>
                  {post.coverImage && (
                    <div className="relative aspect-w-16 aspect-h-9">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover rounded-t-lg"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-xl font-semibold">{post.title}</h3>
                    <p className="text-muted-foreground">{post.description}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Published: {post.publishedAt}
                    </p>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/*  Optional: Call to Action / More Posts Link */}
      <section className="py-12 text-center">
        <Link
          href="/posts"
          className="bg-secondary text-secondary-foreground px-6 py-3 rounded-md hover:bg-secondary/80 transition-colors">
          View All Posts
        </Link>
      </section>
    </main>
  );
}
