import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cartService } from "./CartService.js";
import { toast } from "react-toastify";
import {authService} from "../User/UserService.js";

// Async thunk to add an item to the cart
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (productData, thunkApi) => {
        try {
            return await cartService.addToCart(productData);
        } catch (e) {
            return thunkApi.rejectWithValue(e.response?.data || e.message);
        }
    }
);

// Async thunk to get the cart items
export const getCart = createAsyncThunk(
    "cart/getCart",
    async (_, thunkApi) => {
        try {
            return await cartService.getCart();
        } catch (e) {
            return thunkApi.rejectWithValue(e.response?.data || e.message);
        }
    }
);

// Async thunk to delete a product from the cart
export const deleteCartProduct = createAsyncThunk(
    "cart/deleteCartProduct",
    async (productId, thunkApi) => {
        try {
            return await cartService.deleteCartProduct(productId);
        } catch (e) {
            return thunkApi.rejectWithValue(e.response?.data || e.message);
        }
    }
);


// Async thunk to apply a coupon
export const applyCoupon = createAsyncThunk(
    "auth/applyCoupon",
    async (couponCode, thunkApi) => {
        try {
            return await cartService.applyCoupon(couponCode);
        } catch (e) {
            return thunkApi.rejectWithValue(e.response?.data || e.message);
        }
    }
);

// Async thunk to create a new order
export const createOrder = createAsyncThunk(
    "order/createOrder",
    async (orderData, thunkApi) => {
        try {
            return await cartService.createOrder(orderData);
        } catch (e) {
            return thunkApi.rejectWithValue(e.response?.data || e.message);
        }
    }
);

const initialState = {
    cart: [],
    cartTotal: 0,
    totalAfterDiscount: 0,
    coupon: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart(state, action) {
            state.cart = action.payload;
        },
        clearCart(state) {
            state.cart = [];
        },
    },
    extraReducers: (builder) => {
        builder
            // Add to Cart
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;

                // Check if product already exists in the cart, update its quantity if it does
                const existingProductIndex = state.cart.findIndex(
                    (item) => item.productId === action.payload.productId
                );

                if (existingProductIndex >= 0) {
                    // Update the product quantity
                    state.cart[existingProductIndex].quantity += action.payload.quantity;
                } else {
                    // Add new product to the cart
                    state.cart.push(action.payload);
                }

                // Update cartTotal
                state.cartTotal += action.payload.price * action.payload.quantity;
                toast.success("Item added to cart!");
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload || "Failed to add item to cart";
                toast.error(state.message);
            })

            // Get Cart
            .addCase(getCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.cart = action.payload.products || [];
                state.cartTotal = action.payload.cartTotal;
                // state.totalAfterDiscount = action.payload.cartTotal;
            })
            .addCase(getCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Failed to fetch cart";
                toast.error(state.message);
            })

            // Delete Cart Product
            .addCase(deleteCartProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCartProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;

                // Remove the product from the cart by productId
                const updatedCart = state.cart.filter(
                    (item) => item.productId !== action.meta.arg
                );
                state.cart = updatedCart;

                // Optionally, recalculate cartTotal if needed
                state.cartTotal = state.cart.reduce((total, item) => {
                    return total + item.price * item.quantity;
                }, 0);

                toast.success("Item removed from cart!");
            })
            .addCase(deleteCartProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload || "Failed to remove item from cart";
                toast.error(state.message);
            })

            // Apply coupon
            .addCase(applyCoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(applyCoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.coupon = action.payload.coupon;
                state.totalAfterDiscount = action.payload.totalAfterDiscount;
                toast.success("Coupon applied successfully!");
            })
            .addCase(applyCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Invalid or expired coupon";
                toast.error(state.message);
            })
            // Create order
            .addCase(createOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                toast.success("Order created successfully!");
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Failed to create order";
                toast.error(state.message);
            });

    },
});

export const { setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
