import * as React from "react";
import { Table } from "react-bootstrap";
import { currency } from "../constants/constants";
import { IOrderContent } from "../interface/IModel";
import { GetAmountDue } from "../pages/home/services/services";

interface IProps {
  items: IOrderContent[];
}
export default function InvoiceReceiptItemTable({ items }: IProps) {
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th colSpan={2}>Item</th>
          <th>Quantity</th>
          <th>Unit Cost</th>
          <th>Cost</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr>
            <td colSpan={2}>{item.title}</td>
            <td>{item.quantity}</td>
            <td>{currency + item.unit_cost}</td>
            <td>{currency + item.quantity * item.unit_cost}</td>
          </tr>
        ))}
        <tr>
          <td style={{ fontWeight: "bolder" }} colSpan={4}>
            Total
          </td>
          <td style={{ fontWeight: "bolder" }}>
            {currency + GetAmountDue(items)}
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
