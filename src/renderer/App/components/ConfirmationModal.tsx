import {
  Box,
  Button,
  makeStyles,
  Modal,
  Paper,
  Typography,
} from "@material-ui/core";
import * as React from "react";

const styles = makeStyles(
  (theme) => ({
    root: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flex: 1,
      justifyContent: "center",
      background: "rgba(255,255,255,0.25)",
      backdropFilter: "blur(1px)",
    },
    container: {
      width: 300,
      borderRadius: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(2),
      outline: "none",
      borderStyle: "none",
      background: "#fff",
    },
    buttons_container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      padding: theme.spacing(1),
    },
    button: {
      borderRadius: 0,
      textTransform: "uppercase",
      margin: theme.spacing(0, 1),
      flex: 1,
      height: 35,
    },
    title_message: {
      width: "100%",
      textAlign: "center",
    },
  }),
  { index: 1 }
);

interface IProps {
  message: string;
  handleResponse: (response: boolean) => void;
  open: boolean;
}
export default function ConfirmationModal({
  open,
  message,
  handleResponse,
}: IProps) {
  const classes = styles();
  return (
    <Modal open={open} className={classes.root}>
      <Paper className={classes.container}>
        <Typography variant="body1" className={classes.title_message}>
          {message}
        </Typography>
        <Box className={classes.buttons_container}>
          <Button
            onClick={() => handleResponse(true)}
            className={classes.button}
            size="small"
            color="primary"
            variant="contained"
          >
            Yes
          </Button>
          <Button
            onClick={() => handleResponse(false)}
            className={classes.button}
            size="small"
            color="secondary"
            variant="contained"
          >
            No
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
}
