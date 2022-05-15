import { createAsyncThunk } from "@reduxjs/toolkit";
import controller from "../../controller";
import { INewOrder, IOrder } from "../../interface/IModel";
import Routes from "../../routes/Routes";

export default createAsyncThunk("api/order/new", async (data: INewOrder) => {
  try {
    return <{ message: string; data: IOrder[] }>(
      await controller({ url: Routes.order_add, data })
    );
  } catch (error) {
    throw error;
  }
});
