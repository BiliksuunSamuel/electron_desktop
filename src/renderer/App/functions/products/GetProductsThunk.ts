import { createAsyncThunk } from "@reduxjs/toolkit";
import controller from "../../controller";
import { IProduct } from "../../interface/IModel";
import Routes from "../../routes/Routes";

export default createAsyncThunk("api/product/get", async () => {
  try {
    return <IProduct[]>await controller({ url: Routes.product_get });
  } catch (error) {
    throw error;
  }
});
