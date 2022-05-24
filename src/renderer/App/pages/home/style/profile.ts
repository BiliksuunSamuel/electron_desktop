import { makeStyles } from "@material-ui/core";

export default makeStyles(
  (theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      width: "100%",
      padding: theme.spacing(1),
    },
    header: {
      boxShadow: theme.shadows[1],
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      margin: theme.spacing(1, 0),
      borderRadius: 0,
      background: "#fff",
      padding: theme.spacing(1),
      width: "100%",
    },
    info_container: {
      width: 300,
      borderRadius: 0,
      alignSelf: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: theme.spacing(1),
      margin: theme.spacing(1),
    },
    password_container: {
      width: 300,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(1),
      margin: theme.spacing(1),
    },
    input: {
      margin: theme.spacing(1, 0),
      width: "100%",
    },
    button: {
      width: "100%",
      textTransform: "none",
      margin: theme.spacing(1, 0),
    },
    content: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
    },
  }),
  { index: 1 }
);
