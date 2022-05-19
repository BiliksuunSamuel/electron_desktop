import * as React from "react";
import {
  makeStyles,
  Modal,
  Paper,
  Box,
  IconButton,
  Button,
  Typography,
} from "@material-ui/core";
import { IUser } from "../interface/IModel";
import Draggable from "react-draggable";
import colors from "../constants/colors";
import { resources } from "../resources/resources";
const styles = makeStyles(
  (theme) => ({
    root: {
      width: "100%",
      height: "100%",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    info_container: {
      width: 200,
      borderRadius: 5,
      boxShadow: theme.shadows[3],
      padding: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      borderStyle: "none",
      borderWidth: 0,
      outline: "none",
    },
    profile_container: {
      width: 60,
      height: 60,
      borderRadius: 60,
      overflow: "hidden",
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      flexDirection: "column",
      borderWidth: 2,
      borderColor: colors._076585,
      margin: theme.spacing(2),
    },
  }),
  { index: 1 }
);

interface IProps {
  open: boolean;
  user: IUser;
  handleClose: () => void;
}
export default function AccountReview({ open, handleClose, user }: IProps) {
  const classes = styles();
  return (
    <Modal open={open} className={classes.root}>
      <Draggable>
        <Paper className={classes.info_container}>
          <Box></Box>
          <Box className={classes.profile_container}>
            <img className="img" src={resources.user} alt="user" />
          </Box>
          <Box style={{ width: "100%" }}>
            <Typography
              style={{
                fontSize: 20,
                fontWeight: "bold",
                width: "100%",
                textAlign: "center",
              }}
              variant="body1"
            >
              {user.username}
            </Typography>
            <Typography
              style={{
                width: "100%",
                textAlign: "center",
                color: "rgba(211,211,211,0.85)",
                fontSize: 14,
              }}
              variant="body1"
            >
              {user.phone}
            </Typography>

            <Paper
              elevation={1}
              style={{
                width: "100%",
                height: 8,
                borderRadius: 30,
                background: colors._076585,
                margin: "10px 0",
              }}
            />
          </Box>
          <Button onClick={handleClose} variant="outlined" size="small">
            Close
          </Button>
        </Paper>
      </Draggable>
    </Modal>
  );
}
