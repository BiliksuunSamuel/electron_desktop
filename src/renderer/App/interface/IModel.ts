export interface IUser {
  _id: string;
  username: string;
  phone: string;
  auth_id: string;
  role: number;
  status: number;
}

export interface IOrder {
  _id: string;
  user: string;
  date_added: string;
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  order: {
    title: string;
    cost: number;
    quantity: number;
  };
  content: IOrderContent[];
  payment: IPaymentInfo[];
  status: {
    completed: boolean;
    canceled: boolean;
  };
  type: {
    single: boolean;
    multiple: boolean;
  };
}
export interface IOrderContent {
  title: string;
  quantity: number;
  id: string;
}
export interface IPaymentInfo {
  amount: number;
  date: string;
  id: string;
}

export interface INewOrder {
  user: string;
  date_added: string;
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  order: {
    title: string;
    cost: number;
    quantity: number;
  };
  content: IOrderContent[];
  payment: IPaymentInfo[];
  status: {
    completed: boolean;
    canceled: boolean;
  };
  type: {
    single: boolean;
    multiple: boolean;
  };
}
