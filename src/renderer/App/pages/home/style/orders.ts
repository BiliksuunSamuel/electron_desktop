import { makeStyles } from "@material-ui/core";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";

export default makeStyles(
  (theme) => ({
    root: {
      flex: 1,
      background: "#fff",
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: theme.spacing(0),
    },
    container: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      outline: "none",
      borderStyle: "none",
      background: "transparent",
    },
    header: {
      padding: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
      alignit: "center",
      justifyContent: "space-between",
      borderRadius: 0,
      boxShadow: theme.shadows[2],
      width: "100%",
    },
    header_left: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(0, 1),
    },
    header_right: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(0, 1),
    },
    grid_container: {
      height: "55%",
      width: "85%",
      alignItems: "center",
      padding: 10,
      marginTop: 20,
      boxShadow: theme.shadows[2],
      [theme.breakpoints.down("sm")]: {
        width: "95%",
      },
    },
  }),
  { index: 1 }
);
