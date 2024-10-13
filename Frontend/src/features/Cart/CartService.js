import axios from "axios";
import { base_url } from "../../utils/baseURL.js";
import config  from "../../utils/axiosconfig.js";

// Add to Cart function
const addToCart = async (productData) => {
    try {
        const response = await axios.post(`${base_url}user/cart`, productData, config);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Get Cart function
const getCart = async () => {
    try {
        const response = await axios.get(`${base_url}user/cart`, config);
        const cart = {
            products: response.data.products,
            cartTotal: response.data.cartTotal,
            totalAfterDiscount: response.data.totalAfterDiscount,
        }
        return cart;
        // console.log(cart)
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Delete Product from Cart function
const deleteCartProduct = async (productId) => {
    try {
        const response = await axios.delete(`${base_url}user/cart/${productId}`, config);
        return response.data; // Could return the updated cart or a success message
    } catch (error) {
        throw error.response?.data || error.message;
    }
};


// Apply coupon function
const applyCoupon = async (coupon) => {
    try {
        const response = await axios.post(`${base_url}user/cart/applycoupon`, { coupon }, config);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};


// Create Order function
const createOrder = async (orderData) => {
    try {
        const response = await axios.post(`${base_url}user/cart/cash-order`, orderData, config);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Export all cart-related functions
export const cartService = {
    getCart,
    addToCart,
    deleteCartProduct,
    applyCoupon,
    createOrder,
};
