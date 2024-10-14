import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productService from "./productService";
import {toast} from "react-toastify";

// Fetch all products
export const getProducts = createAsyncThunk(
    "product/get-products",
    async (thunkAPI) => {
      try {
        return await productService.getProducts();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

// Create a new product
export const createProducts = createAsyncThunk(
    "product/create-products",
    async (productData, thunkAPI) => {
      try {
        return await productService.createProduct(productData);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

// Get a single product by ID
export const getProductById = createAsyncThunk(
    "product/get-product-by-id",
    async (productId, thunkAPI) => {
      try {
        return await productService.getProductById(productId);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

// Update a product
export const updateProduct = createAsyncThunk(
    "product/update-product",
    async ({ productId, updatedData }, thunkAPI) => {
        try {
            return await productService.updateProduct(productId, updatedData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// Delete a product
export const deleteProduct = createAsyncThunk(
    "product/delete-product",
    async (productId, thunkAPI) => {
      try {
        return await productService.deleteProduct(productId);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

// Reset state
export const resetState = createAction("Reset_all");

// Initial state
const initialState = {
  products: [],
    productDetails: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// Product slice
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        // Get all products
        .addCase(getProducts.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getProducts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.products = action.payload;

        })
        .addCase(getProducts.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error.message;
        })
        // Create a new product
        .addCase(createProducts.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(createProducts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.products.push(action.payload);
            toast.success("Product Added Successfully!");
        })
        .addCase(createProducts.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error.message;
        })
        // Get a single product
        .addCase(getProductById.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getProductById.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.productDetails = action.payload;
        })
        .addCase(getProductById.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error.message;
        })
        // Update a product
        .addCase(updateProduct.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;

            // Check if action.payload is valid and contains an _id
            if (action.payload && action.payload._id) {
                const index = state.products.findIndex(product => product._id === action.payload._id);
                if (index !== -1) {
                    state.products[index] = action.payload; // Update the existing product
                }
                toast.success("Product Updated Successfully!");
            } else {
                state.isError = true;
                state.isSuccess = false;
                state.message = "Failed to update the product: Invalid response data.";
                toast.error("Failed to update the product: Invalid response data.");
            }
        })
        .addCase(updateProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error.message;
            toast.error("Failed to update the product.");
        })

      // Delete a product
        .addCase(deleteProduct.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.products = state.products.filter(product => product._id !== action.payload._id);
        })
        .addCase(deleteProduct.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error.message;
        })
        // Reset state
        .addCase(resetState, () => initialState);
  },
});

export default productSlice.reducer;
