import { makeStyles } from "@material-ui/core";

export default makeStyles(
  (theme) => ({
    root: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    header: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: theme.spacing(1),
      margin: theme.spacing(1, 0),
      boxShadow: theme.shadows[1],
      borderRadius: 0,
      width: "100%",
    },
    header_left: {
      flex: 1,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: 0,
      margin: 0,
    },
    header_right: {
      marginRight: theme.spacing(2),
    },
    content_container: {
      padding: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      margin: 0,
    },
  }),
  { index: 1 }
);
