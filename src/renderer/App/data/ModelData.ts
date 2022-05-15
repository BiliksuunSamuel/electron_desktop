import moment = require("moment");
import { INewOrder } from "../interface/IModel";

export const NewOrderInfo: INewOrder = {
  user: "",
  date_added: moment().format(),
  customer: {
    name: "",
    phone: "",
    email: "",
  },
  order: {
    title: "",
    quantity: 0,
    cost: 0,
  },
  payment: [],
  content: [],
  status: {
    completed: false,
    canceled: false,
  },
  type: {
    single: true,
    multiple: false,
  },
};
