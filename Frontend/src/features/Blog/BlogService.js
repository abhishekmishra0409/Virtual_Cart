import axios from "axios";
import { base_url } from "../../utils/baseURL.js";


// Fetch all Blog
const getAllBlogs = async () => {
    const response = await axios.get(`${base_url}blog`);
    return response.data;
};

// Fetch Blog details by ID
const getBlogById = async (blogId) => {
    const response = await axios.get(`${base_url}blog/${blogId}`);
    return response.data;
};


// Fetch all Blog
const getAllBlogCategory = async () => {
    const response = await axios.get(`${base_url}blogcategory`);
    return response.data;
};

// Fetch Blogs by Category
const getBlogsByCategory = async (categoryId) => {
    const response = await axios.get(`${base_url}blog?category=${categoryId}`);
    return response.data;
};

const blogService = {
    getAllBlogs,
    getBlogById,
    getAllBlogCategory,
    getBlogsByCategory
};

export default blogService;
