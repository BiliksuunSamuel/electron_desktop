import { Box } from "@material-ui/core";
import * as React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { GetAccountsThunk } from "../../../functions/accounts";
import { GetOrdersThunk } from "../../../functions/order";
import { Navbar, Sidebar } from "../../../shared";
import BackupOrdersModal from "../components/BackupOrdersModal";
import { home_styles } from "../style";

export default function HomePage() {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const classes = home_styles();
  const { online } = useAppSelector((state) => state.SettingsReducer);
  const { user } = useAppSelector((state) => state.UserReducer);
  const [sidebar, setSidebar] = React.useState(true);
  const [backup, setBackup] = React.useState<boolean>(false);
  React.useEffect(() => {
    navigation("/home/request/new");
    if (online) {
      dispatch(GetOrdersThunk());
    }
    dispatch(GetAccountsThunk());
  }, []);
  React.useEffect(() => {
    if (!user) {
      navigation("/");
    }
  }, [user]);
  return (
    <Box className={classes.root}>
      <BackupOrdersModal open={backup} handleModal={() => setBackup(!backup)} />
      <Box
        style={{
          transition: "all 0.45s ease-in-out",
          width: sidebar ? 240 : 0,
        }}
      >
        <Sidebar open={sidebar} toggleSidebar={() => setSidebar(!sidebar)} />
      </Box>
      <Box className={classes.container}>
        <Navbar
          handleBackup={() => setBackup(!backup)}
          toggleSidebar={() => setSidebar(!sidebar)}
          open={sidebar}
        />
        <Box style={{ marginTop: 60, flex: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
