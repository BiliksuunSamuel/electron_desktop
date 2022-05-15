import { createAsyncThunk } from "@reduxjs/toolkit";
import controller from "../../controller";
import { IOrder } from "../../interface/IModel";
import Routes from "../../routes/Routes";

export default createAsyncThunk("api/orders/get", async () => {
  try {
    return <IOrder[]>await controller({ url: Routes.orders_get });
  } catch (error) {
    throw error;
  }
});
