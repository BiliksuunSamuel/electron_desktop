import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Paper,
  Slide,
  TextField,
  Typography,
  Modal,
  makeStyles,
  Divider,
  MenuItem,
} from "@material-ui/core";
import moment = require("moment");
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import {
  InitialOrderContentInfo,
  NewOrderInfo,
  InitialProductInfo,
} from "../data/ModelData";
import { ResponseFail } from "../features/slice/ResponseSlice";
import {
  INewOrder,
  IOrder,
  IOrderContent,
  IPaymentInfo,
  IProduct,
} from "../interface/IModel";
import { resources } from "../resources/resources";
import { ValidateOrderInfo } from "../services/Validation";
import { v4 as uuid } from "uuid";
import {
  AddOrderThunk,
  NewOrderThunk,
  OrderUpdateThunk,
} from "../functions/order";
import Draggable from "react-draggable";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField as MUITextFiel } from "@mui/material";
import {
  Close,
  NoteAdd,
  NoteAddOutlined,
  RemoveRedEye,
} from "@material-ui/icons";
import { GenerateOTP } from "../services/OTPGenerator";
import { request_styles } from "../pages/home/style";
import Input from "./Input";
import { OrderContent } from "../pages/home/components";
import { currency } from "../constants/constants";
import {
  GetAmountDue,
  GetPaymentAmount,
  ValidateOrderContent,
} from "../pages/home/services/services";
interface IProps {
  Info: IOrder;
  handleModal: () => void;
}

const style = makeStyles(
  (theme) => ({
    root: {
      width: "100%",
      height: "100%",
      padding: 0,
      margin: 0,
      flex: 1,
      background: "rgba(255,255,255,0.15)",
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      backdropFilter: "blur(1px)",
      flexDirection: "column",
    },
  }),
  { index: 1 }
);
export default function ManageRequest({ handleModal, Info }: IProps) {
  const classes = request_styles();
  const dispatch = useAppDispatch();
  const styles = style();
  const [open, setOpen] = React.useState(false);
  const [payment, setPayment] = React.useState<any>("");
  const [info, setInfo] = React.useState<IOrder>(Info);
  const { products } = useAppSelector((state) => state.ProductsReducer);
  const [product, setProduct] = React.useState<IProduct>(InitialProductInfo);
  const [content, setContent] = React.useState<IOrderContent>({
    ...InitialOrderContentInfo,
    id: GenerateOTP(),
  });

  function HandleUpdate() {
    dispatch(OrderUpdateThunk({ id: info._id, info }));
  }

  function handleAddPayment() {
    if (isNaN(parseFloat(payment))) {
      dispatch(ResponseFail("Invalid Amount"));
    } else {
      setInfo({
        ...info,
        payment: [
          ...info.payment,
          {
            date: moment().format(),
            amount: parseFloat(payment),
            id: GenerateOTP(),
          },
        ],
      });
      setPayment("");
    }
  }

  function handleAddContent() {
    try {
      ValidateOrderContent(content);
      setInfo({
        ...info,
        order: {
          ...info.order,
          content: [...info.order.content, content],
        },
      });
      setContent({ ...InitialOrderContentInfo, id: GenerateOTP() });
    } catch (error) {
      dispatch(ResponseFail(error));
    }
  }
  return (
    <Modal className={styles.root} open={Boolean(info)}>
      <React.Fragment>
        <OrderContent
          open={open}
          handleOpen={() => setOpen(false)}
          content={info.order.content}
          setContent={(data) =>
            setInfo({ ...info, order: { ...info.order, content: data } })
          }
        />
        <IconButton
          onClick={handleModal}
          color="secondary"
          style={{
            position: "absolute",
            top: 10,
            left: "50%",
            margin: "0px 10px",
            background: "#fff",
            zIndex: 2,
          }}
          size="small"
        >
          <Close htmlColor="firebrick" />
        </IconButton>
        <Draggable>
          <Paper
            style={{ paddingBottom: 20 }}
            elevation={2}
            className={classes.paper_container}
          >
            <Box className={classes.header}>
              <Box className={classes.logo_container}>
                <img src={resources.logo} className="img" alt="logo2" />
              </Box>
              <Typography
                className={`title`}
                style={{ fontSize: 24, color: "#fff" }}
                variant="caption"
              >
                Update Order Details
              </Typography>
            </Box>
            <Box className={classes.container}>
              <Box className={classes.left_container}>
                <Box
                  style={{
                    width: "90%",
                    alignSelf: "center",
                    padding: "8px 0",
                  }}
                >
                  <Typography
                    variant="caption"
                    className={`title ${classes.title_label}`}
                  >
                    Customer Details
                  </Typography>

                  <Input
                    label="Name"
                    value={info.customer.name}
                    handleChange={(e) =>
                      setInfo({
                        ...info,
                        customer: { ...info.customer, name: e.target.value },
                      })
                    }
                  />
                  <Input
                    label="PhoneNumber"
                    value={info.customer.phone}
                    handleChange={(e) =>
                      setInfo({
                        ...info,
                        customer: { ...info.customer, phone: e.target.value },
                      })
                    }
                  />
                  <Input
                    label="Email"
                    value={info.customer.email}
                    type="email"
                    handleChange={(e) =>
                      setInfo({
                        ...info,
                        customer: { ...info.customer, email: e.target.value },
                      })
                    }
                  />
                </Box>
              </Box>
              <Box style={{ width: "90%" }} className={classes.right_container}>
                <Box
                  style={{
                    width: "90%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 2,
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
                    width: "90%",
                    marginBottom: 10,
                  }}
                >
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Product"
                    style={{ flex: 1 }}
                    value={content.title}
                    select
                    onChange={(e) =>
                      setContent({ ...content, title: e.target.value })
                    }
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
                    justifyContent: "center",
                    marginBottom: 10,
                    alignSelf: "center",
                    width: "90%",
                    overflow: "hidden",
                    padding: "8px 0",
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
                    onClick={handleAddContent}
                  >
                    Add
                  </Button>
                </Box>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Estimated Delivery Date"
                    value={info.delivery.date}
                    onChange={(newValue) => {
                      setInfo({
                        ...info,
                        delivery: { ...info.delivery, date: newValue },
                      });
                    }}
                    renderInput={(params) => (
                      <MUITextFiel
                        size="small"
                        variant="outlined"
                        {...params}
                        className={classes.input}
                        style={{ width: "90%" }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Box>
            </Box>
            <Divider />
            <Box style={{}} className={classes.container}>
              <Box className={classes.left_container}>
                <Box style={{ width: "90%", alignSelf: "center" }}>
                  <Typography
                    variant="caption"
                    className={`title ${classes.title_label}`}
                  >
                    Payment
                  </Typography>
                  <Box
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "5px 0",
                    }}
                  >
                    <TextField
                      variant="outlined"
                      size="small"
                      label="Amount"
                      value={payment}
                      onChange={(e) => {
                        if (!isNaN(parseFloat(e.target.value))) {
                          setPayment(parseFloat(e.target.value));
                        }
                      }}
                      style={{ flex: 1, marginRight: 5 }}
                    />
                    <Button
                      variant="outlined"
                      style={{ textTransform: "none" }}
                      size="small"
                      color="primary"
                      onClick={handleAddPayment}
                    >
                      Add
                    </Button>
                  </Box>
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
                      onClick={() =>
                        setInfo({
                          ...info,
                          delivery: {
                            ...info.delivery,
                            delivered: !info.delivery.delivered,
                          },
                        })
                      }
                      checked={info.delivery.delivered}
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
                    label="Address"
                    value={info.delivery.address}
                    style={{ width: "100%", margin: "10px 0" }}
                  />
                  <TextField
                    variant="outlined"
                    value={info.delivery.note}
                    size="small"
                    label="Statement/Note"
                    style={{ width: "100%", margin: "10px 0" }}
                  />
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box
              style={{
                padding: "0px 15px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
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
                  {`${currency}${GetPaymentAmount(info.payment)}`}
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
                    GetAmountDue(info.order.content) -
                    GetPaymentAmount(info.payment)
                  }`}
                </Typography>
              </Box>

              <Button
                onClick={HandleUpdate}
                style={{
                  height: 30,
                  alignSelf: "flex-end",
                  textTransform: "none",
                }}
                variant="contained"
                size="small"
                color="primary"
              >
                Update Details
              </Button>
            </Box>
          </Paper>
        </Draggable>
      </React.Fragment>
    </Modal>
  );
}
