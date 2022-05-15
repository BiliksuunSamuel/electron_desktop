import { Box, Button, Paper, TextField, Typography } from "@material-ui/core";
import * as React from "react";
import Draggable from "react-draggable";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { LoginThunk } from "../../../functions";
import { resources } from "../../../resources/resources";
import { login_styles } from "../styles";

export default function LoginPage() {
  const classes = login_styles();
  const navigation = useNavigate();
  const { user } = useAppSelector((state) => state.UserReducer);
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.ResponseReducer);
  const [info, setInfo] = React.useState<{ phone: string; password: string }>({
    phone: "",
    password: "",
  });

  React.useEffect(() => {
    if (user) {
      navigation("/home");
    }
  }, [user]);

  function handleLogin() {
    dispatch(LoginThunk(info));
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
                  Login
                </Typography>
              </Box>
            </Box>
            <Box className={classes.input_container}>
              <TextField
                variant="outlined"
                size="small"
                label="PhoneNumber"
                placeholder="PhoneNumber"
                fullWidth
                className={classes.input}
                value={info.phone}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleLogin();
                  }
                }}
                onChange={(e) => setInfo({ ...info, phone: e.target.value })}
              />
              <TextField
                variant="outlined"
                size="small"
                label="Password"
                type="password"
                placeholder="Password"
                fullWidth
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleLogin();
                  }
                }}
                value={info.password}
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
                className={classes.button}
                onClick={handleLogin}
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
                onClick={() => navigation("/register")}
              >
                don't have Account?
              </Button>
            </Box>
          </Paper>
        </Draggable>
      </Box>
    </Box>
  );
}
