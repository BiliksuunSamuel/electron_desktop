import { createAsyncThunk } from "@reduxjs/toolkit";
import { IOrder } from "../../interface/IModel";
import Controller from "../../controller";
import Routes from "../../routes/Routes";

interface IProps {
  id: string;
  info: IOrder;
}
export default createAsyncThunk(
  "api/order/update",
  async ({ id, info }: IProps) => {
    try {
      return <{ message: string; data: IOrder[] }>await Controller({
        url: Routes.order_update,
        data: { id, info },
      });
    } catch (error) {
      throw error;
    }
  }
);
