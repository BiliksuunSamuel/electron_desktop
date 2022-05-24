import { createSlice } from "@reduxjs/toolkit";
import { ResponseReducerState } from "../../data/ReducerState";
import { BackupOrdersThunk, LoginThunk, RegisterThunk } from "../../functions";
import {
  ChangePasswordThunk,
  GetAccountsThunk,
  UpdateInfoThunk,
} from "../../functions/accounts";
import {
  AddOrderThunk,
  GetOrdersThunk,
  OrderUpdateThunk,
} from "../../functions/order";
import {
  AddProductThunk,
  GetProductsThunk,
  DeleteProductThunk,
  UpdateProductThunk,
} from "../../functions/products";

const ResponseReducer = createSlice({
  name: "ResponseReducer",
  initialState: ResponseReducerState,
  reducers: {
    ResponseFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    ResponseSuccess: (state, action) => {
      state.loading = false;
      (state.error = null), (state.message = action.payload);
    },
    ClearResponse: (state) => {
      state.error = null;
      state.loading = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginThunk.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.message = null;
      })
      .addCase(LoginThunk.fulfilled, (state) => {
        state.error = null;
        state.loading = false;
        state.message = null;
      })
      .addCase(LoginThunk.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
        state.message = null;
      })
      .addCase(RegisterThunk.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.message = null;
      })
      .addCase(RegisterThunk.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(RegisterThunk.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
        state.message = null;
      })
      .addCase(AddOrderThunk.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.message = null;
      })
      .addCase(AddOrderThunk.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(AddOrderThunk.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
        state.message = null;
      })
      .addCase(GetAccountsThunk.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.message = null;
      })
      .addCase(GetAccountsThunk.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.message = null;
      })
      .addCase(GetAccountsThunk.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
        state.message = null;
      })
      .addCase(GetOrdersThunk.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.message = null;
      })
      .addCase(GetOrdersThunk.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.message = null;
      })
      .addCase(GetOrdersThunk.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
        state.message = null;
      })
      .addCase(BackupOrdersThunk.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.message = null;
      })
      .addCase(BackupOrdersThunk.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(BackupOrdersThunk.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
        state.message = null;
      })
      .addCase(OrderUpdateThunk.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.message = null;
      })
      .addCase(OrderUpdateThunk.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(OrderUpdateThunk.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
        state.message = null;
      })
      .addCase(UpdateInfoThunk.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.message = null;
      })
      .addCase(UpdateInfoThunk.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(UpdateInfoThunk.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
        state.message = null;
      })
      .addCase(ChangePasswordThunk.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.message = null;
      })
      .addCase(ChangePasswordThunk.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(ChangePasswordThunk.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
        state.message = null;
      })
      .addCase(AddProductThunk.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.message = null;
      })
      .addCase(AddProductThunk.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(AddProductThunk.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
        state.message = null;
      })
      .addCase(UpdateProductThunk.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.message = null;
      })
      .addCase(UpdateProductThunk.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(UpdateProductThunk.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
        state.message = null;
      })
      .addCase(DeleteProductThunk.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.message = null;
      })
      .addCase(DeleteProductThunk.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(DeleteProductThunk.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
        state.message = null;
      })
      .addCase(GetProductsThunk.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.message = null;
      })
      .addCase(GetProductsThunk.fulfilled, (state) => {
        state.error = null;
        state.loading = false;
        state.message = null;
      })
      .addCase(GetProductsThunk.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
        state.message = null;
      });
  },
});
export default ResponseReducer.reducer;

export const { ClearResponse, ResponseFail, ResponseSuccess } =
  ResponseReducer.actions;
