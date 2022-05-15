import { makeStyles } from "@material-ui/core";
import { resources } from "../../../resources/resources";

export default makeStyles(
  (theme) => ({
    root: {
      width: "100vw",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      height: "100vh",
      background: "#fff",
      backgroundImage: `url(${resources.poultry})`,
      backgroundAttachment: "fixed",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    },
    container: {
      flex: 1,
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background:
        "linear-gradient(0deg,rgba(0,0,0,0.25),rgba(0,0,0,0.5),rgba(0,0,0,0.25))",
    },
    form_container: {
      width: "35%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      minHeight: "40%",
      overflow: "hidden",
      [theme.breakpoints.down("sm")]: {
        width: "85%",
      },
      [theme.breakpoints.down("md")]: {
        width: "45%",
      },
    },
    header: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(1),
      background: "#00416a",
    },
    header_top: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    header_bottom: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },

    input_container: {
      width: "80%",
      padding: theme.spacing(0.5),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      alignSelf: "center",
      marginTop: theme.spacing(0.5),
    },
    input: {
      margin: theme.spacing(0.5, 0),
    },
    buttons_container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: theme.spacing(0.5),
      margin: theme.spacing(0.5, 0),
      width: "80%",
      alignSelf: "center",
    },
    button: {
      margin: theme.spacing(0.5, 0),
    },
    image_container: {
      width: 35,
      height: 35,
      overflow: "hidden",
    },
    header_title: {
      fontSize: theme.spacing(2.5),
      fontFamily: "Monda, sans-serif;",
      color: "#fff",
    },
  }),
  { index: 1 }
);
