import { createAsyncThunk } from "@reduxjs/toolkit";
import controller from "../../controller";
import { IUser } from "../../interface/IModel";
import Routes from "../../routes/Routes";

export default createAsyncThunk("api/accounts/get", async () => {
  try {
    return <IUser[]>await controller({ url: Routes.accounts_get });
  } catch (error) {
    throw error;
  }
});
