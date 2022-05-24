import {
  Box,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { EditOutlined } from "@material-ui/icons";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { currency } from "../../../constants/constants";
import { InitialProductInfo } from "../../../data/ModelData";
import { GetProductsThunk } from "../../../functions/products";
import { IProduct } from "../../../interface/IModel";
import { AddProductModal } from "../components";
import { products_styles } from "../style";
import { FaEdit } from "react-icons/fa";
export default function ProductsPage() {
  const classes = products_styles();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.ProductsReducer);
  const [open, setOpen] = React.useState(false);
  const [product, setProduct] = React.useState<IProduct | null>(null);
  React.useEffect(() => {
    dispatch(GetProductsThunk());
  }, []);
  return (
    <Container className={classes.root}>
      <AddProductModal
        product={product}
        open={open}
        handleOpen={() => {
          setProduct(null);
          setOpen(false);
        }}
      />
      <Box className={classes.header}>
        <Box className={classes.header_left}>
          <Typography variant="body1">Products</Typography>
        </Box>
        <Box className={classes.header_right}>
          <IconButton onClick={() => setOpen(true)} size="small">
            <EditOutlined />
          </IconButton>
        </Box>
      </Box>
      <Container>
        <TableContainer component={Paper} elevation={1}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Product Name</TableCell>
                <TableCell align="center">Unit Cost</TableCell>
                <TableCell align="center">Review</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p._id}>
                  <TableCell align="left">{p.name}</TableCell>
                  <TableCell align="center">{currency + p.unit_cost}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => {
                        setProduct(p);
                        setOpen(true);
                      }}
                      size="small"
                    >
                      <FaEdit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Container>
  );
}
