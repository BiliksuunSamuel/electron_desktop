import * as React from "react";
import { Route, useNavigate } from "react-router-dom";
import { EntryPage, LoginPage, RegisterPage } from "../pages/auth/views";
export default function AuthRouter() {
  return (
    <Route path="/" element={<EntryPage />}>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
    </Route>
  );
}
