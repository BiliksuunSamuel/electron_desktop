import { createAsyncThunk } from "@reduxjs/toolkit";
import controller from "../../controller";
import { IUser } from "../../interface/IModel";
import Routes from "../../routes/Routes";

export default createAsyncThunk("api/login", async (data: any) => {
  try {
    return <IUser>await controller({ url: Routes.login, data });
  } catch (error) {
    throw error;
  }
});
