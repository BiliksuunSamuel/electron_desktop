import { createSlice } from "@reduxjs/toolkit";
import { UserReducerState } from "../../data/ReducerState";
import { LoginThunk, RegisterThunk } from "../../functions";
import { UpdateInfoThunk } from "../../functions/accounts";

const UserReducer = createSlice({
  name: "UserReducer",
  initialState: UserReducerState,
  reducers: {
    Logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(RegisterThunk.fulfilled, (state, action) => {
        state.user = action.payload.data;
      })
      .addCase(LoginThunk.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(UpdateInfoThunk.fulfilled, (state, action) => {
        state.user = action.payload.data;
      });
  },
});

export default UserReducer.reducer;
export const { Logout } = UserReducer.actions;
