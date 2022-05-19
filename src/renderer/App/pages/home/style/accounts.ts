import { makeStyles } from "@material-ui/core";

export default makeStyles(
  (theme) => ({
    root: {
      padding: theme.spacing(0),
      margin: 0,
      width: "100%",
      height: "100%",
      background: "#fff",
    },
    header: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(1),
      borderWidth: 1,
      borderColor: "#d0d0d0",
      borderRadius: 5,
      margin: theme.spacing(0.5, 0),
    },
    content: {
      padding: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      height: "100%",
      justifyContent: "flex-start",
    },
    header_content: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(0.5),
    },
    image_container: {
      width: 40,
      height: 40,
      overflow: "hidden",
      borderRadius: 40,
      margin: theme.spacing(0, 1),
    },
    table_container: {
      width: "65%",
      alignSelf: "center",
    },
  }),
  { index: 1 }
);
