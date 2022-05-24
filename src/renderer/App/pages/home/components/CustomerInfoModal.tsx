import { Box, Button, Modal, Paper, makeStyles } from "@material-ui/core";
import * as React from "react";
import { CompanyInfo } from "../../../data/ModelData";
import { ICompanyInfo } from "../../../interface/IModel";
import { Input } from "../../../components";
import { useAppDispatch } from "../../../app/hook";
import { SetCompanyInfoThunk } from "../../../functions";

interface IProps {
  open: boolean;
  handleClose: () => void;
}

const styles = makeStyles(
  (theme) => ({
    root: {
      width: "100%",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      overflow: "hidden",
      outline: "none",
      borderStyle: "none",
    },
    container: {
      width: 300,
      borderRadius: 0,
      margin: 0,
      outline: "none",
      borderStyle: "none",
      background: "#fff",
      boxShadow: theme.shadows[1],
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      overflow: "hidden",
    },
    header: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      overflow: "hidden",
      padding: theme.spacing(1),
    },
    input_container: {
      width: "90%",
      alignItems: "center",
      alignSelf: "center",
      margin: theme.spacing(0.5, 0),
    },
    buttons_container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      width: "100%",
      alignSelf: "center",
      margin: theme.spacing(1, 0),
    },
  }),
  { index: 1 }
);
export default function CustomerInfoModal({ open, handleClose }: IProps) {
  const [info, setInfo] = React.useState<ICompanyInfo>(CompanyInfo);
  const classes = styles();
  const dispatch = useAppDispatch();
  return (
    <Modal open={open} className={classes.root}>
      <Paper className={classes.container}>
        <Box className={classes.header}></Box>
        <Box className={classes.input_container}>
          <Input
            handleChange={(e) => setInfo({ ...info, name: e.target.value })}
            label="Name"
            value={info.name}
          />
          <Input
            handleChange={(e) => setInfo({ ...info, address: e.target.value })}
            label="Address"
            value={info.address}
          />
          <Input
            handleChange={(e) => setInfo({ ...info, tel: e.target.value })}
            label="Telephone"
            value={info.tel}
          />
          <Input
            handleChange={(e) => setInfo({ ...info, email: e.target.value })}
            label="Email"
            value={info.email}
          />
          <Input
            handleChange={(e) => setInfo({ ...info, motto: e.target.value })}
            label="Motto"
            value={info.motto}
          />
          <Box style={{ width: "100%" }} className={classes.buttons_container}>
            <Button
              onClick={() => dispatch(SetCompanyInfoThunk(info))}
              style={{ width: "100%", margin: "5px,0" }}
              variant="contained"
              size="small"
              color="primary"
            >
              Save Changes
            </Button>
            <Button
              style={{ width: "100%", marginTop: 8 }}
              onClick={handleClose}
              variant="outlined"
              size="small"
              color="secondary"
            >
              Close
            </Button>
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
}
