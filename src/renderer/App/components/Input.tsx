import { makeStyles, TextField } from "@material-ui/core";
import * as React from "react";

const styles = makeStyles(
  (theme) => ({
    root: {
      width: "100%",
      margin: theme.spacing(1, 0),
      height: 35,
    },
  }),
  { index: 1 }
);

interface IProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  size?: any;
  variant?: any;
  value?: any;
  type?: any;
  multiline?: boolean;
}
export default function Input({
  handleChange,
  label,
  variant,
  size,
  value,
  type,
  multiline,
}: IProps) {
  const classes = styles();
  return (
    <TextField
      className={classes.root}
      variant={variant ? variant : "outlined"}
      size={size ? size : "small"}
      onChange={handleChange}
      label={label}
      value={value}
      type={type ? type : "text"}
      multiline={multiline ? multiline : false}
    />
  );
}
