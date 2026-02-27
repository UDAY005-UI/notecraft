"use client";

import { blogPosts } from "@/lib/blogData";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) return notFound();

  return (
    <div className="min-h-screen bg-white text-black">

      <div className="px-16 py-20 border-b border-gray-300">
        <h1 className="text-4xl font-semibold mb-6 max-w-4xl">
          {post.title}
        </h1>

        <div className="text-gray-600 text-sm space-x-4">
          <span>{post.author}</span>
          <span>{post.date}</span>
          <span>{post.readingTime}</span>
        </div>
      </div>

      <div className="px-16 py-16 max-w-4xl leading-relaxed text-lg text-gray-800 whitespace-pre-line">
        {post.content}
      </div>

    </div>
  );
}