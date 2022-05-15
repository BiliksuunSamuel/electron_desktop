import { Box } from "@material-ui/core";
import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ResponseDisplay } from "../../../components";

export default function EntryPage() {
  const navigation = useNavigate();

  React.useEffect(() => {
    navigation("login");
  }, []);
  return (
    <Box>
      <ResponseDisplay />
      <Outlet />
    </Box>
  );
}
