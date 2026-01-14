"use client";

import { useState, useEffect } from "react";
import { MediumPost } from "@/lib/medium";
import Image from "next/image";

interface BlogCardsProps {
  posts: MediumPost[];
}

export default function BlogCards({ posts }: BlogCardsProps) {
  const [selectedPost, setSelectedPost] = useState<MediumPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (post: MediumPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedPost(null), 300); // Wait for fade out
    document.body.style.overflow = "unset";
  };

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Extract first image from content if thumbnail is missing or use placeholder
  const getThumbnail = (post: MediumPost) => {
    if (post.thumbnail) return post.thumbnail;
    const imgMatch = post.content.match(/<img[^>]+src="([^">]+)"/);
    return imgMatch ? imgMatch[1] : null;
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, idx) => (
          <button
            key={idx}
            onClick={() => openModal(post)}
            className="group flex flex-col text-left h-full p-6 bg-surface border border-border rounded-xl hover:border-primary transition-all hover:shadow-lg cursor-pointer"
          >
            <div className="flex justify-between items-start text-xs text-muted-foreground mb-4 w-full">
              <span>{formatDate(post.pubDate)}</span>
              <span className="bg-secondary px-2 py-0.5 rounded text-foreground">
                Medium
              </span>
            </div>

            <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>

            {/* Parse a snippet from description/content if needed, or just standard fields */}
            {/* Using a regex to strip HTML for the snippet */}
            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-auto">
              {post.description.replace(/<[^>]*>?/gm, "").slice(0, 120)}...
            </p>

            <div className="mt-6 flex items-center text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
              Read article &rarr;
            </div>
          </button>
        ))}
      </div>

      {/* MODAL */}
      {isModalOpen && selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={closeModal}
          ></div>

          <div className="relative w-full max-w-3xl max-h-[85vh] bg-background border border-border rounded-2xl shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-6 border-b border-border flex justify-between items-start shrink-0">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground pr-8">
                  {selectedPost.title}
                </h2>
                <div className="text-sm text-muted-foreground mt-2 flex gap-4">
                  <span>{formatDate(selectedPost.pubDate)}</span>
                  <a
                    href={selectedPost.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    View on Medium
                  </a>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-secondary rounded-full transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Content Scrollable */}
            <div className="overflow-y-auto p-6 md:p-10 prose prose-invert max-w-none">
              {/* Security Note: We are setting HTML from a likely trusted source (Medium RSS), but usually sanitization is recommended. 
                  For a portfolio fetching own feed, simpler is okay. */}
              <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border flex justify-end shrink-0">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
