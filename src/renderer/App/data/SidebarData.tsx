import {
  History,
  InfoOutlined,
  ShoppingBasket,
  Storefront,
} from "@material-ui/icons";
import * as React from "react";
import { MdAccountCircle, MdHistory } from "react-icons/md";
import { FaUsers, FaChartLine } from "react-icons/fa";
export const SidebarMenu: {
  title: string;
  icon: React.ReactElement;
  route: string;
}[] = [
  { title: "Services", icon: <FaChartLine />, route: "/home/services/track" },
  { title: "Request", icon: <ShoppingBasket />, route: "/home/request/new" },
  { title: "Products", icon: <Storefront />, route: "/home/products" },
  {
    title: "History",
    icon: <MdHistory size={20} />,
    route: "/home/services",
  },
  // { title: "Users", icon: <FaUsers size={20} />, route: "/home/users" },
  {
    title: "Profile",
    icon: <MdAccountCircle size={20} />,
    route: "/home/profile",
  },
  { title: "About", icon: <InfoOutlined />, route: "/home/about" },
];
