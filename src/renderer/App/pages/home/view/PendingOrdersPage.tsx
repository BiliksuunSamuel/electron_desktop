import { Box, Container, Paper, Typography } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import * as React from "react";
import Draggable from "react-draggable";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { GetOrdersThunk } from "../../../functions/order";
import { OrdersGridColumns, OrdersRow } from "../data/Datagrid";
import { PrepareOrdersGridData } from "../services/services";
import { orders_styles } from "../style";

export default function PendingOrdersPage() {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.OrdersReducer);
  const classes = orders_styles();
  const { online } = useAppSelector((state) => state.SettingsReducer);
  React.useEffect(() => {
    online && dispatch(GetOrdersThunk());
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
              Pending Request
            </Typography>
          </Box>
          <Box></Box>
        </Box>
        <Draggable>
          <Box component={Paper} className={classes.grid_container}>
            <DataGrid
              rowHeight={35}
              rows={PrepareOrdersGridData(
                orders.filter((order) => order.status.completed === false)
              )}
              columns={OrdersGridColumns}
              rowsPerPageOptions={[5, 10, 15, 20, 25]}
              autoPageSize
              pageSize={5}
            />
          </Box>
        </Draggable>
      </Container>
    </Box>
  );
}
