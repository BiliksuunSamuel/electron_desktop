import * as React from "react";
import Router from "./router/Router";
import "../index.css";
import { Loader } from "./components";
import { useAppDispatch, useAppSelector } from "./app/hook";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClearResponse } from "./features/slice/ResponseSlice";
export default function App() {
  const { loading } = useAppSelector((state) => state.ResponseReducer);
  const { error, message } = useAppSelector((state) => state.ResponseReducer);
  const dispatch = useAppDispatch();

  function HandleNotifier() {
    Boolean(message) &&
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "dark",
        onClose: () => {
          dispatch(ClearResponse());
        },
      });

    Boolean(error) &&
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "dark",
        onClose: () => {
          dispatch(ClearResponse());
        },
      });
  }
  return (
    <React.Fragment>
      <Loader open={loading} />
      {Boolean(error || message) && HandleNotifier()}

      <ToastContainer draggable={true} autoClose={3000} />
      <Router />
    </React.Fragment>
  );
}
