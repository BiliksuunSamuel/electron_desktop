import { createSlice } from "@reduxjs/toolkit";
import { ProductReducerState } from "../../data/ReducerState";
import {
  AddProductThunk,
  GetProductsThunk,
  DeleteProductThunk,
  UpdateProductThunk,
} from "../../functions/products";
export default createSlice({
  name: "ProductsReducer",
  initialState: ProductReducerState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AddProductThunk.fulfilled, (state, action) => {
        state.products = action.payload.data;
      })
      .addCase(DeleteProductThunk.fulfilled, (state, action) => {
        state.products = action.payload.data;
      })
      .addCase(UpdateProductThunk.fulfilled, (state, action) => {
        state.products = action.payload.data;
      })
      .addCase(GetProductsThunk.fulfilled, (state, action) => {
        state.products = action.payload;
      });
  },
}).reducer;
