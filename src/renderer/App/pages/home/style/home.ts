import { makeStyles } from "@material-ui/core";

export default makeStyles(
  (theme) => ({
    root: {
      width: "100vw",
      height: "100%",
      overflow: "hidden",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      background: "#fff",
    },

    container: {
      flex: 1,
      width: "100vw",
      height: "100vh",
      background: "stealblue",
    },
  }),
  { index: 1 }
);
