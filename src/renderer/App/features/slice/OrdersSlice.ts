import { createSlice } from "@reduxjs/toolkit";
import { OrderReducerState } from "../../data/ReducerState";
import { BackupOrdersThunk } from "../../functions";
import {
  AddOrderThunk,
  GetOrdersThunk,
  NewOrderThunk,
  OrderUpdateThunk,
} from "../../functions/order";

const OrdersReducer = createSlice({
  name: "OrdersReducer",
  initialState: OrderReducerState,
  reducers: {
    AddOrder: (state, action) => {
      state.orders = [...state.orders, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddOrderThunk.fulfilled, (state, action) => {
        state.orders = action.payload.data;
      })
      .addCase(GetOrdersThunk.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(NewOrderThunk.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(BackupOrdersThunk.fulfilled, (state, action) => {
        state.orders = action.payload.data;
      })
      .addCase(OrderUpdateThunk.fulfilled, (state, action) => {
        state.orders = action.payload.data;
      });
  },
});
export default OrdersReducer.reducer;
export const { AddOrder } = OrdersReducer.actions;
