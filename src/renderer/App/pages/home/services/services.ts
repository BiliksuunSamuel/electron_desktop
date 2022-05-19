import moment = require("moment");
import { IOrder, IOrderContent, IPaymentInfo } from "../../../interface/IModel";
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
