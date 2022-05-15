import { combineReducers } from "@reduxjs/toolkit";
import {
  ResponseReducer,
  UserReducer,
  OrdersReducer,
  AccountsReducer,
  SettingsReducer,
} from "../features";
export default combineReducers({
  ResponseReducer,
  UserReducer,
  OrdersReducer,
  AccountsReducer,
  SettingsReducer,
});
