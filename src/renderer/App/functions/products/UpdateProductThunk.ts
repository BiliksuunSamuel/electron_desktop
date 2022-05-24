import { createAsyncThunk } from "@reduxjs/toolkit";
import controller from "../../controller";
import { IProduct } from "../../interface/IModel";
import Routes from "../../routes/Routes";

export default createAsyncThunk(
  "api/product/update",
  async (data: IProduct) => {
    try {
      return <{ message: string; data: IProduct[] }>(
        await controller({ url: Routes.product_update, data })
      );
    } catch (error) {
      throw error;
    }
  }
);
