import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import blogService from "./BlogService.js";

// Fetch all blogs
export const getAllBlogs = createAsyncThunk(
    "blog/get-all-blogs",
    async (_, thunkAPI) => {
        try {
            return await blogService.getAllBlogs();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// Fetch a blog by ID
export const getBlogById = createAsyncThunk(
    "blog/get-blog-by-id",
    async (blogId, thunkAPI) => {
        try {
            return await blogService.getBlogById(blogId);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// Fetch all blog categories
export const getAllBlogCategory = createAsyncThunk(
    "blog/get-all-blog-categories",
    async (_, thunkAPI) => {
        try {
            return await blogService.getAllBlogCategory();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// Fetch blogs by category
export const getBlogsByCategory = createAsyncThunk(
    "blog/get-blogs-by-category",
    async (categoryId, thunkAPI) => {
        try {
            return await blogService.getBlogsByCategory(categoryId);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// Reset state action
export const resetState = createAction("blog/reset-state");

const initialState = {
    blogs: [],
    blogDetails: null,
    categories: [],
    blogsByCategory: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
};

// Blog slice
const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get all blogs
            .addCase(getAllBlogs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllBlogs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.blogs = action.payload;
            })
            .addCase(getAllBlogs.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error.message;
            })
            // Get blog by ID
            .addCase(getBlogById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBlogById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.blogDetails = action.payload;
            })
            .addCase(getBlogById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error.message;
            })
            // Get all blog categories
            .addCase(getAllBlogCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllBlogCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.categories = action.payload;
            })
            .addCase(getAllBlogCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error.message;
            })
            // Get blogs by category
            .addCase(getBlogsByCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBlogsByCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.blogsByCategory = action.payload;
            })
            .addCase(getBlogsByCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error.message;
            })
            // Reset state
            .addCase(resetState, () => initialState);
    },
});

export default blogSlice.reducer;
