import { ClassNames } from "@emotion/react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import moment = require("moment");

export const OrdersGridColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "Id",
    width: 50,
    headerClassName: "title",
    cellClassName: "grid_cell",
  },
  {
    field: "name",
    headerName: "Customer Name",
    width: 350,
    headerClassName: "title",
    cellClassName: "grid_cell",
  },
  {
    field: "date",
    headerName: "Date",
    width: 200,
    headerClassName: "title",
    cellClassName: "grid_cell",
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 100,
    headerClassName: "title",
    cellClassName: "grid_cell",
  },
];

export const OrdersRow: {
  id: number;
  name: string;
  date: string;
  amount: number;
}[] = [
  {
    id: 1,
    name: "Biliksuun Samuel",
    date: moment().format("DD/MM/YYYY"),
    amount: 1500,
  },
];
