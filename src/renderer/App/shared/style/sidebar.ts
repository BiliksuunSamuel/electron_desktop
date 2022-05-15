import { makeStyles } from "@material-ui/core";
import colors from "../../constants/colors";

export default makeStyles(
  (theme) => ({
    container: {
      width: 240,
      height: "100%",
      // background: "linear-gradient(0deg,#e0eafc,#cfdef3)",
      overflow: "hidden",
      background: colors._076585,
    },
    sidebar_header: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      height: 50,
      zIndex: 1,
    },
    sidebar_content: {
      height: "100vh",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    sidebar_title: {
      fontSize: theme.spacing(2.5),
      fontFamily: "Monda, sans-serif;",
      color: colors.fff,
    },
    title_container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
    },
    image_container: {
      width: 30,
      height: 30,
      overflow: "hidden",
      marginRight: theme.spacing(1),
    },
    list: {
      width: "100%",
      height: "100%",
      overflowX: "hidden",
      overflowY: "auto",
    },
    listitem: {
      height: 35,
    },
  }),
  { index: 1 }
);
