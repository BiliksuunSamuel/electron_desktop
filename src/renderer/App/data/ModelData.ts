import moment = require("moment");
import { ICompanyInfo, INewOrder, IOrderContent } from "../interface/IModel";
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
