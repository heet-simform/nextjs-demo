import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type blogData = {
  title: string;
  description: string;
  image: string | null;
  id: string | null;
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
  },
});

export const { addBlogDetails, getBlogData } = blogSlice.actions;
export default blogSlice.reducer;
