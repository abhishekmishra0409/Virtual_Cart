import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const login = async (user) => {
  const response = await axios.post(`${base_url}user/admin-login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    localStorage.setItem("token", JSON.stringify(response.data.token));

  }
  return response.data;
};
const getOrders = async () => {
  const response = await axios.get(`${base_url}user/getallorders`, config);

  return response.data;
};
const getOrder = async (id) => {
  const response = await axios.post(
    `${base_url}user/getorderbyuser/${id}`,
    "",
    config
  );

  return response.data;
};

const updateOrderStatus = async (orderId, status) => {
  const response = await axios.put(`${base_url}user/order/update-order/${orderId}`, { status } , config);
  return response.data;
};

const logout = async () => {
  try {
      localStorage.removeItem("user");

  } catch (error) {
    console.error("Logout failed:", error);
  }
};
const authService = {
  login,
  getOrders,
  getOrder,
  logout,
  updateOrderStatus
};

export default authService;
