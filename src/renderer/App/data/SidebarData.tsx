import { InfoOutlined, ShoppingBasket } from "@material-ui/icons";
import * as React from "react";
import { MdCheck, MdDesignServices, MdPending } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
export const SidebarMenu: {
  title: string;
  icon: React.ReactElement;
  route: string;
}[] = [
  { title: "Request", icon: <ShoppingBasket />, route: "/home/request/new" },
  {
    title: "Pending",
    icon: <MdPending size={24} />,
    route: "/home/request/pending",
  },
  {
    title: "Approved",
    icon: <MdCheck size={24} />,
    route: "/home/request/approved",
  },
  {
    title: "Services",
    icon: <MdDesignServices size={24} />,
    route: "/home/services",
  },
  { title: "Users", icon: <FaUsers size={24} />, route: "/home/users" },
  { title: "About", icon: <InfoOutlined />, route: "/home/about" },
];
