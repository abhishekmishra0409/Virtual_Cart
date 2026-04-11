import apiClient from '../../utils/axiosconfig.js';

// Fetch all products
const getAllProducts = async () => {
    const response = await apiClient.get("product");
    return response.data;
};

// Fetch product details by ID
const getProductById = async (productId) => {
    const response = await apiClient.get(`product/${productId}`);
    return response.data;
};

const getFeaturedProducts = async () => {
    const response = await apiClient.get("product/?tags=featured");
    return response.data;
};

const getTrendingProducts = async () => {
    const response = await apiClient.get("product/?tags=popular");
    return response.data;
};

const searchProducts = async (query) => {
    const response = await apiClient.get(`product/?title=${query}`);
    return response.data;
};

// Add to Wishlist function
const addToWishlist = async (prodId) => {
    const response = await apiClient.put("product/wishlist", { prodId });
    return response.data;
};

const getProductsByCategory = async (id) => {
    const response = await apiClient.get(`product?category=${id}`);
    return response.data;
};

const getProductsByColor = async (id) => {
    const response = await apiClient.get(`product?color=${id}`);
    return response.data;
};

const getProductsByPrice = async ({gte,lte}) => {
    const response = await apiClient.get(`product?price[gte]=${gte}&price[lte]=${lte}`);
    return response.data;
};

const addProductReview = async (reviewData) => {
    try {
        const response = await apiClient.put("product/rating", reviewData);
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
