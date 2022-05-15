import {
  IAccountsReducer,
  IOrderReducer,
  IResponseReducer,
  ISettingsReducer,
  IUserReducer,
} from "../interface/IReducer";

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
};
