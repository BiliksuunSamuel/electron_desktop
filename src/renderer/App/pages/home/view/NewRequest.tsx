import {
  Box,
  Button,
  Checkbox,
  Divider,
  IconButton,
  MenuItem,
  Paper,
  Slide,
  TextField,
  Typography,
} from "@material-ui/core";
import moment = require("moment");
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import {
  InitialOrderContentInfo,
  InitialProductInfo,
  NewOrderInfo,
} from "../../../data/ModelData";
import { ResponseFail } from "../../../features/slice/ResponseSlice";
import {
  INewOrder,
  IOrder,
  IOrderContent,
  IPaymentInfo,
  IProduct,
} from "../../../interface/IModel";
import { resources } from "../../../resources/resources";
import { ValidateOrderInfo } from "../../../services/Validation";
import { request_styles } from "../style";
import { v4 as uuid } from "uuid";
import { AddOrderThunk, NewOrderThunk } from "../../../functions/order";
import Draggable from "react-draggable";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField as MUITextFiel } from "@mui/material";
import { OrderContent } from "../components";
import { Input, InvoiceGenerator, StickyNote } from "../../../components";
import { GenerateOTP } from "../../../services/OTPGenerator";
import { RemoveRedEye } from "@mui/icons-material";
import {
  CheckPaymentStatus,
  GetAmountDue,
  GetPaymentAmount,
  ValidateOrderContent,
} from "../services/services";
import { currency } from "../../../constants/constants";
export default function NewRequest() {
  const classes = request_styles();
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const { orders } = useAppSelector((state) => state.OrdersReducer);
  const { online } = useAppSelector((state) => state.SettingsReducer);
  const { user } = useAppSelector((state) => state.UserReducer);
  const { products } = useAppSelector((state) => state.ProductsReducer);
  const [product, setProduct] = React.useState<IProduct>(InitialProductInfo);
  const [content, setContent] = React.useState<IOrderContent>({
    ...InitialOrderContentInfo,
    id: GenerateOTP(),
  });
  const [value, setValue] = React.useState<Date | null>(null);
  const [order, setOrder] = React.useState<INewOrder>({
    ...NewOrderInfo,
    user: user ? user._id : "",
  });
  const [payment, setPayment] = React.useState(0);

  function HandleAdd() {
    try {
      ValidateOrderInfo(order);
      const Info: IOrder = { ...order, _id: "" };
      if (payment !== 0) {
        const paymentInfo: IPaymentInfo = {
          date: moment().format(),
          amount: payment,
          id: GenerateOTP(),
        };
        Info.payment.push(paymentInfo);
        Info.date_added = moment().format();
      }
      Info.payment_status = CheckPaymentStatus(
        order.payment,
        order.order.content
      );
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

  function HandleAddContent() {
    try {
      ValidateOrderContent(content);
      setOrder({
        ...order,
        order: {
          ...order.order,
          content: [...order.order.content, content],
        },
      });
      setContent({
        ...InitialOrderContentInfo,
        id: GenerateOTP(),
      });
    } catch (error) {
      dispatch(ResponseFail(error));
    }
  }
  return (
    <Box className={classes.root}>
      <OrderContent
        open={open}
        handleOpen={() => setOpen(false)}
        content={order.order.content}
        setContent={(data) => {
          setOrder({
            ...order,
            order: {
              ...order.order,
              content: data,
            },
          });
        }}
      />
      <Slide direction="down" timeout={750} in>
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
                <Box style={{ width: "90%", alignSelf: "center" }}>
                  <Typography
                    variant="caption"
                    className={`title ${classes.title_label}`}
                  >
                    Customer Details
                  </Typography>

                  <Input
                    label="Name"
                    value={order.customer.name}
                    handleChange={(e) =>
                      setOrder({
                        ...order,
                        customer: { ...order.customer, name: e.target.value },
                      })
                    }
                  />
                  <Input
                    label="PhoneNumber"
                    value={order.customer.phone}
                    handleChange={(e) =>
                      setOrder({
                        ...order,
                        customer: { ...order.customer, phone: e.target.value },
                      })
                    }
                  />
                  <Input
                    label="Email"
                    value={order.customer.email}
                    type="email"
                    handleChange={(e) =>
                      setOrder({
                        ...order,
                        customer: { ...order.customer, email: e.target.value },
                      })
                    }
                  />
                </Box>
              </Box>
              <Box className={classes.right_container}>
                <Box
                  style={{
                    width: "90%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 1,
                  }}
                >
                  <Typography
                    variant="caption"
                    className={`title ${classes.title_label}`}
                  >
                    Order Details
                  </Typography>
                  <Button
                    style={{ textTransform: "none" }}
                    variant="text"
                    size="small"
                    color="primary"
                    onClick={() => setOpen(true)}
                  >
                    <RemoveRedEye />
                    <Typography variant="body2">View</Typography>
                  </Button>
                </Box>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    marginBottom: 10,
                  }}
                >
                  <TextField
                    variant="outlined"
                    size="small"
                    select
                    value={content.title}
                    label="Product"
                    style={{ flex: 1 }}
                  >
                    {products.map((p) => (
                      <MenuItem
                        value={p.name}
                        button
                        onClick={() => {
                          setProduct(p);
                          setContent({
                            ...content,
                            title: p.name,
                            id: p._id,
                            unit_cost: p.unit_cost,
                          });
                        }}
                        key={p._id}
                      >
                        {p.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 10,
                  }}
                >
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Unit Cost"
                    style={{ marginRight: 5, flex: 1 }}
                    value={product.unit_cost === 0 ? "" : product.unit_cost}
                  />
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Quantity"
                    style={{ flex: 1 }}
                    value={content.quantity === 0 ? "" : content.quantity}
                    onChange={(e) => {
                      if (!isNaN(parseInt(e.target.value))) {
                        setContent({
                          ...content,
                          quantity: parseInt(e.target.value),
                        });
                      } else {
                        setContent({ ...content, quantity: 0 });
                      }
                    }}
                  />
                  <Button
                    onClick={HandleAddContent}
                    style={{
                      flex: 0.35,
                      marginLeft: 10,
                      textTransform: "none",
                      height: 35,
                      marginTop: 1,
                    }}
                    variant="outlined"
                    size="small"
                    color="primary"
                  >
                    Add
                  </Button>
                </Box>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Estimated Delivery Date"
                    value={
                      order.delivery.delivered
                        ? order.delivery.date
                        : moment(Date.now().toString()).format("DD/MM/YYYY")
                    }
                    onChange={(newValue) => {
                      setOrder({
                        ...order,
                        delivery: { ...order.delivery, date: newValue },
                      });
                    }}
                    renderInput={(params) => (
                      <MUITextFiel
                        size="small"
                        variant="outlined"
                        {...params}
                        className={classes.input}
                        style={{ width: "100%" }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Box>
            </Box>
            <Divider />
            <Box className={classes.container}>
              <Box className={classes.left_container}>
                <Box style={{ width: "90%", alignSelf: "center" }}>
                  <Typography
                    variant="caption"
                    className={`title ${classes.title_label}`}
                  >
                    Payment
                  </Typography>
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Amount"
                    type="number"
                    value={payment === 0 ? "" : payment}
                    onChange={(e) => {
                      if (!isNaN(parseFloat(e.target.value))) {
                        setPayment(parseFloat(e.target.value));
                      } else {
                        setPayment(0);
                      }
                    }}
                    style={{ width: "100%", margin: "5px 0" }}
                  />
                  <Box
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      padding: 4,
                    }}
                  >
                    <Typography variant="body2">Delivered</Typography>
                    <Checkbox
                      checked={order.delivery.delivered}
                      onClick={() =>
                        setOrder({
                          ...order,
                          delivery: {
                            ...order.delivery,
                            delivered: !order.delivery.delivered,
                          },
                        })
                      }
                    />
                  </Box>
                </Box>
              </Box>
              <Box className={classes.right_container}>
                <Box style={{ width: "90%", alignSelf: "center" }}>
                  <Typography
                    variant="caption"
                    className={`title ${classes.title_label}`}
                  >
                    Delivery
                  </Typography>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={order.delivery.address}
                    onChange={(e) =>
                      setOrder({
                        ...order,
                        delivery: {
                          ...order.delivery,
                          address: e.target.value,
                        },
                      })
                    }
                    label="Address"
                    style={{ width: "100%", margin: "5px 0" }}
                  />
                  <TextField
                    variant="outlined"
                    size="small"
                    value={order.delivery.note}
                    onChange={(e) =>
                      setOrder({
                        ...order,
                        delivery: { ...order.delivery, note: e.target.value },
                      })
                    }
                    label="Statement/Note"
                    style={{ width: "100%", margin: "5px 0" }}
                  />
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                padding: 5,
                justifyContent: "space-between",
                alignItems: "center",
              }}
              className={classes.container}
            >
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  padding: 5,
                }}
              >
                <Typography variant="body2" style={{ marginRight: 5 }}>
                  Paid:
                </Typography>
                <Typography
                  variant="body1"
                  style={{ fontWeight: "bold", color: "seagreen" }}
                >
                  {`${currency}${GetPaymentAmount(order.payment)}`}
                </Typography>
                <Typography
                  style={{ marginLeft: 15, marginRight: 5 }}
                  variant="body2"
                >
                  OutStanding:
                </Typography>
                <Typography
                  style={{ fontWeight: "bold", color: "firebrick" }}
                  variant="body1"
                >
                  {" "}
                  {`${currency}${
                    GetAmountDue(order.order.content) -
                    GetPaymentAmount(order.payment)
                  }`}
                </Typography>
              </Box>

              <Button
                onClick={HandleAdd}
                style={{
                  height: 30,
                  alignSelf: "flex-end",
                  textTransform: "none",
                }}
                variant="contained"
                size="small"
                color="primary"
              >
                Save Details
              </Button>
            </Box>
          </Paper>
        </Draggable>
      </Slide>
    </Box>
  );
}
