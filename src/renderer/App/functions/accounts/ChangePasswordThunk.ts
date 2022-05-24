import { createAsyncThunk } from "@reduxjs/toolkit";
import controller from "../../controller";
import Routes from "../../routes/Routes";

interface IProps {
  password: string;
  id: string;
}
export default createAsyncThunk("api/password/change", async (data: IProps) => {
  try {
    return await controller({ url: Routes.password_change, data });
  } catch (error) {
    throw error;
  }
});
