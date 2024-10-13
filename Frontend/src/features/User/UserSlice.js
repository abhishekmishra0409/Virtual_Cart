import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./UserService.js";
import { toast } from "react-toastify";

// Async thunk for user registration
export const registerUser = createAsyncThunk(
    "auth/register",
    async (userData, thunkApi) => {
        try {
            return await authService.register(userData);
        } catch (e) {
            return thunkApi.rejectWithValue(e.response?.data || e.message);
        }
    }
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
    "auth/login",
    async (loginData, thunkApi) => {
        try {
            return await authService.login(loginData);

        } catch (e) {
            return thunkApi.rejectWithValue(e.response?.data || e.message);
        }
    }
);

// Async thunk to update user profile
export const updateUser = createAsyncThunk(
    "auth/updateUser",
    async (userData, thunkApi) => {
        try {
            return await authService.updateUser(userData);
        } catch (e) {
            return thunkApi.rejectWithValue(e.response?.data || e.message);
        }
    }
);

// Async thunk to add or update user address
export const addAddress = createAsyncThunk(
    "auth/addAddress",
    async (addressData, thunkApi) => {
        try {
            return await authService.addAddress(addressData);
        } catch (e) {
            return thunkApi.rejectWithValue(e.response?.data || e.message);
        }
    }
);


// Async thunk for user logout
export const logout = createAsyncThunk(
    "auth/logout",
    async (_, thunkApi) => {
        try {
            await authService.logout();
        } catch (e) {
            return thunkApi.rejectWithValue(e.response?.data || e.message);
        }
    }
);

// Async thunk to fetch the wishlist
export const getWishlist = createAsyncThunk(
    "auth/getWishlist",
    async (_, thunkApi) => {
        try {
            return await authService.getWishlist();
        } catch (e) {
            return thunkApi.rejectWithValue(e.response?.data || e.message);
        }
    }
);

export const fetchCategories = createAsyncThunk(
    'category/fetchCategories',
    async (_, thunkAPI) => {
        try {
            return await authService.getCategories();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const fetchColor = createAsyncThunk(
    'color/fetchColor',
    async (_, thunkAPI) => {
        try {
            return await authService.getColor();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to fetch user orders
export const getOrders = createAsyncThunk(
    "order/getOrders",
    async (_, thunkApi) => {
        try {
            return await authService.getOrders();
        } catch (e) {
            return thunkApi.rejectWithValue(e.response?.data || e.message);
        }
    }
);


const initialState = {
    user: null,
    isAuthenticated: false,
    wishlist: [],
    cart: [],
    categories: [],
    color:[],
    orders: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // Register user
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.isAuthenticated = true;
                toast.success("Registration successful! Please login.");
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload || "Something went wrong";
                toast.error(state.message);
            })

            // Login user
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.isAuthenticated = true;
                toast.success("Login successful!");
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload || "Invalid credentials";
                state.isAuthenticated = false;
                toast.error(state.message);
            })
            // Update user profile
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.user = action.payload;
                toast.success("User profile updated successfully!");
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Failed to update profile";
                toast.error(state.message);
            })

            // Add or update address
            .addCase(addAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.user = { ...state.user, address: action.payload.address };
                toast.success("Address updated successfully!");
            })
            .addCase(addAddress.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Failed to update address";
                toast.error(state.message);
            })
            // Logout user
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.wishlist = [];
                state.isSuccess = false;
                state.isError = false;
                state.isLoading = false;
                toast.success("Logged out successfully.");
            })
            .addCase(logout.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload || "Logout failed.";
                toast.error(state.message);
            })

            // Get wishlist
            .addCase(getWishlist.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.wishlist = action.payload;
            })
            .addCase(getWishlist.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Failed to fetch wishlist";
                toast.error(state.message);
            })
            //get all categories
            .addCase(fetchCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Something went wrong";
            })
            // Get orders
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.orders = action.payload;
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Failed to fetch orders";
                toast.error(state.message);
            })
            //get all color
            .addCase(fetchColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchColor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.color = action.payload;
            })
            .addCase(fetchColor.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Something went wrong";
            });
    },
});

export const { setAuthenticated } = authSlice.actions;
export default authSlice.reducer;