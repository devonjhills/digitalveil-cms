"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { PostData } from "@/components/PostCard";

interface PostFilterProps {
  posts: PostData[];
  onFilteredPosts: (filteredPosts: PostData[]) => void;
}

export default function PostFilter({
  posts,
  onFilteredPosts,
}: PostFilterProps) {
  // Extract unique categories from posts
  const allCategories = Array.from(
    new Set(posts.flatMap((post) => post.categories || []))
  ).sort();

  // State for selected categories
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  // Apply filtering when selected categories change
  useEffect(() => {
    // If no categories selected, show all posts
    if (selectedCategories.length === 0) {
      onFilteredPosts(posts);
      return;
    }

    // Filter posts that match any selected category
    const filteredPosts = posts.filter((post) => {
      if (!post.categories || post.categories.length === 0) return false;

      return selectedCategories.some((selectedCat) =>
        post.categories?.includes(selectedCat)
      );
    });

    onFilteredPosts(filteredPosts);
  }, [selectedCategories, posts, onFilteredPosts]);

  // Clear all selected categories
  const clearCategories = () => {
    setSelectedCategories([]);
  };

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-wrap items-center gap-2 brutal-border bg-secondary p-4">
        <h3 className="text-lg font-extrabold mr-4">Filter by Category:</h3>
        <div className="flex flex-wrap gap-2">
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`
                px-3 py-1 text-sm font-bold 
                border-2 border-black 
                transition-all duration-200
                ${
                  selectedCategories.includes(category)
                    ? "bg-primary text-primary-foreground brutal-shadow"
                    : "bg-background hover:bg-accent/20"
                }
              `}>
              {category}
            </button>
          ))}

          {selectedCategories.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={clearCategories}
              className="neobrutalist-button flex items-center">
              <X className="h-4 w-4 mr-1" /> Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
