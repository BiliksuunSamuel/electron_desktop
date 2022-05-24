import moment = require("moment");
import { InferProps } from "prop-types";
import {
  IOrder,
  IOrderContent,
  IPaymentInfo,
  IProduct,
  IUser,
} from "../../../interface/IModel";
import { phone_regex } from "../../../services/Validation";
import { IGridRow } from "../interface/IDataGrid";

export function PrepareOrdersGridData(orders: IOrder[]) {
  const data: IGridRow[] = [];
  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];
    data.push({
      id: i + 1,
      name: order.customer.name,
      date: moment(order.date_added).format("DD/MM/YYYY"),
      amount: GetPaymentAmount(order.payment),
    });
  }
  return data;
}

export function GetPaymentAmount(payments: IPaymentInfo[]): number {
  let amount = 0;
  for (let i = 0; i < payments.length; i++) {
    const payment = payments[i];
    amount += payment.amount;
  }
  return amount;
}

export function GetAmountDue(payments: IOrderContent[]): number {
  let amount = 0;
  for (let i = 0; i < payments.length; i++) {
    const payment = payments[i];
    amount += payment.unit_cost * payment.quantity;
  }
  return amount;
}

export function ValidateOrderContent(info: IOrderContent) {
  if (info.title.length <= 0) {
    throw "Title Required";
  }
  if (info.quantity <= 0) {
    throw "Please Enter Quantity";
  }
  if (info.unit_cost <= 0) {
    throw "Please Enter Unit Cost";
  }
}

export function CheckPaymentStatus(
  payment: IPaymentInfo[],
  content: IOrderContent[]
) {
  let amount_due = 0;
  let amount_paid = 0;
  for (let i = 0; i < content.length; i++) {
    const item = content[i];
    amount_due += item.quantity * item.unit_cost;
  }

  for (let i = 0; i < payment.length; i++) {
    const item = payment[i];
    amount_paid = item.amount;
  }

  if (amount_due > amount_paid) {
    return 0;
  } else {
    return 1;
  }
}

interface IPwdProps {
  password: string;
  comfirm_password: string;
}
export function ValidatePassword({ password, comfirm_password }: IPwdProps) {
  if (password.length <= 0) {
    throw "Password Required";
  }
  if (password !== comfirm_password) {
    throw "password doesn't match";
  }
}

export function ValidateAccountInfo(info: IUser) {
  if (info.username.length <= 0) {
    throw "Username Required";
  }
  if (!phone_regex.test(info.phone)) {
    throw "Invalid Phone Number";
  }
}

export function ValidateProductInfo(info: IProduct) {
  if (info.name.length <= 0) {
    throw "Product Name Required";
  }
}
