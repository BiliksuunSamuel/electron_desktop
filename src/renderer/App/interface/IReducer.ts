import { ICompanyInfo, IOrder, IProduct, IUser } from "./IModel";

export interface IResponseReducer {
  loading: boolean;
  error: any;
  message: any;
}

export interface IUserReducer {
  user: IUser | null;
}

export interface IOrderReducer {
  orders: IOrder[];
}
export interface IAccountsReducer {
  accounts: IUser[];
}

export interface ISettingsReducer {
  online: boolean;
  order: IOrder | null;
}

export interface ICompanyInfoReducer {
  company: ICompanyInfo;
}
export interface IProductsReducer {
  products: IProduct[];
}
