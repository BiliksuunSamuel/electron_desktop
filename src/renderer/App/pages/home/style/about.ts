import { makeStyles } from "@material-ui/core";

export default makeStyles(
  (theme) => ({
    root: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 0,
      justifyContent: "flex-start",
    },
    header: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: theme.spacing(2),
      height: 40,
      margin: theme.spacing(1, 0),
      borderRadius: 0,
      boxShadow: theme.shadows[1],
      width: "100%",
    },
    header_title: {
      fontSize: theme.spacing(2.5),
    },
    content: {
      width: "100%",
      padding: theme.spacing(2),
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
    },
    info_container: {
      width: 400,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      borderRadius: 0,
      alignSelf: "center",
    },
    image_container: {
      width: 70,
      height: 70,
      borderRadius: 70,
      margin: theme.spacing(1, 0),
      overflow: "hidden",
    },
  }),
  { index: 1 }
);
