import {
  IAccountsReducer,
  ICompanyInfoReducer,
  IOrderReducer,
  IResponseReducer,
  ISettingsReducer,
  IUserReducer,
} from "../interface/IReducer";
import { CompanyInfo } from "./ModelData";

export const ResponseReducerState: IResponseReducer = {
  loading: false,
  error: null,
  message: null,
};

export const UserReducerState: IUserReducer = {
  user: null,
};

export const OrderReducerState: IOrderReducer = {
  orders: [],
};

export const AccountsReducer: IAccountsReducer = {
  accounts: [],
};

export const SettingsReducerState: ISettingsReducer = {
  online: false,
  order: null,
};

export const CompanyInfoReducer: ICompanyInfoReducer = {
  company: CompanyInfo,
};
