import {
  makeStyles,
  Modal,
  Paper,
  Box,
  Typography,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@material-ui/core";
import * as moment from "moment";
import * as React from "react";
import colors from "../constants/colors";
import { resources } from "../resources/resources";
import { v4 as uuid } from "uuid";
import { GenerateOTP } from "../services/OTPGenerator";
import Draggable from "react-draggable";
import { global_styles } from "../pages/home/style";
import { IPaymentInfo } from "../interface/IModel";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { Close, LocationCity, Phone, Print } from "@material-ui/icons";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { SetOrder } from "../features/slice/SettingsSlice";
import { currency } from "../constants/constants";
import {
  GetAmountDue,
  GetPaymentAmount,
} from "../pages/home/services/services";

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

    container: {
      width: 350,
      paddingBottom: 50,
      alignSelf: "center",
      borderStyle: "none",
      outline: "none",
      background: "#fff",
      padding: theme.spacing(1),
      borderRadius: 0,
      overflow: "hidden",
      fontSize: "1rem",
      fontFamily: "impact",
      border: "1px solid #000",
    },
    header: {
      padding: theme.spacing(1),
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    header_left: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    header_right: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    logo_container: {
      width: 40,
      height: 40,
      borderRadius: 40,
      overflow: "hidden",
    },
    company_title: {
      fontFamily: "compagnon light",
      fontSize: 17,
      color: colors._000,
      margin: theme.spacing(0, 1),
    },
    tag: {
      fontFamily: "verteran",
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
  }),
  { index: 1 }
);

//
export default function InvoiceGenerator() {
  const classes = styles();
  const global = global_styles();
  const dispatch = useAppDispatch();
  const { company } = useAppSelector((state) => state.CompanyInfoReducer);
  const { order } = useAppSelector((state) => state.SettingsReducer);
  const contentRef = React.useRef(null);

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
          onClick={() => dispatch(SetOrder(null))}
          color="secondary"
          style={{
            position: "absolute",
            top: 10,
            right: 10,
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
            <Paper
              ref={contentRef}
              component="div"
              elevation={0}
              className={classes.container}
            >
              <Box className={classes.header}>
                <Box className={classes.header_left}>
                  <Box className={classes.logo_container}>
                    <img src={resources.logo} className="img" />
                  </Box>
                  <Typography
                    style={{ fontFamily: "compagnon light", fontSize: 16 }}
                    variant="body1"
                    className={classes.company_title}
                  >
                    Feed Konzept
                  </Typography>
                </Box>
                <Box className={classes.header_right}>
                  <Typography className={classes.tag} variant="body1">
                    Invoice
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <Box style={{ marginBottom: 15 }}>
                <Box
                  style={{
                    paddingLeft: 7,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    style={{
                      fontFamily: "compagnon light",
                      fontWeight: "normal",
                      fontSize: 14,
                    }}
                    component="p"
                    className="invoice"
                    variant="caption"
                  >
                    Name: {order.customer.name}
                  </Typography>
                  <Typography
                    style={{ fontFamily: "compagnon light" }}
                    component="p"
                    className="invoice"
                    variant="caption"
                  >
                    Address:{" "}
                    {Boolean(order.delivery.address)
                      ? order.delivery.address
                      : "N/A"}
                  </Typography>
                  <Typography
                    style={{ fontFamily: "compagnon light" }}
                    component="p"
                    className="invoice"
                    variant="caption"
                  >
                    Tel: {order.customer.phone}
                  </Typography>
                  <Typography
                    style={{ fontFamily: "compagnon light" }}
                    component="p"
                    className="invoice"
                    variant="caption"
                  >
                    Paid:{" "}
                    {` ${currency}${GetPaymentAmount(order.payment).toFixed(
                      2
                    )}`}
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <Box style={{ marginBottom: 15 }}>
                <Box
                  style={{
                    color: colors._000,
                    paddingLeft: 7,
                  }}
                >
                  <Typography
                    style={{
                      fontFamily: "compagnon light",
                      fontWeight: "normal",
                      fontSize: 12,
                    }}
                    component="p"
                    variant="body2"
                  >
                    Content Info:
                  </Typography>
                </Box>
                <Box style={{ paddingLeft: 7, marginTop: 5 }}>
                  <TableContainer component={Box}>
                    <Table>
                      <TableHead>
                        <TableRow className={global.grid_cell}>
                          <TableCell
                            className={global.grid_cell}
                            style={{
                              fontFamily: "compagnon light",
                              fontSize: 12,
                              height: 20,
                            }}
                          >
                            Item
                          </TableCell>
                          <TableCell
                            className={global.grid_cell}
                            align="center"
                            style={{
                              fontFamily: "compagnon light",
                              fontSize: 12,
                              height: 20,
                            }}
                          >
                            Unit Cost
                          </TableCell>
                          <TableCell
                            className={global.grid_cell}
                            align="center"
                            style={{
                              fontFamily: "compagnon light",
                              fontSize: 12,
                              height: 20,
                            }}
                          >
                            Quantity
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {order.order.content.map((content) => (
                          <TableRow
                            key={content.id}
                            className={global.grid_cell}
                          >
                            <TableCell
                              style={{
                                height: 20,
                                fontFamily: "compagnon light",
                                fontSize: 12,
                              }}
                              className={global.grid_cell}
                            >
                              {content.title}
                            </TableCell>
                            <TableCell
                              style={{
                                height: 20,
                                fontFamily: "compagnon light",
                                fontSize: 12,
                              }}
                              className={global.grid_cell}
                              align="center"
                            >
                              {currency + content.unit_cost}
                            </TableCell>
                            <TableCell
                              style={{
                                height: 20,
                                fontFamily: "compagnon light",
                                fontSize: 12,
                              }}
                              className={global.grid_cell}
                              align="center"
                            >
                              {content.quantity}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingLeft: 7,
                    width: "100%",
                    marginTop: 15,
                    paddingRight: 7,
                  }}
                >
                  <Typography
                    style={{
                      fontFamily: "compagnon light",
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                    variant="caption"
                  >
                    Total
                  </Typography>
                  <Typography
                    style={{
                      fontFamily: "compagnon light",
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                    variant="caption"
                  >
                    {currency +
                      GetAmountDue(order.order.content).toFixed(2).toString()}
                  </Typography>
                </Box>
              </Box>

              <Divider />
              <Box style={{ marginBottom: 15 }}>
                <Box
                  style={{
                    color: colors._000,
                    paddingLeft: 7,
                    paddingRight: 7,
                  }}
                >
                  <Typography
                    style={{ fontFamily: "compagnon light", fontSize: 12 }}
                    component="p"
                    variant="caption"
                  >
                    Order Statement/Description:
                  </Typography>
                </Box>
                <Box style={{ paddingLeft: 7 }}>
                  <Typography
                    style={{
                      width: "100%",
                      textAlign: "left",
                      fontFamily: "compagnon light",
                      fontSize: 12,
                    }}
                    variant="caption"
                  >
                    {order.delivery.note}
                  </Typography>
                </Box>
              </Box>
              <Divider style={{ marginTop: 20 }} />
              <Box
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",

                  paddingLeft: 7,
                }}
              >
                <Phone
                  style={{ marginRight: 4 }}
                  fontSize="small"
                  htmlColor="#d0d0d0"
                />
                <Typography
                  variant="body2"
                  style={{ fontFamily: "compagnon light", fontSize: 12 }}
                >
                  {company.tel}
                </Typography>
                <Divider orientation="vertical" />
                <LocationCity
                  style={{ margin: "0 5px" }}
                  fontSize="small"
                  htmlColor="#d0d0d0"
                />
                <Typography
                  variant="body2"
                  style={{ fontFamily: "compagnon light", fontSize: 12 }}
                >
                  {company.address}
                </Typography>
              </Box>
            </Paper>
          )}
        </Draggable>
      </React.Fragment>
    </Modal>
  );
}
