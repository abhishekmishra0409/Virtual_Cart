import axios from "axios";
import { base_url } from "../../utils/baseURL.js";
import config  from '../../utils/axiosconfig.js';

// Fetch all products
const getAllProducts = async () => {
    const response = await axios.get(`${base_url}product`);
    return response.data;
};

// Fetch product details by ID
const getProductById = async (productId) => {
    const response = await axios.get(`${base_url}product/${productId}`);
    return response.data;
};

const getFeaturedProducts = async () => {
    const response = await axios.get(`${base_url}product/?tags=featured`);
    return response.data;
};

const getTrendingProducts = async () => {
    const response = await axios.get(`${base_url}product/?tags=popular`);
    return response.data;
};

const searchProducts = async (query) => {
    const response = await axios.get(`${base_url}product/?title=${query}`);
    return response.data;
};

// Add to Wishlist function
const addToWishlist = async (prodId) => {
    const response = await axios.put(`${base_url}product/wishlist`, { prodId }, config);
    return response.data;
};

const getProductsByCategory = async (id) => {
    const response = await axios.get(`${base_url}product?category=${id}`);
    return response.data;
};

const getProductsByColor = async (id) => {
    const response = await axios.get(`${base_url}product?color=${id}`);
    return response.data;
};

const getProductsByPrice = async ({gte,lte}) => {
    const response = await axios.get(`${base_url}product?price[gte]=${gte}&price[lte]=${lte}`);
    return response.data;
};

const addProductReview = async (reviewData) => {
    try {
        const response = await axios.put(`${base_url}product/rating`, reviewData, config);
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
};
const productService = {
    getAllProducts,
    getProductById,
    getFeaturedProducts,
    getTrendingProducts,
    addToWishlist,
    getProductsByCategory,
    getProductsByColor,
    getProductsByPrice,
    addProductReview,
    searchProducts
};

export default productService;
