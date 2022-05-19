import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICompanyInfo } from "../../interface/IModel";

export default createAsyncThunk("company/info", async (data: ICompanyInfo) => {
  try {
    return data;
  } catch (error) {
    throw error;
  }
});
