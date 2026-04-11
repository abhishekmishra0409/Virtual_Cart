import apiClient, { clearAuthStorage } from "../../utils/axiosconfig.js";

// Register function
const register = async (userData) => {
    try {
        const response = await apiClient.post("user/register", userData, {
            _skipAuthHeader: true,
            _skipAuthRefresh: true,
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Login function
const login = async (loginData) => {
    try {
        const response = await apiClient.post("user/login", loginData, {
            _skipAuthHeader: true,
            _skipAuthRefresh: true,
        });
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
        const response = await apiClient.get("user/wishlist");
        return response.data.wishlist;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Update user profile or address
const updateUser = async (userData) => {
    try {
        const response = await apiClient.put("user/edit-user", userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Add address function
const addAddress = async (addressData) => {
    try {
        const response = await apiClient.put("user/save-address", addressData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Fetch all categories
const getCategories = async () => {
    const response = await apiClient.get("category");
    return response.data;
};

// Fetch all colors
const getColor = async () => {
    const response = await apiClient.get("color");
    return response.data;
};

// Get Orders function
const getOrders = async () => {
    try {
        const response = await apiClient.get("user/get-orders");
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Logout function
const logout = async () => {
    try {
        await apiClient.get("user/logout", {
            _skipAuthHeader: true,
            _skipAuthRefresh: true,
        });
    } catch {
        // Local logout should still complete if the refresh cookie is already gone.
    } finally {
        clearAuthStorage();
    }
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
