import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Modal,
  Typography,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Close, Edit } from "@material-ui/icons";
import * as React from "react";
import Draggable from "react-draggable";
import { IOrderContent } from "../../../interface/IModel";
import { v4 as uuid } from "uuid";
const styles = makeStyles(
  (theme) => ({
    root: {
      width: "100%",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      zIndex: 1,
      overflow: "hidden",
    },
    container: {
      width: 350,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      borderStyle: "none",
      alignSelf: "center",
      outline: "none",
      paddingBottom: theme.spacing(4),
      overflow: "hidden",
    },

    body_container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: theme.spacing(1),
      outline: "none",
    },
    input_container: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      margin: theme.spacing(0.85, 0),
    },
    input: {
      height: 30,
      margin: theme.spacing(1, 0),
      width: "100%",
    },
    header: {
      padding: "5px 15px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      background: "linear-gradient(0deg,#e0eafc,#cfdef3)",
      height: 40,
      width: "100%",
    },
  }),
  { index: 1 }
);

interface IProps {
  content: IOrderContent[];
  open: boolean;
  handleOpen: () => void;
  setContent: (data: IOrderContent[]) => void;
}
export default function OrderContent({
  open,
  handleOpen,
  setContent,
  content,
}: IProps) {
  const classes = styles();
  const [dimensions, setDimensions] = React.useState<{
    width: number;
    height: number;
  }>({ width: 300, height: 300 });
  const [item, setItem] = React.useState<IOrderContent>({
    id: "",
    title: "",
    quantity: 0,
  });

  function HandleAdd() {
    if (Boolean(item.title.length > 0 && !isNaN(item.quantity))) {
      setContent([
        ...content,
        { id: uuid(), title: item.title, quantity: item.quantity },
      ]);
      setItem({ id: "", quantity: 0, title: "" });
    }
  }
  return (
    <Modal open={open} className={classes.root}>
      <Box
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          outline: "none",
          borderStyle: "none",
        }}
      >
        <Draggable>
          <Paper className={classes.container}>
            <Box className={classes.header}>
              <Typography
                className="title"
                style={{ fontSize: 18, marginLeft: 10 }}
                variant="caption"
              >
                Add Content
              </Typography>
              <IconButton
                onClick={handleOpen}
                style={{ marginRight: 8 }}
                size="small"
              >
                <Close />
              </IconButton>
            </Box>
            <Box className={classes.body_container}>
              {Boolean(content.length > 0) && (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="center">
                          <Edit />
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {content.map((c) => (
                        <TableRow key={c.id}>
                          <TableCell align="center">{c.title}</TableCell>
                          <TableCell align="center">{c.quantity}</TableCell>
                          <TableCell align="center">
                            <IconButton
                              onClick={() =>
                                setContent(
                                  content.filter((cc) => cc.id !== c.id)
                                )
                              }
                              size="small"
                            >
                              <Close htmlColor="red" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
              <Box>
                <TextField
                  className={classes.input}
                  variant="outlined"
                  size="small"
                  label="Title"
                  onChange={(e) => setItem({ ...item, title: e.target.value })}
                />
                <Box className={classes.input_container}>
                  <TextField
                    className={classes.input}
                    variant="outlined"
                    size="small"
                    label="Quantity"
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      setItem({ ...item, quantity: parseInt(e.target.value) })
                    }
                    style={{ flex: 1, margin: 0 }}
                  />
                  <Button
                    style={{
                      flex: 0.25,
                      height: 35,
                      marginLeft: 5,
                      alignSelf: "center",
                      marginTop: 8,
                    }}
                    onClick={HandleAdd}
                    variant="outlined"
                    size="small"
                    color="primary"
                  >
                    Add
                  </Button>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Draggable>
      </Box>
    </Modal>
  );
}
