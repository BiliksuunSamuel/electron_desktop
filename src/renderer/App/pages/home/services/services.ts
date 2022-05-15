import moment = require("moment");
import { IOrder, IPaymentInfo } from "../../../interface/IModel";
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

export function GetPaymentAmount(payments: IPaymentInfo[]) {
  let amount = 0;
  for (let i = 0; i < payments.length; i++) {
    const payment = payments[i];
    amount += payment.amount;
  }
  return amount;
}
