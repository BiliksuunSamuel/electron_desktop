import { IBarBarchart } from "../interface/IHome";
import { IOrder } from "../../../interface/IModel";
import moment = require("moment");
import { GetPaymentAmount, GetAmountDue } from "./services";
export function PrepareBarchartData(
  orders: IOrder[],
  year: string
): IBarBarchart[] {
  const data = InitializeBarchartData(year);
  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];
    data.map((d) => {
      if (d.month === moment(order.date_added).format("MMMM/YYYY").toString()) {
        d.paid = d.paid + GetPaymentAmount(order.payment);
        d.arrears =
          d.arrears +
          GetAmountDue(order.order.content) -
          GetPaymentAmount(order.payment);
        d.total = d.total + GetAmountDue(order.order.content);
        return d;
      } else {
        return d;
      }
    });
  }
  return data;
}

export function InitializeBarchartData(year: string): IBarBarchart[] {
  const data: IBarBarchart[] = [
    { month: `January/${year}`, arrears: 0, paid: 0, total: 0 },
    { month: `February/${year}`, arrears: 0, paid: 0, total: 0 },
    { month: `March/${year}`, arrears: 0, paid: 0, total: 0 },
    { month: `April/${year}`, arrears: 0, paid: 0, total: 0 },
    { month: `May/${year}`, arrears: 0, paid: 0, total: 0 },
    { month: `June/${year}`, arrears: 0, paid: 0, total: 0 },
    { month: `July/${year}, `, arrears: 0, paid: 0, total: 0 },
    { month: `August/${year}`, arrears: 0, paid: 0, total: 0 },
    { month: `September/${year}`, arrears: 0, paid: 0, total: 0 },
    { month: `October/${year}`, arrears: 0, paid: 0, total: 0 },
    { month: `November/${year}`, arrears: 0, paid: 0, total: 0 },
    { month: `December/${year}`, arrears: 0, paid: 0, total: 0 },
  ];

  return data;
}
