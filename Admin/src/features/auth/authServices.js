import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const login = async (user) => {
  const response = await axios.post(`${base_url}user/admin-login`, user, {
    withCredentials: true,
  });
  if (response.data) {
    localStorage.setItem("adminUser", JSON.stringify(response.data));
    localStorage.setItem("adminToken", response.data.token);
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
    await axios.get(`${base_url}user/logout`, { withCredentials: true });
  } catch (error) {
    console.error("Logout request failed:", error);
  } finally {
    localStorage.removeItem("adminUser");
    localStorage.removeItem("adminToken");
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
