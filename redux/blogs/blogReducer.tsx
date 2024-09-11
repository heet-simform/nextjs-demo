import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type blogData = {
  title: string;
  description: string;
  image: string | null;
  id: string;
  blogId: string;
};

type EmptyBlogData = { blogs: [] };
type FilledBlogData = { blogs: blogData[] };

type blogState = FilledBlogData | EmptyBlogData;

const initialState: blogState = {
  blogs: [],
};

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    addBlogDetails: (state, action: PayloadAction<blogData>) => {
      const updatedBlogs = [...(state.blogs || []), action.payload];
      state.blogs = updatedBlogs;
    },
    getBlogData: (state, action: PayloadAction<blogData[]>) => {
      state.blogs = action.payload;
    },
    deleteBlog: (state, action: PayloadAction<{ id: string }>) => {
      const updatedBlogs = [
        ...state.blogs.filter((blog) => blog.blogId != action.payload.id),
      ];
      state.blogs = updatedBlogs;
    },
  },
});

export const { addBlogDetails, getBlogData, deleteBlog } = blogSlice.actions;
export default blogSlice.reducer;
