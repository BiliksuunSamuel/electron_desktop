import {
  Box,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import * as React from "react";
import Draggable from "react-draggable";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { GetOrdersThunk } from "../../../functions/order";
import { GetPaymentAmount } from "../services/services";
import { orders_styles, global_styles } from "../style";
import { FiEdit } from "react-icons/fi";
export default function OrdersPage() {
  const dispatch = useAppDispatch();
  const global = global_styles();
  const { online } = useAppSelector((state) => state.SettingsReducer);
  const { orders } = useAppSelector((state) => state.OrdersReducer);
  const classes = orders_styles();

  React.useEffect(() => {
    if (online) {
      dispatch(GetOrdersThunk());
    }
  }, []);

  return (
    <Box component={Container} className={classes.root}>
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
          <Box></Box>
        </Box>
        <Draggable>
          <Box component={Paper} className={classes.grid_container}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Customer Name</TableCell>
                    <TableCell align="center">Phone Number</TableCell>
                    <TableCell align="center">Amount Paid</TableCell>
                    <TableCell align="center">Others</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order._id} className={global.grid_cell}>
                      <TableCell className={global.grid_cell} align="center">
                        {order.customer.name}
                      </TableCell>
                      <TableCell className={global.grid_cell} align="center">
                        {order.customer.phone}
                      </TableCell>
                      <TableCell className={global.grid_cell} align="center">
                        {GetPaymentAmount(order.payment)}
                      </TableCell>
                      <TableCell className={global.grid_cell} align="center">
                        <IconButton size="medium">
                          <FiEdit />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {/* <DataGrid
              onRowClick={(row) => {
                console.log(row);
              }}
              rowHeight={35}
              rows={PrepareOrdersGridData(orders)}
              columns={OrdersGridColumns}
              rowsPerPageOptions={[5, 10, 15, 20, 25]}
              autoPageSize
              pageSize={5}
            /> */}
          </Box>
        </Draggable>
      </Container>
    </Box>
  );
}