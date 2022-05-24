import moment = require("moment");
import {
  ICompanyInfo,
  INewOrder,
  IOrderContent,
  IProduct,
  IUser,
} from "../interface/IModel";
import { GenerateOTP } from "../services/OTPGenerator";
export const NewOrderInfo: INewOrder = {
  user: "",
  date_added: moment().format(),
  notes: [],
  customer: {
    name: "",
    phone: "",
    email: "",
  },
  order: {
    content: [],
  },
  payment: [],

  status: {
    completed: false,
    canceled: false,
  },
  delivery: {
    date: moment().format("DD/MM/YYYY"),
    address: "",
    delivered: false,
    note: "",
  },
  payment_status: 0,
};

export const CompanyInfo: ICompanyInfo = {
  name: "",
  tel: "",
  address: "",
  motto: "",
  email: "",
};

export const InitialOrderContentInfo: IOrderContent = {
  id: GenerateOTP(),
  unit_cost: 0,
  quantity: 0,
  title: "",
};

export const InitialUserInfo: IUser = {
  username: "",
  phone: "",
  role: 0,
  status: 0,
  _id: "",
  auth_id: "",
};

export const Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function Years() {
  const years: string[] = [];
  for (
    let i = parseInt(moment(Date.now()).format("YYYY"));
    i >= parseInt(moment(Date.now()).format("YYYY")) - 10;
    i--
  ) {
    years.push(i.toString());
  }
  return years;
}

export const InitialProductInfo: IProduct = {
  _id: "",
  name: "",
  unit_cost: 0,
};
