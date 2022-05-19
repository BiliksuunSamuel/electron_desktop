import { makeStyles } from "@material-ui/core";
import colors from "../../../constants/colors";

export default makeStyles(
  (theme) => ({
    root: {
      width: "100%",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      overflow: "hidden",
    },
    logo_container: {
      width: 40,
      height: 40,
      borderRadius: 40,
      alignSelf: "center",
    },
    paper_container: {
      width: "70%",
      alignSelf: "center",
      minHeight: 450,
      padding: theme.spacing(0),
      overflow: "hidden",
      boxShadow: theme.shadows[1],
      borderRadius: 0,
    },
    header: {
      height: 60,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      background: colors._076585,
    },
    input: {
      height: 35,
      margin: theme.spacing(1, 0),
      width: "90%",
      alignSelf: "center",
    },
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      width: "100%",
      padding: theme.spacing(1),
      overflow: "hidden",
    },
    left_container: {
      flex: 1,
      alignSelf: "flex-start",
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
    },
    right_container: {
      flex: 1,
      alignSelf: "flex-start",
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      paddingRight: theme.spacing(0.5),
    },
    radiogroup: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      width: "100%",
    },
    title_label: {
      fontSize: 15,
      fontWeight: "bold",
      width: "90%",
      textAlign: "left",
    },
    radiio_label: {
      fontSize: 16,
      fontWeight: "bold",
      width: "100%",
      textAlign: "left",
    },
    button: {
      width: "90%",
      height: 30,
      textTransform: "none",
      margin: theme.spacing(0.5, 0),
    },
  }),
  { index: 1 }
);
