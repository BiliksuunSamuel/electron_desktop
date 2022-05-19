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
} from "@material-ui/core";
import moment = require("moment");
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { NewOrderInfo } from "../data/ModelData";
import { ResponseFail } from "../features/slice/ResponseSlice";
import { INewOrder, IOrder, IPaymentInfo } from "../interface/IModel";
import { resources } from "../resources/resources";
import { ValidateOrderInfo } from "../services/Validation";
import { v4 as uuid } from "uuid";
import { AddOrderThunk, NewOrderThunk } from "../functions/order";
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

interface IProps {
  info: IOrder;
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
export default function ManageRequest({ handleModal, info }: IProps) {
  const classes = request_styles();
  const styles = style();
  const [order, setOrder] = React.useState<IOrder>(info);
  const [payment, setPayment] = React.useState<number>(0);
  return (
    <Modal className={styles.root} open={Boolean(info)}>
      <React.Fragment>
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
                    marginBottom: 10,
                  }}
                >
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Unit Cost"
                    style={{ marginRight: 5, flex: 1 }}
                  />
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Quantity"
                    style={{ flex: 1 }}
                  />
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
                    label="Title"
                    style={{ flex: 1 }}
                  />
                  <Button
                    style={{
                      flex: 0.35,
                      marginLeft: 5,
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
                    value={order.delivery.date}
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
                    style={{ width: "100%", margin: "5px 0" }}
                  />
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      margin: "5px 0",
                    }}
                  >
                    <Typography variant="body2">Completed</Typography>
                    <Checkbox checked={false} />
                    <Typography variant="body2">Partial</Typography>
                    <Checkbox checked={true} />
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
                    style={{ width: "100%", margin: "5px 0" }}
                  />
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Statement/Note"
                    style={{ width: "100%", margin: "5px 0" }}
                  />
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box className={classes.container}>
              <Box className={classes.left_container}>
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
                  <Typography variant="body2">Delivered Upon Order</Typography>
                  <Checkbox />
                </Box>
              </Box>
              <Box
                style={{ justifyContent: "flex-end" }}
                className={classes.right_container}
              >
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    width: "100%",
                  }}
                >
                  <Button
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
              </Box>
            </Box>
          </Paper>
        </Draggable>
      </React.Fragment>
    </Modal>
  );
}
