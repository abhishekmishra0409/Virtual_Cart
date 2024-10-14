import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./ProductService";
import { toast } from "react-toastify";

// Fetch all products
export const fetchProducts = createAsyncThunk(
    "products/fetchAll",
    async (_, thunkApi) => {
        try {
            return await productService.getAllProducts();
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Fetch single product details
export const fetchProductDetails = createAsyncThunk(
    "products/fetchDetails",
    async (productId, thunkApi) => {
        try {
            return await productService.getProductById(productId);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Fetch top-selling products
export const fetchTopSellingProducts = createAsyncThunk(
    'products/fetchTopSelling',
    async (_, thunkApi) => {
        try {
            return await productService.getFeaturedProducts();
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Fetch trending products for the week
export const fetchTrendingProducts = createAsyncThunk(
    'products/fetchTrending',
    async (_, thunkApi) => {
        try {
            return await productService.getTrendingProducts();
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Fetch search results
export const fetchSearchResults = createAsyncThunk(
    'search/fetchResults',
    async (query, thunkAPI) => {
        try {
           return  await productService.searchProducts(query);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Add to Wishlist
export const addToWishlist = createAsyncThunk(
    "products/addToWishlist",
    async (prodId, thunkApi) => {
        try {
            const response = await productService.addToWishlist(prodId);
            return response;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Remove from Wishlist
export const removeToWishlist = createAsyncThunk(
    "products/removeFromWishlist",
    async (prodId, thunkApi) => {
        try {
            const response = await productService.addToWishlist(prodId);
            return response;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Fetch all products by category
export const fetchProductsByCategory = createAsyncThunk(
    "products/category",
    async (id, thunkApi) => {
        try {
            return await productService.getProductsByCategory(id);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Fetch all products by color
export const fetchProductsByColor = createAsyncThunk(
    "products/color",
    async (id, thunkApi) => {
        try {
            return await productService.getProductsByColor(id);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Fetch all products by price
export const fetchProductsByPrice = createAsyncThunk(
    "products/price",
    async ({gte,lte}, thunkApi) => {
        try {
            return await productService.getProductsByPrice({gte,lte});
            // console.log(lte)
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const addProductReview = createAsyncThunk(
    'products/addReview',
    async (reviewData, thunkApi) => {
        try {
            return await productService.addProductReview(reviewData);
        } catch (error) {

            const message = error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : error.message || "Failed to add product review";
            return thunkApi.rejectWithValue(message);
        }
    }
);


// Initial state for products
const initialState = {
    products: [],
    productsByCategory :[],
    productsByColor :[],
    productsByPrice :[],
    topSellingProducts: [],
    trendingProducts: [],
    reviews: [],
    results: [],
    productDetails: null,
    isLoadingProducts: false,
    isLoadingWishlist: false,
    isLoading:false,
    isError: false,
    isSuccess: false,
    message: "",
};

// Product slice
const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        resetProductState: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
            state.productDetails = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all products
            .addCase(fetchProducts.pending, (state) => {
                state.isLoadingProducts = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoadingProducts = false;
                state.isError = false;
                state.isSuccess = true;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoadingProducts = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload || "Failed to fetch products";
            })

            // Fetch top-selling products
            .addCase(fetchTopSellingProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTopSellingProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.topSellingProducts = action.payload;
            })
            .addCase(fetchTopSellingProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || 'Failed to fetch top-selling products';
            })

            // Fetch product details
            .addCase(fetchProductDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.productDetails = action.payload;
                state.reviews = action.payload;
            })
            .addCase(fetchProductDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload || "Failed to fetch product details";
            })

            // Fetch trending products
            .addCase(fetchTrendingProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTrendingProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.trendingProducts = action.payload;
            })
            .addCase(fetchTrendingProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || 'Failed to fetch trending products';
            })
            .addCase(fetchSearchResults.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchSearchResults.fulfilled, (state, action) => {
                state.isLoading = false;
                state.results = action.payload;
            })
            .addCase(fetchSearchResults.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // Add to Wishlist
            .addCase(addToWishlist.pending, (state) => {
                state.isLoadingWishlist = true;
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.isLoadingWishlist = false;
                state.isError = false;
                state.isSuccess = true;
                toast.success("Added to wishlist successfully!");
            })
            .addCase(addToWishlist.rejected, (state, action) => {
                state.isLoadingWishlist = false;
                state.isError = true;
                state.isSuccess = false;
                toast.error(action.payload || "Failed to add to wishlist");
            })

            // Remove from Wishlist
            .addCase(removeToWishlist.pending, (state) => {
                state.isLoadingWishlist = true;
            })
            .addCase(removeToWishlist.fulfilled, (state, action) => {
                state.isLoadingWishlist = false;
                state.isError = false;
                state.isSuccess = true;
                toast.success("Removed from wishlist successfully!");
            })
            .addCase(removeToWishlist.rejected, (state, action) => {
                state.isLoadingWishlist = false;
                state.isError = true;
                state.isSuccess = false;
                toast.error(action.payload || "Failed to remove from wishlist");
            })
            //fetch Product By category
            .addCase(fetchProductsByCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.productsByCategory = action.payload;
            })
            .addCase(fetchProductsByCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload || "Failed to fetch product details";
            })
            //fetch Product By color
            .addCase(fetchProductsByColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProductsByColor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.productsByColor = action.payload;
            })
            .addCase(fetchProductsByColor.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload || "Failed to fetch product details";
            })
            //fetch Product By price
            .addCase(fetchProductsByPrice.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProductsByPrice.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.productsByPrice = action.payload;
            })
            .addCase(fetchProductsByPrice.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload || "Failed to fetch product details";
            })
            .addCase(addProductReview.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(addProductReview.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.reviews = action.payload;
                state.productDetails = action.payload;
                state.message = "Review added successfully!";
                toast.success(state.message);
            })
            .addCase(addProductReview.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload || "Failed to add product review";
                toast.error(state.message);
            });
    },
});

export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;
