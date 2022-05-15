import { createAsyncThunk } from "@reduxjs/toolkit";
import { IOrder } from "../../interface/IModel";

export default createAsyncThunk(
  "api/local/orders/add",
  async (data: IOrder[]) => {
    try {
      return data;
    } catch (error) {
      throw error;
    }
  }
);
