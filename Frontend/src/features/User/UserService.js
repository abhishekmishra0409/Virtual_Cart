import axios from "axios";
import { base_url } from "../../utils/baseURL.js";
import config from "../../utils/axiosconfig.js";

// Register function
const register = async (userData) => {
    try {
        const response = await axios.post(`${base_url}user/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Login function
const login = async (loginData) => {
    try {
        const response = await axios.post(`${base_url}user/login`, loginData);
        if (response.data.token) {
            localStorage.setItem('userToken', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Get Wishlist function
const getWishlist = async () => {
    try {
        const response = await axios.get(`${base_url}user/wishlist`, config);
        return response.data.wishlist;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Update user profile or address
const updateUser = async (userData) => {
    try {
        const response = await axios.put(`${base_url}user/edit-user`, userData, config);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Add address function
const addAddress = async (addressData) => {
    try {
        const response = await axios.put(`${base_url}user/save-address`, addressData, config);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Fetch all categories
const getCategories = async () => {
    const response = await axios.get(`${base_url}category`);
    return response.data;
};

// Fetch all colors
const getColor = async () => {
    const response = await axios.get(`${base_url}color`);
    return response.data;
};

// Get Orders function
const getOrders = async () => {
    try {
        const response = await axios.get(`${base_url}user/get-orders`, config);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Logout function
const logout = async () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    localStorage.removeItem('checkoutCart');
    localStorage.removeItem('checkoutTotal');
};

export const authService = {
    register,
    login,
    logout,
    getWishlist,
    getCategories,
    updateUser,
    addAddress,
    getColor,
    getOrders
};
