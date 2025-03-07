import Link from "next/link";
import Image from "next/image";
import { CalendarIcon, BookOpenIcon, ClockIcon } from "lucide-react";
import { formatDate } from "@/lib/utils";

function getReadingTime(content: string): number {
  // First, let's handle the markdown tables which can be hard to parse
  const withoutTables = content.replace(/\|.*\|/g, "");

  // Remove code blocks
  const withoutCodeBlocks = withoutTables.replace(/```[\s\S]*?```/g, "");

  // Remove YAML frontmatter
  const withoutFrontmatter = withoutCodeBlocks.replace(/^---[\s\S]*?---/m, "");

  // Only remove specific sections we don't want to count - using partial matching
  const sectionsToExcludeKeywords = [
    "FAQ",
    "Frequently Asked",
    "Key Takeaway",
    "Conclusion",
  ];
  let filteredContent = withoutFrontmatter;

  for (const keyword of sectionsToExcludeKeywords) {
    // This regex looks for headings that contain the keyword and captures all content
    // until the next heading or end of document
    const sectionRegex = new RegExp(
      `## [^#]*${keyword}[^#]*[\\s\\S]*?(## |$)`,
      "i"
    );
    filteredContent = filteredContent.replace(sectionRegex, "$1");
  }

  // Clean up the text but preserve the actual content words
  const cleanText = filteredContent
    .replace(/`[^`]*?`/g, "") // Remove inline code
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // Preserve link text, remove only URLs
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "") // Remove images
    .replace(/#+ /g, "") // Remove heading markers but keep the text
    .replace(/\*\*|\*|__|\|/g, "") // Remove bold and italic markers and table separators
    .replace(/>/g, "") // Remove blockquotes
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/\s+/g, " ") // Replace multiple spaces with a single space
    .trim(); // Trim leading and trailing spaces

  // Count words
  const numberOfWords = cleanText.split(/\s+/).length;

  // Calculate reading time
  const wordsPerMinute = 250;
  return Math.ceil(numberOfWords / wordsPerMinute);
}

// Interface for Post Data
export interface PostData {
  title: string;
  description: string;
  slug: string;
  published_at: string;
  cover_image?: string;
  author?: string;
  categories?: string[];
  content?: string;
}

// Props for PostCard Component
interface PostCardProps {
  post: PostData;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const displayCategories = post.categories?.slice(0, 3) || [];

  return (
    <div className="h-full flex flex-col neobrutalist-card overflow-hidden">
      <Link href={`/posts/${post.slug}`} className="block">
        {post.cover_image && (
          <div className="relative h-48 w-full">
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        {/* Categories */}
        <div className="flex gap-2 mb-3 flex-wrap">
          {displayCategories.map((category, index) => (
            <span
              key={index}
              className="
                px-2 py-1 
                text-xs 
                font-bold 
                border-2 border-black 
                bg-secondary 
                brutal-shadow
              ">
              {category}
            </span>
          ))}
        </div>

        {/* Title */}
        <Link href={`/posts/${post.slug}`} className="block mb-3">
          <h3
            className="
            text-lg 
            font-extrabold 
            tracking-tight 
            line-clamp-2 
            hover:text-primary 
            transition-colors
          ">
            {post.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {post.description}
        </p>

        {/* Footer */}
        <div className="mt-auto flex justify-between items-center pt-4 border-t-2 border-black">
          <FormattedDate date={post.published_at} />
          <ReadTime post={post} iconSize={3} />
        </div>
      </div>
    </div>
  );
};

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
    <span>{getReadingTime(post.content || "")} min read</span>
  </div>
);

export default PostCard;
