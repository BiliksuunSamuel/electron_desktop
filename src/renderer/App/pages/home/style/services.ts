import { makeStyles } from "@material-ui/core";

export default makeStyles(
  (theme) => ({
    root: {
      padding: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      width: "100%",
      height: "100vh",
    },
    header: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      padding: theme.spacing(1),
      margin: theme.spacing(1, 0),
      borderRadius: 0,
      boxShadow: theme.shadows[1],
      justifyContent: "space-between",
    },
    main_content_container: {
      padding: theme.spacing(2),
      overflowX: "hidden",
      overflowY: "auto",
      height: "100vh",
      paddingBottom: 100,
    },
    chart_container: {
      alignSelf: "center",
      padding: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      margin: theme.spacing(3, 0),
      boxShadow: theme.shadows[1],
      borderRadius: 0,
    },
    header_right: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(0, 2),
    },
    input: {
      margin: theme.spacing(0, 1),
      width: 100,
    },
  }),
  { index: 1 }
);
