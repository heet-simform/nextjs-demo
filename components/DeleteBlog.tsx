"use client";

import { deleteBlog } from "@/redux/blogs/blogReducer";
import { useAppSelector } from "@/redux/hooks";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

type DeleteBlogProps = {
  userId: string;
  blogId: string;
};

function DeleteBlog({ userId, blogId }: DeleteBlogProps) {
  const usersInfoId = useAppSelector((state) => state.users.id);
  const blogRecords = useAppSelector((state) => state.blogs.blogs);
  const dispatch = useDispatch();
  const blogData = blogRecords.filter((blog) => blog.blogId != blogId);
  const deleteBlogCallback = useCallback(() => {
    dispatch(
      deleteBlog({
        id: blogId,
      })
    );
    localStorage.setItem("blogs", JSON.stringify(blogData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogId, blogRecords]);

  if (usersInfoId === userId) {
    return (
      <>
        <button
          type="button"
          className="bg-red-500 rounded-md p-2 text-white"
          onClick={deleteBlogCallback}
        >
          Delete
        </button>
      </>
    );
  }
  return <></>;
}

export default DeleteBlog;
