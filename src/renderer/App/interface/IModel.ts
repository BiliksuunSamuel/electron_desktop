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
  notes: INote[];
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  order: {
    content: IOrderContent[];
  };
  payment: IPaymentInfo[];
  status: {
    completed: boolean;
    canceled: boolean;
  };
  delivery: {
    date: string;
    address: string;
    delivered: boolean;
    note: string;
  };
  payment_status: number;
}
export interface INote {
  id: string;
  text: string;
}
export interface IOrderContent {
  title: string;
  quantity: number;
  id: string;
  unit_cost: number;
}
export interface IPaymentInfo {
  amount: number;
  date: string;
  id: string;
}

export interface INewOrder {
  user: string;
  date_added: string;
  notes: INote[];
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  order: {
    content: IOrderContent[];
  };
  payment: IPaymentInfo[];
  status: {
    completed: boolean;
    canceled: boolean;
  };
  delivery: {
    date: string;
    address: string;
    delivered: boolean;
    note: string;
  };
  payment_status: number;
}

export interface ICompanyInfo {
  name: string;
  address: string;
  tel: string;
  email: string;
  motto: string;
}

export interface IProduct {
  name: string;
  _id: string;
  unit_cost: number;
}
