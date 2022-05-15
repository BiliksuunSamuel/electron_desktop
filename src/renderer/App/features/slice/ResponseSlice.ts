import { createSlice } from "@reduxjs/toolkit";
import { ResponseReducerState } from "../../data/ReducerState";
import { BackupOrdersThunk, LoginThunk, RegisterThunk } from "../../functions";
import { GetAccountsThunk } from "../../functions/accounts";
import { AddOrderThunk, GetOrdersThunk } from "../../functions/order";

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
      });
  },
});
export default ResponseReducer.reducer;

export const { ClearResponse, ResponseFail, ResponseSuccess } =
  ResponseReducer.actions;
