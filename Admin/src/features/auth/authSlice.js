import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authServices";
import {toast} from "react-toastify";


const getUserfromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
const initialState = {
  user: getUserfromLocalStorage,
  orders: [],
  orderStatusUpdated: false,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOrders = createAsyncThunk(
  "order/get-orders",
  async (thunkAPI) => {
    try {
      return await authService.getOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getOrderByUser = createAsyncThunk(
  "order/get-order",
  async (id, thunkAPI) => {
    try {
      return await authService.getOrder(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
    'order/updateStatus',
    async ({ orderId, status }, thunkAPI) => {
      try {
        return await authService.updateOrderStatus(orderId, status);
      } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
);

export const logout = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
  try {
    await authService.logout();
    return null;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success";
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload;
        state.message = "success";
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(getOrderByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderByUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.orderbyuser = action.payload;
        state.message = "success";
      })
      .addCase(getOrderByUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
        .addCase(updateOrderStatus.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(updateOrderStatus.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.orderStatusUpdated = true;
          // Update the specific order's status in the state
          state.orders = state.orders.map((order) =>
              order._id === action.payload._id ? { ...order, ...action.payload } : order
          );
          toast.success("Status Updated Successfully!");
        })
        .addCase(updateOrderStatus.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        });
  },
});

export default authSlice.reducer;
