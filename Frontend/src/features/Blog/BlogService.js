import apiClient from "../../utils/axiosconfig.js";


// Fetch all Blog
const getAllBlogs = async () => {
    const response = await apiClient.get("blog");
    return response.data;
};

// Fetch Blog details by ID
const getBlogById = async (blogId) => {
    const response = await apiClient.get(`blog/${blogId}`);
    return response.data;
};


// Fetch all Blog
const getAllBlogCategory = async () => {
    const response = await apiClient.get("blogcategory");
    return response.data;
};

// Fetch Blogs by Category
const getBlogsByCategory = async (categoryId) => {
    const response = await apiClient.get(`blog?category=${categoryId}`);
    return response.data;
};

const blogService = {
    getAllBlogs,
    getBlogById,
    getAllBlogCategory,
    getBlogsByCategory
};

export default blogService;
