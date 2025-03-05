"use client";

import { useState } from "react";
import PostCard, { PostData } from "@/components/PostCard";
import PostFilter from "@/components/PostsFilter";

interface PostsFilterWrapperProps {
  initialPosts: PostData[];
}

export default function PostsFilterWrapper({
  initialPosts,
}: PostsFilterWrapperProps) {
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);
  const [visiblePosts, setVisiblePosts] = useState(10);

  return (
    <main className="container py-12 space-y-8">
      {/* Add PostFilter component */}
      <PostFilter posts={initialPosts} onFilteredPosts={setFilteredPosts} />

      {/* Posts Section */}
      {filteredPosts.length > 0 ? (
        <section className="space-y-6">
          <h2 className="text-3xl font-extrabold tracking-tight brutal-border bg-secondary p-4">
            {filteredPosts.length === 1
              ? "1 Post"
              : `${filteredPosts.length} Posts`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.slice(0, visiblePosts).map((post) => (
              <div key={post.slug} className="flex">
                <PostCard post={post} />
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {visiblePosts < filteredPosts.length && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setVisiblePosts((prev) => prev + 10)}
                className="neobrutalist-button">
                Load More Posts
              </button>
            </div>
          )}
        </section>
      ) : (
        <div className="accent-box text-center">
          <p className="text-muted-foreground font-bold">
            No posts match the selected categories.
          </p>
        </div>
      )}
    </main>
  );
}
