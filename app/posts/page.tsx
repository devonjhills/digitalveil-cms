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
import { formatDate } from "@/lib/utils";

// --- Utility Function (Improved Regex and Clarity) ---
function getReadingTime(text: string): number {
  const cleanText = text
    .replace(
      /```[\s\S]*?```|`[^`]*?`|\[.*?\]\(.*?\)|!\[.*?\]\(.*?\)|[*_-]+|#+|>/g,
      ""
    ) // Markdown
    .replace(
      /<[A-Za-z][A-Za-z0-9]*(\s+[^>]*)?\/?>|<\/[A-Za-z][A-Za-z0-9]*>|\{.*?\}/g,
      ""
    ); // JSX

  const wordsPerMinute = 238;
  const numberOfWords = cleanText.split(/\s+/).length; // More robust word splitting
  return Math.ceil(numberOfWords / wordsPerMinute);
}

// --- Interface for Post Data ---
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

// --- Reusable Post Card Component ---
interface PostCardProps {
  post: PostData;
  variant?: "featured" | "recent" | "hero";
}

const PostCard: React.FC<PostCardProps> = ({ post, variant = "recent" }) => {
  const isHero = variant === "hero";
  const isFeatured = variant === "featured";

  const imageSize = isHero
    ? { width: "100%", height: "500px" }
    : isFeatured
    ? { width: "100%", height: "256px" }
    : { width: "100%", height: "192px" };

  const cardClasses = `overflow-hidden transition-all duration-300 ${
    isHero
      ? "border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,0.8)]"
      : isFeatured
      ? "border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)]"
      : "border border-black/60 hover:border-black shadow-md hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.6)]"
  } flex flex-col`; // Added flex and flex-col here

  const titleClasses = isHero
    ? "text-3xl md:text-4xl font-bold tracking-tight mb-4"
    : isFeatured
    ? "text-xl font-bold"
    : "font-semibold mb-2 line-clamp-2";

  // Category display logic
  const displayCategories = post.categories?.slice(0, 3) || [];

  return (
    <Card className={cardClasses}>
      {/* Outer Link wraps ONLY the image and the main title. */}
      <Link href={`/posts/${post.slug}`}>
        {post.cover_image && (
          <div className="relative" style={imageSize}>
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover"
              sizes={
                isHero || isFeatured
                  ? "(max-width: 768px) 100vw, 50vw"
                  : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              }
            />
          </div>
        )}
      </Link>

      {/* Content is OUTSIDE the main Link, but still inside the Card. */}
      {isHero ? ( // Hero is already flex-col
        <div className="p-8 md:p-10 flex flex-col h-full">
          {/* Display up to 3 categories */}
          {displayCategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {displayCategories.map((category, index) => (
                <Badge
                  key={index}
                  className="text-xs px-3 py-1 bg-primary/90 hover:bg-primary">
                  {category}
                </Badge>
              ))}
            </div>
          )}

          {/*Title is wrapped by the main Link. */}
          <Link href={`/posts/${post.slug}`}>
            <h1 className={titleClasses}>{post.title}</h1>
          </Link>

          <p className="text-muted-foreground mb-6">{post.description}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
            <DateAndReadTime post={post} />
          </div>
          {/* Separate Link for "Read full article". */}
          <ReadFullArticleLink slug={post.slug} />
        </div>
      ) : (
        // Added flex, flex-col, and h-full to the wrapping <div> for non-hero cards
        <div className="flex flex-col h-full">
          <CardHeader>
            {(isFeatured || isHero) && (
              <div className="flex gap-2 mb-2 flex-wrap">
                {/* Display up to 3 categories */}
                {displayCategories.map((category, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {category}
                  </Badge>
                ))}
                <ReadTime post={post} iconSize={isFeatured ? 3 : 4} />
              </div>
            )}
            {/*Title is wrapped by the main Link. */}
            <Link href={`/posts/${post.slug}`}>
              <h3 className={titleClasses}>{post.title}</h3>
            </Link>
          </CardHeader>
          {isFeatured && (
            <CardContent className="flex-grow">
              <p className="text-muted-foreground line-clamp-2">
                {post.description}
              </p>
            </CardContent>
          )}
          <CardFooter
            className={`pt-0 flex justify-between mt-auto ${
              // mt-auto is essential
              isFeatured ? "" : "items-center"
            }`}>
            {!isFeatured && (
              <>
                <FormattedDate date={post.published_at} />
                <ReadTime post={post} iconSize={3} useBookIcon />
              </>
            )}

            {isFeatured && (
              <>
                <FormattedDate date={post.published_at} />
                {/* Separate span for "Read more" (no nested <a>). */}
                <Link
                  href={`/posts/${post.slug}`}
                  className="text-sm font-medium flex items-center gap-1">
                  Read more <ArrowRightIcon className="w-3 h-3" />
                </Link>
              </>
            )}
          </CardFooter>
        </div>
      )}
    </Card>
  );
};

const ReadFullArticleLink: React.FC<{ slug: string }> = ({ slug }) => (
  <Link
    href={`/posts/${slug}`} // Corrected href
    className="flex items-center gap-2 font-medium group mt-auto">
    Read full article
    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
  </Link>
);

// --- Helper Components (for DRYing up the PostCard) ---

const FormattedDate: React.FC<{ date: string }> = ({ date }) => (
  <div className="text-sm text-muted-foreground flex items-center">
    <CalendarIcon className="w-3 h-3 mr-1" />
    <time dateTime={date}>{formatDate(date)}</time>
  </div>
);

const ReadTime: React.FC<{
  post: PostData;
  iconSize: number;
  useBookIcon?: boolean;
}> = ({ post, iconSize, useBookIcon }) => (
  <div className="text-xs text-muted-foreground flex items-center">
    {useBookIcon ? (
      <BookOpenIcon className={`w-${iconSize} h-${iconSize} mr-1`} />
    ) : (
      <ClockIcon className={`w-${iconSize} h-${iconSize} mr-1`} />
    )}
    <span>{getReadingTime(post.content || "")} min</span>
  </div>
);

const DateAndReadTime: React.FC<{ post: PostData }> = ({ post }) => (
  <>
    <div className="flex items-center">
      <CalendarIcon className="w-4 h-4 mr-1" />
      <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
    </div>
    <ReadTime post={post} iconSize={4} />
  </>
);

// --- Main Component ---

export default async function PostsHome() {
  const db = await load();
  const posts = (await db
    .find({ collection: "posts" })
    .project([
      "title",
      "description",
      "slug",
      "published_at",
      "cover_image",
      "author",
      "categories",
      "content",
    ])
    .sort({ published_at: -1 })
    .limit(6)
    .toArray()) as unknown as PostData[];

  const [heroPost, ...otherPosts] = posts;
  const featuredPosts = otherPosts.slice(0, 2);
  const recentPosts = otherPosts.slice(2);

  return (
    <main className="container py-12">
      {/* Hero Section */}
      {heroPost && (
        <section className="mb-16">
          <div className="grid grid-cols-1 items-center">
            <PostCard post={heroPost} variant="hero" />
          </div>
        </section>
      )}

      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Featured Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <PostCard key={post.slug} post={post} variant="featured" />
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
              <PostCard key={post.slug} post={post} variant="recent" />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
