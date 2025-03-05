import { load } from "outstatic/server";
import { PostData } from "@/components/PostCard";
import PostsFilterWrapper from "@/components/PostsFilterWrapper";

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
    .limit(20) // Load more initial posts
    .toArray()) as unknown as PostData[];

  // Pass initial posts to the client-side wrapper
  return <PostsFilterWrapper initialPosts={posts} />;
}
