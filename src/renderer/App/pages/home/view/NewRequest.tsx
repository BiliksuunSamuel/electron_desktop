import {
  Box,
  Button,
  Checkbox,
  Container,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import moment = require("moment");
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { NewOrderInfo } from "../../../data/ModelData";
import { ResponseFail } from "../../../features/slice/ResponseSlice";
import { INewOrder, IOrder, IPaymentInfo } from "../../../interface/IModel";
import { resources } from "../../../resources/resources";
import { ValidateOrderInfo } from "../../../services/Validation";
import { OrderContent } from "../components";
import { request_styles } from "../style";
import { v4 as uuid } from "uuid";
import { AddOrderThunk, NewOrderThunk } from "../../../functions/order";
import Draggable from "react-draggable";
import { AddOrder } from "../../../features/slice/OrdersSlice";

export default function NewRequest() {
  const classes = request_styles();
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.OrdersReducer);
  const { online } = useAppSelector((state) => state.SettingsReducer);
  const { user } = useAppSelector((state) => state.UserReducer);
  const { error, message } = useAppSelector((state) => state.ResponseReducer);
  const [order, setOrder] = React.useState<INewOrder>({
    ...NewOrderInfo,
    user: user ? user._id : "",
  });
  const [payment, setPayment] = React.useState(0);

  function handleAdd() {
    try {
      ValidateOrderInfo(order);
      const Info: IOrder = { ...order, _id: "" };
      if (payment !== 0) {
        const paymentInfo: IPaymentInfo = {
          date: moment().format(),
          amount: payment,
          id: uuid(),
        };
        Info.payment.push(paymentInfo);
        Info.date_added = moment().format();
      }
      if (online) {
        dispatch(AddOrderThunk(Info));
      } else {
        dispatch(NewOrderThunk([...orders, Info]));
      }
      setOrder({ ...NewOrderInfo, user: user ? user._id : "" });
      setPayment(0);
    } catch (error) {
      dispatch(ResponseFail(error));
    }
  }
  return (
    <Box className={classes.root}>
      <OrderContent
        setContent={(data) => setOrder({ ...order, content: data })}
        open={order.type.multiple}
        content={order.content}
        handleOpen={() =>
          setOrder({ ...order, type: { single: true, multiple: false } })
        }
      />
      <Draggable>
        <Paper elevation={2} className={classes.paper_container}>
          <Box className={classes.header}>
            <Box className={classes.logo_container}>
              <img src={resources.logo} className="img" alt="logo2" />
            </Box>
            <Typography
              className={`title`}
              style={{ fontSize: 24, color: "#fff" }}
              variant="caption"
            >
              Add New Request
            </Typography>
          </Box>
          <Box className={classes.container}>
            <Box className={classes.left_container}>
              <Typography
                variant="caption"
                className={`title ${classes.title_label}`}
              >
                Customer Details
              </Typography>
              <TextField
                variant="outlined"
                size="small"
                label="Name"
                placeholder="Customer Name"
                className={classes.input}
                value={order.customer.name}
                onChange={(e) =>
                  setOrder({
                    ...order,
                    customer: { ...order.customer, name: e.target.value },
                  })
                }
              />
              <TextField
                variant="outlined"
                size="small"
                label="PhoneNumber"
                placeholder="Phone Number"
                className={classes.input}
                value={order.customer.phone}
                onChange={(e) =>
                  setOrder({
                    ...order,
                    customer: { ...order.customer, phone: e.target.value },
                  })
                }
              />
              <TextField
                variant="outlined"
                size="small"
                label="Email"
                placeholder="Email Address"
                className={classes.input}
                value={order.customer.email}
                type="email"
                onChange={(e) =>
                  setOrder({
                    ...order,
                    customer: { ...order.customer, email: e.target.value },
                  })
                }
              />
              <Typography
                variant="caption"
                className={`title ${classes.title_label}`}
              >
                Order Details
              </Typography>
              <TextField
                variant="outlined"
                size="small"
                label="Name/Title"
                placeholder="Order Name/Title"
                className={classes.input}
                value={order.order.title}
                onChange={(e) =>
                  setOrder({
                    ...order,
                    order: { ...order.order, title: e.target.value },
                  })
                }
              />
              <Box
                style={{
                  width: "90%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <TextField
                  variant="outlined"
                  size="small"
                  label="Quantity"
                  placeholder="Quantity"
                  className={classes.input}
                  style={{ flex: 1, marginRight: 5 }}
                  value={order.order.quantity}
                  type="number"
                  onChange={(e) => {
                    if (isNaN(parseInt(e.target.value))) {
                      setOrder({
                        ...order,
                        order: {
                          ...order.order,
                          quantity: 0,
                        },
                      });
                    } else {
                      setOrder({
                        ...order,
                        order: {
                          ...order.order,
                          quantity: parseInt(e.target.value),
                        },
                      });
                    }
                  }}
                />
                <TextField
                  variant="outlined"
                  size="small"
                  label="Cost"
                  placeholder="Cost"
                  className={classes.input}
                  style={{ flex: 1 }}
                  value={order.order.cost}
                  type="number"
                  onChange={(e) => {
                    if (isNaN(parseFloat(e.target.value))) {
                      setOrder({
                        ...order,
                        order: {
                          ...order.order,
                          cost: 0,
                        },
                      });
                    } else {
                      setOrder({
                        ...order,
                        order: {
                          ...order.order,
                          cost: parseFloat(e.target.value),
                        },
                      });
                    }
                  }}
                />
              </Box>
            </Box>
            <Box className={classes.right_container}>
              <Typography
                variant="caption"
                className={`title ${classes.title_label}`}
              >
                Order Content
              </Typography>
              <Box
                style={{
                  width: "90%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <RadioGroup className={classes.radiogroup}>
                  <Typography variant="caption" className={`title`}>
                    Single
                  </Typography>
                  <Checkbox
                    onChange={(value) =>
                      setOrder({
                        ...order,
                        type: {
                          ...order.type,
                          single: !Boolean(value.target.value),
                          multiple: Boolean(value.target.value),
                        },
                      })
                    }
                    checked={order.type.single}
                  />
                  <Typography variant="caption" className={`title`}>
                    Multiple
                  </Typography>
                  <Checkbox
                    onChange={(value) => {
                      setOrder({
                        ...order,
                        type: {
                          ...order.type,
                          multiple: !Boolean(value.target.value),
                          single: Boolean(value.target.value),
                        },
                      });
                    }}
                    checked={order.type.multiple}
                  />
                </RadioGroup>
              </Box>
              <Button
                disabled={order.type.single}
                className={classes.button}
                variant="contained"
                size="small"
                color="default"
              >
                Add Order Content
              </Button>
              <Typography
                variant="caption"
                className={`title ${classes.title_label}`}
              >
                Payment Info
              </Typography>

              <TextField
                variant="outlined"
                size="small"
                label="Amount"
                placeholder="Amount"
                className={classes.input}
                value={payment}
                type="number"
                onChange={(e) => {
                  if (isNaN(parseFloat(e.target.value))) {
                    setPayment(0);
                  } else {
                    setPayment(parseFloat(e.target.value));
                  }
                }}
              />
              <Typography
                variant="caption"
                className={`title ${classes.title_label}`}
              >
                Payment Status
              </Typography>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "90%",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <Typography variant="caption" className="title">
                  Completed
                </Typography>
                <Checkbox
                  onChange={() =>
                    setOrder({
                      ...order,
                      status: {
                        ...order.status,
                        completed: !order.status.completed,
                      },
                    })
                  }
                  checked={order.status.completed}
                />
                <Typography variant="caption" className="title">
                  Partial
                </Typography>
                <Checkbox
                  onChange={() =>
                    setOrder({
                      ...order,
                      status: {
                        ...order.status,
                        completed: !order.status.completed,
                      },
                    })
                  }
                  checked={order.status.completed}
                />
              </Box>
              <Button
                className={classes.button}
                variant="contained"
                size="small"
                color="primary"
                onClick={handleAdd}
              >
                Save Details
              </Button>
            </Box>
          </Box>
        </Paper>
      </Draggable>
    </Box>
  );
}
