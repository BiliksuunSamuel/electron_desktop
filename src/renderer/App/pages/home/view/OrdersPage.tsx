import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import { Edit, Print } from "@material-ui/icons";
import * as React from "react";
import Draggable from "react-draggable";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { GetOrdersThunk } from "../../../functions/order";
import { GetAmountDue, GetPaymentAmount } from "../services/services";
import { orders_styles, global_styles } from "../style";
import { FiEdit } from "react-icons/fi";
import { FaFileInvoice } from "react-icons/fa";
import { SetOrder } from "../../../features/slice/SettingsSlice";
import { IOrder } from "../../../interface/IModel";
import { ManageRequest, ReceiptGenerator } from "../../../components";
import SearchOrder from "../services/searchOrder";
export default function OrdersPage() {
  const dispatch = useAppDispatch();
  const global = global_styles();
  const { online } = useAppSelector((state) => state.SettingsReducer);
  const { orders } = useAppSelector((state) => state.OrdersReducer);
  const [Orders, setOrders] = React.useState<IOrder[]>(orders);
  const [order, setOrder] = React.useState<IOrder | null>(null);
  const [receipt, setReceipt] = React.useState<IOrder | null>(null);
  const classes = orders_styles();
  const [srch, setSrch] = React.useState("");

  React.useEffect(() => {
    if (online) {
      dispatch(GetOrdersThunk());
    }
    setOrders(orders);
  }, []);

  React.useEffect(() => {
    if (srch && srch.length > 0) {
      setOrders(SearchOrder(orders, srch));
    } else {
      setOrders(orders);
    }
  }, [srch]);

  return (
    <Box component={Container} className={classes.root}>
      {Boolean(order) && (
        <ManageRequest handleModal={() => setOrder(null)} Info={order} />
      )}
      {receipt && (
        <ReceiptGenerator
          order={receipt}
          handleClose={() => setReceipt(null)}
        />
      )}
      <Container className={classes.container}>
        <Box component={Paper} className={classes.header}>
          <Box className={classes.header_left}>
            <Typography
              style={{ fontSize: 20 }}
              variant="caption"
              className="title"
            >
              All Services
            </Typography>
          </Box>
          <Box className={classes.header_right}>
            <Button
              size="small"
              variant="text"
              onClick={() => dispatch(GetOrdersThunk())}
              style={{ marginRight: 20, textTransform: "none" }}
            >
              Refresh
            </Button>
            <TextField
              variant="filled"
              size="small"
              placeholder="search...."
              value={srch}
              onChange={(e) => setSrch(e.target.value)}
            />
          </Box>
        </Box>
        <Draggable>
          <Box style={{ borderRadius: 0 }} className={classes.grid_container}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Customer Name</TableCell>
                    <TableCell align="center">Total Cost</TableCell>
                    <TableCell align="center">Amount Paid</TableCell>
                    <TableCell align="center">Arears</TableCell>
                    <TableCell align="center">Others</TableCell>
                    <TableCell align="center">Receipt</TableCell>
                    <TableCell align="center">Invoice</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Orders.map((order) => (
                    <TableRow key={order._id} className={global.grid_cell}>
                      <TableCell className={global.grid_cell} align="left">
                        {order.customer.name}
                      </TableCell>
                      <TableCell className={global.grid_cell} align="center">
                        {GetAmountDue(order.order.content)}
                      </TableCell>

                      <TableCell className={global.grid_cell} align="center">
                        {GetPaymentAmount(order.payment)}
                      </TableCell>
                      <TableCell
                        style={{ color: "firebrick" }}
                        className={global.grid_cell}
                        align="center"
                      >
                        {GetAmountDue(order.order.content) -
                          GetPaymentAmount(order.payment)}
                      </TableCell>
                      <TableCell className={global.grid_cell} align="center">
                        <IconButton
                          onClick={() => setOrder(order)}
                          size="medium"
                        >
                          <FiEdit />
                        </IconButton>
                      </TableCell>
                      <TableCell className={global.grid_cell} align="center">
                        <IconButton
                          onClick={() => setReceipt(order)}
                          size="small"
                        >
                          <Print />
                        </IconButton>
                      </TableCell>
                      <TableCell className={global.grid_cell} align="center">
                        <IconButton
                          onClick={() => dispatch(SetOrder(order))}
                          size="medium"
                        >
                          <FaFileInvoice />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Draggable>
      </Container>
    </Box>
  );
}
