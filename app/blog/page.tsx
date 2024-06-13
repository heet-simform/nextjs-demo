"use client";

import AuthenticationWrapper from "@/HOC/AuthenticationWrapper";
import Link from "next/link";

function Blog() {
  return (
    <div className="bg white shadow-md h-12">
      <div className="container flex justify-between items-center h-full">
        <h1>Blog</h1>
        <Link
          href="/blog/new-blog"
          className="text-white bg-gradient-to-r hover:bg-gradient-to-l from-purple-500 to-pink-500 inline-block  rounded-md  px-2 py-1 "
        >
          <span className="material-icons align-middle">add</span> publish blog
        </Link>
      </div>
    </div>
  );
}

export default AuthenticationWrapper(Blog);
