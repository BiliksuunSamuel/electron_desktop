import { createAsyncThunk } from "@reduxjs/toolkit";
import controller from "../../controller";
import { IUser } from "../../interface/IModel";
import Routes from "../../routes/Routes";

export default createAsyncThunk("api/register", async (data: any) => {
  try {
    return <{ data: IUser; message: string }>(
      await controller({ data, url: Routes.register })
    );
  } catch (error) {
    throw error;
  }
});
