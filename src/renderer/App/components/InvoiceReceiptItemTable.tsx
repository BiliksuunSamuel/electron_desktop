import * as React from "react";
import { Table } from "react-bootstrap";
import { currency } from "../constants/constants";
import { IOrderContent } from "../interface/IModel";
import { GetAmountDue } from "../pages/home/services/services";
import "bootstrap/dist/css/bootstrap.min.css";

interface IProps {
  items: IOrderContent[];
}
export default function InvoiceReceiptItemTable({ items }: IProps) {
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th colSpan={2}>Item</th>
          <th align="center">Quantity</th>
          <th align="center">Unit Cost</th>
          <th align="right">Cost</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr>
            <td colSpan={2}>{item.title}</td>
            <td align="center">{item.quantity}</td>
            <td align="center">{currency + item.unit_cost}</td>
            <td align="right" style={{ textAlign: "right" }}>
              {currency + item.quantity * item.unit_cost}
            </td>
          </tr>
        ))}
        <tr>
          <td style={{ fontWeight: "bolder" }} colSpan={4}>
            Total
          </td>
          <td
            align="right"
            style={{ fontWeight: "bolder", textAlign: "right" }}
          >
            {currency + GetAmountDue(items)}
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
