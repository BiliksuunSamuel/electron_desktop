import {
  Box,
  IconButton,
  Modal,
  Paper,
  makeStyles,
  Typography,
  Divider,
  Button,
} from "@material-ui/core";
import { Backup, Close } from "@material-ui/icons";
import { BackupOutlined } from "@mui/icons-material";
import * as React from "react";
import Draggable from "react-draggable";
import { MdOutlinePadding, MdOutlinePending } from "react-icons/md";
import { useAppSelector } from "../../../app/hook";
import colors from "../../../constants/colors";

interface IProps {
  handleModal: () => void;
  open: boolean;
}

const styles = makeStyles(
  (theme) => ({
    modal: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      outline: "none",
      borderStyle: "none",
      borderWidth: 0,
      background: "rgba(255,255,255,0.15)",
      backdropFilter: "blur(1px)",
    },
    container: {
      width: 300,
      padding: 0,
      borderRadius: 10,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      outline: "none",
      alignSelf: "center",
      background: "#fff",
      borderStyle: "none",
      borderWidth: 0,
      boxShadow: theme.shadows[2],
      overflow: "hidden",
    },
    header: {
      padding: theme.spacing(1),
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      paddingLeft: theme.spacing(1),
      background: colors._076585,
      color: "#fff",
    },
    header_left: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: theme.spacing(1),
      flex: 1,
    },
    info_container: {},
  }),
  { index: 1 }
);
export default function BackupOrdersModal({ handleModal, open }: IProps) {
  const classes = styles();
  const { orders } = useAppSelector((state) => state.OrdersReducer);
  return (
    <Modal className={classes.modal} open={open}>
      <Draggable>
        <Paper className={classes.container}>
          <Box className={classes.header}>
            <Box className={classes.header_left}>
              <BackupOutlined />
              <Typography
                variant="caption"
                className="title"
                style={{ fontSize: 15 }}
              >
                Backup Data
              </Typography>
            </Box>
            <IconButton
              style={{ color: "#fff" }}
              onClick={handleModal}
              size="small"
            >
              <Close htmlColor="#fff" />
            </IconButton>
          </Box>
          <Box className={classes.info_container}>
            <Divider />
            <Typography
              className="title"
              style={{ fontSize: 15, fontWeight: "bold" }}
              variant="caption"
            >
              Pending Commits:
            </Typography>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="body1"
                style={{
                  textAlign: "left",
                  fontSize: 16,
                  width: "inherit",
                  alignSelf: "left",
                }}
              >
                {orders.filter((order) => order._id === "").length}
              </Typography>
              <Typography
                variant="body1"
                style={{
                  fontSize: 16,
                  textAlign: "left",
                  width: "inherit",
                  alignSelf: "left",
                }}
              >
                Files
              </Typography>
            </Box>
            <Button
              size="small"
              style={{ textTransform: "none", width: "100%", margin: "10px 0" }}
              variant="contained"
              color="primary"
            >
              Commit Changes
            </Button>
          </Box>
        </Paper>
      </Draggable>
    </Modal>
  );
}
