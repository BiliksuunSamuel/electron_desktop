import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { ChevronLeft } from "@material-ui/icons";
import * as React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import colors from "../constants/colors";
import { SidebarMenu } from "../data/SidebarData";
import { resources } from "../resources/resources";
import { sidebar_styles } from "./style";

interface ISidebar {
  toggleSidebar: () => void;
  open: boolean;
}
export default function SideBar({ toggleSidebar, open }: ISidebar) {
  const classes = sidebar_styles();
  const location = useLocation();
  const navigation = useNavigate();
  return (
    <Drawer
      open={open}
      style={{
        width: 240,
        height: "100vh",
        overflow: "hidden",
      }}
      variant="persistent"
    >
      <Box className={classes.container}>
        <Box className={classes.sidebar_header}>
          <Box className={classes.title_container}>
            <Box className={classes.image_container}>
              <img src={resources.logo} className="img" alt="logo" />
            </Box>
            <Typography className={classes.sidebar_title} variant="caption">
              Feed Konzept
            </Typography>
          </Box>
          <IconButton onClick={toggleSidebar} size="small">
            <ChevronLeft htmlColor={colors.fff} />
          </IconButton>
        </Box>
        <Divider />
        <Box className={classes.sidebar_content}>
          <List className={classes.list}>
            {SidebarMenu.map((menu) => (
              <ListItem
                style={{
                  backgroundColor:
                    location.pathname === menu.route ? "#fff" : "transparent",
                }}
                key={menu.title}
                className={classes.listitem}
                divider
                button
                onClick={() => navigation(menu.route)}
              >
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.title} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Drawer>
  );
}
