import { createSlice } from "@reduxjs/toolkit";
import { AccountsReducer } from "../../data/ReducerState";
import { GetAccountsThunk } from "../../functions/accounts";

export default createSlice({
  name: "AccountsSlice",
  initialState: AccountsReducer,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetAccountsThunk.fulfilled, (state, action) => {
      state.accounts = action.payload;
    });
  },
}).reducer;
