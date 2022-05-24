import { createAsyncThunk } from "@reduxjs/toolkit";
import controller from "../../controller";
import { IUser } from "../../interface/IModel";
import Routes from "../../routes/Routes";

export default createAsyncThunk("api/profile/update", async (data: IUser) => {
  try {
    return <{ message: string; data: IUser }>(
      await controller({ url: Routes.profile_update, data })
    );
  } catch (error) {
    throw error;
  }
});
