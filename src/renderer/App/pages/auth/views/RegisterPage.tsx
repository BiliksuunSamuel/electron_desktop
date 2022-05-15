import { Box, Button, Paper, TextField, Typography } from "@material-ui/core";
import * as React from "react";
import Draggable from "react-draggable";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { ResponseFail } from "../../../features/slice/ResponseSlice";
import { RegisterThunk } from "../../../functions";
import { IUser } from "../../../interface/IModel";
import { resources } from "../../../resources/resources";
import { ValidateUserInfo } from "../../../services/Validation";
import { register_styles } from "../styles";

export default function RegisterPage() {
  const classes = register_styles();
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.ResponseReducer);
  const [info, setInfo] = React.useState<{
    phone: string;
    password: string;
    username: string;
  }>({
    username: "",
    phone: "",
    password: "",
  });
  const { user } = useAppSelector((state) => state.UserReducer);
  React.useEffect(() => {
    if (user) {
      navigation("/home");
    }
  }, [user]);

  function HandleRegister() {
    try {
      ValidateUserInfo(info);
      dispatch(RegisterThunk(info));
    } catch (error) {
      dispatch(ResponseFail(error));
    }
  }
  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Draggable>
          <Paper className={classes.form_container} elevation={1}>
            <Box className={classes.header}>
              <Box className={classes.header_top}>
                <Box className={classes.image_container}>
                  <img src={resources.key} className="img" alt="key" />
                </Box>
                <Typography
                  style={{ fontFamily: "thematesh" }}
                  className={classes.header_title}
                  variant="caption"
                >
                  Feed Konzept
                </Typography>
              </Box>
              <Box className={classes.header_bottom}>
                <Typography
                  variant="caption"
                  className="title"
                  style={{ color: "#fff", fontSize: 14 }}
                >
                  Register
                </Typography>
              </Box>
            </Box>
            <Box className={classes.input_container}>
              <TextField
                variant="outlined"
                size="small"
                label="Username"
                placeholder="Username"
                fullWidth
                className={classes.input}
                onChange={(e) => setInfo({ ...info, username: e.target.value })}
              />
              <TextField
                variant="outlined"
                size="small"
                label="PhoneNumber"
                placeholder="PhoneNumber"
                fullWidth
                className={classes.input}
                onChange={(e) => setInfo({ ...info, phone: e.target.value })}
              />
              <TextField
                variant="outlined"
                size="small"
                label="Password"
                type="password"
                placeholder="Password"
                fullWidth
                className={classes.input}
                onChange={(e) => setInfo({ ...info, password: e.target.value })}
              />
            </Box>
            <Box className={classes.buttons_container}>
              <Button
                variant="contained"
                size="small"
                color="primary"
                fullWidth
                onClick={HandleRegister}
                className={classes.button}
              >
                Submit
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="default"
                fullWidth
                style={{ textTransform: "none" }}
                className={classes.button}
                onClick={() => navigation("/login")}
              >
                already Registered?
              </Button>
            </Box>
          </Paper>
        </Draggable>
      </Box>
    </Box>
  );
}
