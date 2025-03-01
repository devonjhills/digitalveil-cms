import { load } from "outstatic/server";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default async function PostsHome() {
  const db = await load();
  const posts = await db
    .find({ collection: "posts" })
    .project(["title", "description", "slug", "publishedAt", "coverImage"])
    .sort({ publishedAt: -1 })
    .limit(3)
    .toArray();

  const heroPost = posts[0];
  const featuredPosts = posts.slice(1);

  return (
    <main className="container py-12">
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
              <div className="relative w-full h-72 rounded-lg overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform duration-200 hover:scale-105">
                <Image
                  src={heroPost.coverImage}
                  alt={heroPost.title}
                  fill
                  className="object-cover"
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
                    <div className="relative w-full h-48 rounded-t-lg overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-xl font-semibold">{post.title}</h3>
                    <p className="text-muted-foreground mt-2">
                      {post.description}
                    </p>
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

      {/* Call to Action */}
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
