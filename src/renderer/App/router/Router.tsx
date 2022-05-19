import * as React from "react";
import { BrowserRouter, Routes, HashRouter } from "react-router-dom";
import AuthRouter from "./AuthRouter";
import HomeRouter from "./HomeRouter";

export default function Router() {
  return (
    <HashRouter>
      <Routes>
        {AuthRouter()}
        {HomeRouter()}
      </Routes>
    </HashRouter>
  );
}
