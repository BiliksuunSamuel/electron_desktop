import { createAsyncThunk } from "@reduxjs/toolkit";
import { string } from "prop-types";
import controller from "../../controller";
import { IOrder } from "../../interface/IModel";
import Routes from "../../routes/Routes";

export default createAsyncThunk("api/orders/backup", async (data: IOrder[]) => {
  return <{ message: string; data: IOrder[] }>(
    await controller({ url: Routes.backup_orders, data })
  );
});
