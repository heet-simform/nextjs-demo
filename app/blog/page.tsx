"use client";

import BlogList from "@/components/BlogList";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";

function Blog() {
  const blogs = useAppSelector((state) => state.blogs.blogs);

  return (
    <div className="bg-gray-900 h-screen">
      <div className="h-16 border-b-2">
        <header className="container flex justify-end items-center h-full">
          <Link
            href="/blog/new-blog"
            className="text-white bg-gradient-to-r hover:bg-gradient-to-l from-purple-500 to-pink-500 inline-block  rounded-md  px-2 py-1 "
          >
            <span className="material-icons align-middle">add</span> publish
            blog
          </Link>
        </header>
      </div>
      <BlogList blogs={blogs} />
    </div>
  );
}

export default Blog;
