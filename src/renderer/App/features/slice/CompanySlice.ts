import { createSlice } from "@reduxjs/toolkit";
import { CompanyInfoReducer } from "../../data/ReducerState";
import { SetCompanyInfoThunk } from "../../functions";
export default createSlice({
  name: "CompanyReducer",
  initialState: CompanyInfoReducer,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(SetCompanyInfoThunk.fulfilled, (state, action) => {
      state.company = action.payload;
    });
  },
}).reducer;
