import * as React from "react";
import { Route } from "react-router-dom";
import {
  AboutPage,
  AccountsPage,
  ApprovedOrdersPage,
  HomePage,
  OrdersPage,
  PendingOrdersPage,
  ProductsPage,
  ProfilePage,
  ServicesPage,
} from "../pages/home/view";
import NewRequest from "../pages/home/view/NewRequest";
export default function HomeRouter() {
  return (
    <Route path="/home" element={<HomePage />}>
      <Route path="/home/request/new" element={<NewRequest />} />
      <Route path="/home/products" element={<ProductsPage />} />
      <Route path="/home/request/pending" element={<PendingOrdersPage />} />
      <Route path="/home/request/approved" element={<ApprovedOrdersPage />} />
      <Route path="/home/services" element={<OrdersPage />} />
      <Route path="/home/users" element={<AccountsPage />} />
      <Route path="/home/about" element={<AboutPage />} />
      <Route path="/home/profile" element={<ProfilePage />} />
      <Route path="/home/services/track" element={<ServicesPage />} />
    </Route>
  );
}
