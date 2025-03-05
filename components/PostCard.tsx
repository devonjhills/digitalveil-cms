import Link from "next/link";
import Image from "next/image";
import { CalendarIcon, BookOpenIcon, ClockIcon } from "lucide-react";
import { formatDate } from "@/lib/utils";

// Utility function to calculate reading time
function getReadingTime(text: string): number {
  const cleanText = text
    .replace(
      /```[\s\S]*?```|`[^`]*?`|\[.*?\]\(.*?\)|!\[.*?\]\(.*?\)|[*_-]+|#+|>/g,
      ""
    )
    .replace(
      /<[A-Za-z][A-Za-z0-9]*(\s+[^>]*)?\/>|<\/[A-Za-z][A-Za-z0-9]*>|\{.*?\}/g,
      ""
    );
  const wordsPerMinute = 238;
  const numberOfWords = cleanText.split(/\s+/).length;
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
