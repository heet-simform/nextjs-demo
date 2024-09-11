import Image from "next/image";
import { blogData } from "@/redux/blogs/blogReducer";
import React from "react";
import DeleteBlog from "./DeleteBlog";

function BlogList({ blogs }: { blogs: blogData[] }) {
  if (!blogs || blogs.length === 0) {
    return (
      <p className="text-2xl text-white flex justify-center items-center h-screen">
        No blogs yet, please click on publish blog action to add a blog.
      </p>
    );
  }
  return (
    <div className="container mt-32">
      <div className="grid grid-cols-3 gap-12 ">
        {blogs.map((blog) => (
          <div key={blog.blogId} className="rounded-md">
            <div className="h-96 relative">
              <Image
                src={blog.image ?? ""}
                className="object-cover"
                fill
                alt={blog.title}
              />
            </div>
            <div className="flex justify-between p-2">
              <h1 className="text-white text-3xl">{blog.title}</h1>
              <DeleteBlog userId={blog.id} blogId={blog.blogId} />
            </div>
            <p className="text-white line-clamp-2 p-2">{blog.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogList;
