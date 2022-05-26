import * as React from "react";
import { Table } from "react-bootstrap";
import { IOrderContent } from "../interface/IModel";

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
            <td>{item.unit_cost}</td>
            <td>{item.quantity * item.unit_cost}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
