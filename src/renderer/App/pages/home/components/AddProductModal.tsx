import {
  Box,
  Button,
  IconButton,
  makeStyles,
  Modal,
  TextField,
  Typography,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { InitialProductInfo } from "../../../data/ModelData";
import { ResponseFail } from "../../../features/slice/ResponseSlice";
import {
  AddProductThunk,
  UpdateProductThunk,
} from "../../../functions/products";
import { IProduct } from "../../../interface/IModel";
import { ValidateProductInfo } from "../services/services";

interface IProps {
  open: boolean;
  handleOpen: () => void;
  product?: IProduct;
}

const styles = makeStyles(
  (theme) => ({
    root: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
    },
    container: {
      width: 400,
      padding: 0,
      margin: 0,
      alignSelf: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      borderRadius: 0,
      boxShadow: theme.shadows[1],
      [theme.breakpoints.down("sm")]: {
        width: "90%",
      },
      background: "rgba(255,255,255,0.85)",
      outline: "none",
      borderStyle: "none",
    },
    header: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      justifyContent: "space-between",
      padding: theme.spacing(1),
    },
    header_left: {
      flex: 1,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    header_right: {
      margin: theme.spacing(0, 1),
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    body: {
      padding: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      width: "100%",
    },
    input: {
      margin: theme.spacing(1, 0),
      width: "100%",
    },
    button: {
      margin: theme.spacing(0.5, 0),
    },
  }),
  { index: 1 }
);
export default function AddProductModal({ open, handleOpen, product }: IProps) {
  const classes = styles();
  const dispatch = useAppDispatch();
  const [info, setInfo] = React.useState<IProduct>(
    product
      ? { name: product.name, unit_cost: product.unit_cost, _id: product._id }
      : InitialProductInfo
  );

  React.useEffect(() => {
    if (product) {
      setInfo(product);
    }
  }, [product]);
  const { loading } = useAppSelector((state) => state.ResponseReducer);
  function HandleAddProduct() {
    try {
      ValidateProductInfo(info);
      if (product) {
        dispatch(UpdateProductThunk(info));
      } else {
        dispatch(AddProductThunk(info));
        setInfo(InitialProductInfo);
      }
    } catch (error) {
      dispatch(ResponseFail(error));
    }
  }
  return (
    <Modal className={classes.root} open={open}>
      <Box className={classes.container}>
        <Box className={classes.header}>
          <Box className={classes.header_left}>
            <Typography variant="body1">Product Info</Typography>
          </Box>
          <Box className={classes.header_right}>
            <IconButton onClick={handleOpen} size="small">
              <Close />
            </IconButton>
          </Box>
        </Box>
        <Box className={classes.body}>
          <TextField
            variant="outlined"
            className={classes.input}
            size="small"
            label="Product Name"
            value={info.name}
            onChange={(e) => setInfo({ ...info, name: e.target.value })}
          />
          <TextField
            variant="outlined"
            className={classes.input}
            size="small"
            label="Unit Cost"
            type="number"
            value={info.unit_cost === 0 ? "" : info.unit_cost}
            onChange={(e) => {
              if (!isNaN(parseFloat(e.target.value))) {
                setInfo({ ...info, unit_cost: parseFloat(e.target.value) });
              } else {
                setInfo({ ...info, unit_cost: 0 });
              }
            }}
          />
          <Button
            onClick={HandleAddProduct}
            variant="contained"
            size="small"
            className={classes.button}
            color="primary"
            disabled={loading}
          >
            {product ? "Update Info" : "Save Product"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
