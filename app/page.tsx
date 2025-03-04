import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";
import { load } from "outstatic/server";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

// Define an interface for a post
interface Post {
  slug: string;
  cover_image: string;
  title: string;
}

// Helper function that fetches posts using Outstatic's API
async function getFeaturedPosts(): Promise<Post[]> {
  // Load the database instance
  const db = await load();

  // Query the 'posts' collection and project only the needed fields
  const documents = await db
    .find({
      collection: "posts",
    })
    .project(["title", "slug", "cover_image"])
    .toArray();

  //eslint-disable-next-line
  const posts: Post[] = documents.map((doc: any) => ({
    slug: doc.slug,
    cover_image: doc.cover_image,
    title: doc.title,
  }));

  // Filter for the featured post (adjust logic as needed)
  return posts.filter((post) => post.slug === "ergonomic-home-office-setup");
}

// The Home page component, now an async server component
export default async function Home() {
  const featuredPosts = await getFeaturedPosts();

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-6 bg-background border-b-2 border-black">
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center space-y-8">
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl font-extrabold text-primary">
                Modern Living Redefined
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold mt-4 text-muted-foreground">
                Mindful Living in a Digital World
              </h2>
            </div>
            <p className="text-lg md:text-xl text-foreground/90 max-w-3xl mx-auto leading-relaxed">
              Discover practical tips and insights for creating balanced,
              healthy, and productive digital spaces that enhance your wellbeing
              and creativity.
            </p>
            <div className="pt-6">
              <Link href="/posts">
                <button className="neobrutalist-button group">
                  Start Your Journey
                  <ArrowRightIcon className="ml-2 h-4 w-4 inline transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.jpg"
            alt="Digital mindfulness background"
            fill
            priority
            className="object-cover opacity-20 backdrop-blur-sm"
          />
        </div>
      </section>

      <section className="py-16 px-4 md:px-6 bg-card">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-2xl font-bold mb-8 text-center text-primary">
            Featured Articles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <Card key={post.slug} className="overflow-hidden flex flex-col">
                <CardHeader className="p-0">
                  <div className="relative w-full aspect-video">
                    <Image
                      src={post.cover_image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CardHeader>
                <div className="p-4 flex flex-col flex-1">
                  <CardTitle className="text-xl font-semibold mb-4">
                    {post.title}
                  </CardTitle>
                  <CardFooter className="self-end">
                    <Link
                      href={`/posts/${post.slug}`}
                      className="flex items-center text-primary hover:underline">
                      Read More
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                  </CardFooter>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 px-4 md:px-6 bg-secondary border-t-2 border-black">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <div className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-none brutal-shadow">
            <span className="text-sm font-semibold">Ready to Begin?</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-accent-foreground">
            Transform Your Digital Life Today
          </h2>
          <p className="text-lg text-accent-foreground/90 max-w-2xl mx-auto">
            Join thousands of readers creating healthier relationships with
            technology.
          </p>
          <div className="pt-4">
            <Link href="/posts">
              <button className="neobrutalist-button bg-secondary text-secondary-foreground hover:bg-secondary/90 group">
                Explore All Articles
                <ArrowRightIcon className="ml-2 h-4 w-4 inline transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
