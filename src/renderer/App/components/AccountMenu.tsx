import { Menu, MenuItem, Switch } from "@material-ui/core";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { SetNetworkState } from "../features/slice/SettingsSlice";
import { Logout } from "../features/slice/UserSlice";

interface IAccountMenu {
  open: boolean;
  anchorEl: HTMLElement | null;
  handleClose: () => void;
}
export default function AccountMenu({
  open,
  handleClose,
  anchorEl,
}: IAccountMenu) {
  const dispatch = useAppDispatch();
  const { online } = useAppSelector((state) => state.SettingsReducer);
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <MenuItem onClick={handleClose}>Profile</MenuItem>
      <MenuItem
        onClick={() => {
          handleClose();
          dispatch(Logout());
        }}
      >
        Logout
      </MenuItem>
      <MenuItem>
        <Switch
          checked={online}
          onClick={() => dispatch(SetNetworkState(!online))}
        />
      </MenuItem>
    </Menu>
  );
}
