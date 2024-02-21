import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const fetchOrders = createAsyncThunk("users/fetchOrders", async () => {
  const respone = await axios.get("http://localhost:3002/api/orders");
  return respone.data;
});
export const fetchOrdersByUser = createAsyncThunk(
  "users/fetchOrdersByUser",
  async (userId: string) => {
    const respone = await axios.get(
      `http://localhost:3002/api/orders/getBuyer/${userId}`
    );
    return respone.data;
  }
);
export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:3002/api/orders/${orderId}/status`,
        { status }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (orderId) => {
    const response = await axios.delete(
      `http://localhost:3002/api/orders/${orderId}`
    );
    return response.data;
  }
);


export const fetchBrainTreeToken = createAsyncThunk(
  "users/fetchBrainTreeToken",
  async () => {
    const respone = await axios.get(
      "http://localhost:3002/api/orders/braintree/token"
    );
    return respone.data;
  }
);
export const payWithBraintree = createAsyncThunk(
  "users/payWithBraintree",
  async (data: object) => {
    const respone = await axios.post(
      "http://localhost:3002/api/orders/braintree/payment",
      data
    );
    return respone.data;
  }
);
export type Order = {
  id: number;
  productId: number;
  userId: number;
  purchasedAt: string;
};
export type OrderState = {
  orders: Order[];
  error: null | string;
  isLoading: boolean;
};
const initialState: OrderState = {
  orders: [],
  error: null,
  isLoading: false,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload.payload;
        state.isLoading = false;
      })
      .addCase(fetchOrdersByUser.fulfilled, (state, action) => {
        state.orders = action.payload.payload;
        state.isLoading = false;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.orders = action.payload.payload;
        state.isLoading = false;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = action.payload.payload;
        state.isLoading = false;
      })
      .addCase(fetchBrainTreeToken.fulfilled, (state, action) => {
        state.orders = action.payload.payload;
        state.isLoading = false;
      })
      .addCase(payWithBraintree.fulfilled, (state, action) => {
        state.orders = action.payload.payload;
        state.isLoading = false;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.error = action.error.message || "An error occurred";
          state.isLoading = false;
        }
      );
  },
});

export default ordersSlice.reducer;
