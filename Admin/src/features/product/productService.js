import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);
  return response.data;
};

const createProduct = async (product) => {
  const response = await axios.post(`${base_url}product/`, product, config);
  return response.data;
};

const getProductById = async (productId) => {
  const response = await axios.get(`${base_url}product/${productId}`);
  return response.data
  // console.log(response.data);
};

const updateProduct = async (productId, updatedProduct) => {
  const response = await axios.put(`${base_url}product/${productId}`, updatedProduct, config);
  return response.data;
};

const deleteProduct = async (productId) => {
  const response = await axios.delete(`${base_url}product/${productId}`, config);
  return response.data;
};

const productService = {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};

export default productService;
