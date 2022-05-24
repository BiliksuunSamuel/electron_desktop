import fusejs from "fuse.js";
import { IOrder } from "../../../interface/IModel";

export default function SearchOrder(orders: IOrder[], srch: string) {
  const Fuse = new fusejs(orders, {
    keys: [
      { name: "name", getFn: (order) => order.customer.name },
      { name: "phone", getFn: (order) => order.customer.phone },
      { name: "email", getFn: (order) => order.customer.email },
    ],
  });

  const results: { item: IOrder; refIndex: number }[] = Fuse.search(srch);
  const filteredOrders: IOrder[] = [];
  for (let i = 0; i < results.length; i++) {
    filteredOrders.push(results[i].item);
  }
  return filteredOrders;
}
