import * as React from "react";
import { useAppSelector } from "../app/hook";
import { Alert } from "react-bootstrap";
export default function ResponseDisplay() {
  const { error, message } = useAppSelector((state) => state.ResponseReducer);

  return (
    <Alert
      variant={message ? "success" : error ? "error" : "light"}
      show={Boolean(error || message)}
    >
      {Error}
    </Alert>
  );
}
