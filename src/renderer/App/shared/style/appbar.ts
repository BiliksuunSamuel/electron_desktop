import { makeStyles } from "@material-ui/core";
import colors from "../../constants/colors";

export default makeStyles(
  (theme) => ({
    appbar: {
      width: "100%",
      padding: 0,
      height: 50,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "#000",
      background: colors.fff,
    },
    toolbar: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    },
    toolbar_right: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(0, 2),
    },
    toolbar_left: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: theme.spacing(0.2),
      justifyContent: "center",
    },
  }),
  { index: 1 }
);
