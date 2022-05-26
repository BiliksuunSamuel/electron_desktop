import {
  makeStyles,
  Modal,
  Box,
  Typography,
  Divider,
  IconButton,
  Container,
} from "@material-ui/core";
import * as moment from "moment";
import * as React from "react";
import colors from "../constants/colors";
import { resources } from "../resources/resources";

import Draggable from "react-draggable";
import ReactToPrint from "react-to-print";
import { Close, Print } from "@material-ui/icons";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { IOrder } from "../interface/IModel";
import {
  GetAmountDue,
  GetPaymentAmount,
} from "../pages/home/services/services";
import InvoiceReceiptItemTable from "./InvoiceReceiptItemTable";
import { SetOrder } from "../features/slice/SettingsSlice";
import { currency } from "../constants/constants";
import { Table } from "react-bootstrap";
//
const styles = makeStyles(
  (theme) => ({
    root: {
      padding: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      margin: 0,
      background: "rgba(255,255,255,0.15)",
      backdropFilter: "blur(1px)",
      overflow: "hidden",
      position: "relative",
    },
    main_container: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(2),
      background: theme.palette.common.white,
    },

    container: {
      width: 600,
      paddingBottom: 50,
      alignSelf: "center",
      outline: "none",
      background: "#fff",
      padding: theme.spacing(0),
      borderRadius: 0,
      overflow: "hidden",
      fontSize: "1rem",
      fontFamily: "impact",
      border: "1px solid rgba(211,211,211,0.85)",
      boxShadow: theme.shadows[1],
    },
    header: {
      padding: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      background: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    header_left: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      width: "100%",
      paddingLeft: theme.spacing(2),
    },

    logo_container: {
      width: 40,
      height: 40,
      borderRadius: 40,
      overflow: "hidden",
    },
    company_title: {
      fontFamily: "American Typewriter Std-Med",
      fontSize: 17,
      color: colors._000,
      margin: theme.spacing(0, 1),
    },
    tag: {
      fontFamily: "American Typewriter Std-Med",
      fontSize: 20,
      fontWeight: "bold",
      color: colors._000,
      textTransform: "uppercase",
      margin: theme.spacing(0, 1),
    },
    top_container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: theme.spacing(1),
    },
    top_container_left: {
      flex: 1,
    },
    top_container_right: {
      flex: 1,
    },
    comp: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
    },
  }),
  { index: 1 }
);

//

interface IProps {
  order: IOrder;
  handleClose: () => void;
}
export default function ReceiptGenerator({ order, handleClose }: IProps) {
  const classes = styles();
  const dispatch = useAppDispatch();
  const contentRef = React.useRef(null);
  const { user } = useAppSelector((state) => state.UserReducer);

  return (
    <Modal className={classes.root} open={Boolean(order)}>
      <React.Fragment>
        <ReactToPrint
          copyStyles={true}
          trigger={() => (
            <IconButton
              style={{
                position: "absolute",
                top: 10,
                left: "50%",
                margin: "0px 10px",
                zIndex: 2,
                background: "#fff",
              }}
              size="small"
            >
              <Print />
            </IconButton>
          )}
          content={() => contentRef?.current}
        />

        <IconButton
          onClick={handleClose}
          color="secondary"
          style={{
            position: "absolute",
            top: 10,
            left: "55%",
            margin: "0px 10px",
            background: "#fff",
            zIndex: 2,
          }}
          size="small"
        >
          <Close htmlColor="firebrick" />
        </IconButton>
        <Draggable>
          {order && (
            <Container
              style={{
                background: "transparent",
                outline: "none",
                borderStyle: "none",
              }}
              className={classes.main_container}
            >
              <div
                style={{
                  padding: 0,
                  borderStyle: "none",
                  outline: "none",
                  width: "100%",
                }}
                ref={contentRef}
                className={classes.container}
              >
                <Box className={classes.header}>
                  <Box className={classes.header_left}>
                    <Box className={classes.logo_container}>
                      <img src={resources.logo} className="img" />
                    </Box>
                    <Box>
                      <Typography
                        style={{
                          color: "#fff",
                          fontSize: 18,
                        }}
                        variant="body1"
                        className={classes.company_title}
                      >
                        FEED KONZEPT
                      </Typography>
                      <Typography
                        style={{
                          color: "#fff",
                          fontSize: 16,
                          textTransform: "none",
                        }}
                        className={classes.tag}
                        variant="body1"
                      >
                        Receipt
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Divider />
                <Box style={{ marginBottom: 5 }}>
                  <Box
                    style={{
                      paddingLeft: 7,
                    }}
                  >
                    <p
                      style={{
                        padding: 0,
                        margin: 0,
                        fontWeight: 800,
                      }}
                    >
                      <small style={{ fontWeight: "normal", marginRight: 8 }}>
                        Customer Name:
                      </small>
                      {order.customer.name}
                    </p>
                    <p
                      style={{
                        padding: 0,
                        margin: 0,
                        fontWeight: 800,
                      }}
                    >
                      <small style={{ fontWeight: "normal", marginRight: 8 }}>
                        Delivery Address:
                      </small>
                      {Boolean(order.delivery.address)
                        ? order.delivery.address
                        : "N/A"}
                    </p>
                    <p
                      style={{
                        padding: 0,
                        margin: 0,
                        fontWeight: 800,
                      }}
                    >
                      <small style={{ fontWeight: "normal", marginRight: 8 }}>
                        PhoneNumber:
                      </small>
                      {order.customer.phone}
                    </p>
                    <p
                      style={{
                        padding: 0,
                        margin: 0,
                        fontWeight: 800,
                      }}
                    >
                      <small style={{ fontWeight: "normal", marginRight: 8 }}>
                        Amount Paid:
                      </small>
                      {`${currency}${GetPaymentAmount(order.payment).toFixed(
                        2
                      )}`}
                    </p>
                    <p
                      style={{
                        height: 25,
                        padding: 0,
                        margin: 0,
                        fontWeight: 900,
                      }}
                    >
                      <small style={{ fontWeight: "normal", marginRight: 8 }}>
                        Outstanding:
                      </small>
                      {`${currency}${(
                        GetAmountDue(order.order.content) -
                        GetPaymentAmount(order.payment)
                      ).toFixed(2)}`}
                    </p>
                    <p
                      style={{
                        padding: 0,
                        margin: 0,
                        fontWeight: 800,
                      }}
                    >
                      <small style={{ fontWeight: "normal", marginRight: 8 }}>
                        Date Issued:
                      </small>
                      {moment(order.date_added).format("DD/MM/YYYY")}
                    </p>
                    <p
                      style={{
                        padding: 0,
                        margin: 0,
                        fontWeight: 800,
                      }}
                    >
                      <small style={{ fontWeight: "normal", marginRight: 8 }}>
                        Issued By:
                      </small>
                      {user ? user.username : ""}
                    </p>
                  </Box>
                </Box>
                <Divider />
                <Box style={{ marginBottom: 5 }}>
                  <Box
                    style={{
                      paddingLeft: 7,
                    }}
                  >
                    <p style={{ fontWeight: 800, margin: 0, padding: 0 }}>
                      Order Info:
                    </p>
                  </Box>
                  <Divider />
                  <Box style={{ marginTop: 5 }}>
                    <InvoiceReceiptItemTable items={order.order.content} />
                  </Box>
                </Box>

                <Divider />
                <Box style={{ marginBottom: 5 }}>
                  <Box
                    style={{
                      color: colors._000,
                      paddingLeft: 7,
                      paddingRight: 7,
                    }}
                  >
                    <p style={{ padding: 0, margin: 0 }}>
                      Order Statement/Description:
                    </p>
                  </Box>
                </Box>
              </div>
            </Container>
          )}
        </Draggable>
      </React.Fragment>
    </Modal>
  );
}
