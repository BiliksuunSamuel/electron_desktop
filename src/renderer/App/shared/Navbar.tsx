import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Switch,
  Toolbar,
  Typography,
} from "@material-ui/core";
import * as Icons from "@material-ui/icons";
import { AccountCircle, Menu, Warning } from "@material-ui/icons";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { AccountMenu } from "../components";
import colors from "../constants/colors";
import { SetNetworkState } from "../features/slice/SettingsSlice";
import { appbar_styles } from "./style";

interface IAppbar {
  open: boolean;
  toggleSidebar: () => void;
  handleBackup: () => void;
}
export default function Navbar({ open, toggleSidebar, handleBackup }: IAppbar) {
  const classes = appbar_styles();
  const { online } = useAppSelector((state) => state.SettingsReducer);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const { orders } = useAppSelector((state) => state.OrdersReducer);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar
      position="fixed"
      style={{ paddingLeft: open ? 250 : 0 }}
      color="primary"
      className={classes.appbar}
    >
      <AccountMenu
        anchorEl={anchorEl}
        open={menuOpen}
        handleClose={handleClose}
      />
      <Toolbar className={classes.toolbar}>
        <Box className={classes.toolbar_left}>
          <Icons.NetworkCellOutlined
            style={{ margin: "4px 8px" }}
            htmlColor={online ? "seagreen" : "firebrick"}
            fontSize="small"
          />
          <Typography
            style={{ fontSize: 16 }}
            variant="caption"
            className="title"
          >
            {online ? "Database Connected" : "Connection Offline"}
          </Typography>
        </Box>
        <Box className={classes.toolbar_right}>
          {Boolean(!open) && (
            <IconButton onClick={toggleSidebar} size="small">
              <Menu htmlColor={colors._076585} />
            </IconButton>
          )}
          {Boolean(orders.filter((order) => order._id === "").length > 0) && (
            <IconButton onClick={handleBackup} size="medium">
              <Warning htmlColor="firebrick" />
              <Badge
                style={{ fontSize: 16 }}
                badgeContent={orders.filter((order) => order._id === "").length}
              />
            </IconButton>
          )}
          <IconButton
            style={{ marginLeft: 10 }}
            onClick={handleClick}
            size="small"
          >
            <AccountCircle htmlColor={colors._076585} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
