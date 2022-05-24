import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import * as React from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hook";
import { IUser } from "../../../interface/IModel";
import { profile_styles } from "../style";
import { InitialUserInfo } from "../../../data/ModelData";
import { ResponseFail } from "../../../features/slice/ResponseSlice";
import {
  ChangePasswordThunk,
  UpdateInfoThunk,
} from "../../../functions/accounts";
import { ValidateAccountInfo, ValidatePassword } from "../services/services";
export default function ProfilePage() {
  const classes = profile_styles();
  const { user } = useAppSelector((state) => state.UserReducer);
  const [passInfo, setPassInfo] = React.useState<{
    password: string;
    comfirm_password: string;
  }>({ password: "", comfirm_password: "" });
  const dispatch = useAppDispatch();
  const [info, setInfo] = React.useState<IUser>(user ? user : InitialUserInfo);
  return (
    <Container className={classes.root}>
      <Box className={classes.header}>
        <Typography variant="body1">Update Account Info</Typography>
      </Box>
      <Container className={classes.content}>
        <Box component={Paper} className={classes.info_container}>
          <TextField
            variant="outlined"
            size="small"
            label="Username"
            className={classes.input}
            value={info.username}
            onChange={(e) => setInfo({ ...info, username: e.target.value })}
          />
          <TextField
            variant="outlined"
            size="small"
            label="Phone Number"
            className={classes.input}
            value={info.phone}
            onChange={(e) => setInfo({ ...info, phone: e.target.value })}
          />
          <Button
            variant="contained"
            size="small"
            color="primary"
            className={classes.button}
            onClick={() => {
              try {
                ValidateAccountInfo(info);
                dispatch(UpdateInfoThunk(info));
              } catch (error) {
                dispatch(ResponseFail(error));
              }
            }}
          >
            Save Changes
          </Button>
        </Box>
        <Box component={Paper} className={classes.password_container}>
          <TextField
            variant="outlined"
            className={classes.input}
            label="New Password"
            size="small"
            type="password"
            value={passInfo.password}
            onChange={(e) =>
              setPassInfo({ ...passInfo, password: e.target.value })
            }
          />
          <TextField
            variant="outlined"
            className={classes.input}
            label="Confirm Password"
            size="small"
            type="password"
            value={passInfo.comfirm_password}
            onChange={(e) =>
              setPassInfo({ ...passInfo, comfirm_password: e.target.value })
            }
          />
          <Button
            variant="outlined"
            size="small"
            color="primary"
            className={classes.button}
            onClick={() => {
              try {
                ValidatePassword(passInfo);
                dispatch(
                  ChangePasswordThunk({
                    id: user ? user.auth_id : "",
                    password: passInfo.password,
                  })
                );
              } catch (error) {
                dispatch(ResponseFail(error));
              }
            }}
          >
            Change Password
          </Button>
        </Box>
      </Container>
    </Container>
  );
}
