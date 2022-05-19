import { Box, makeStyles, Paper, Typography } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { Send } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import * as React from "react";
import Draggable from "react-draggable";
import colors from "../constants/colors";
import { v4 as uuid } from "uuid";
import { INote } from "../interface/IModel";
const styles = makeStyles(
  (theme) => ({
    container: {
      position: "absolute",
      zIndex: 2,
      top: 50,
      right: "inherit",
      borderRadius: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      background: `linear-gradient(180deg,${colors._00416a},#e4e5e6,#f5f5f5,#fff)`,
      boxShadow: theme.shadows[3],
      width: 250,
      overflow: "hidden",
    },
    header: {
      padding: theme.spacing(1),
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    add_note_container: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(0.5),
    },
    notes_container: {
      width: "100%",
      padding: theme.spacing(0.5),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
    },
  }),
  { index: 1 }
);

interface IProps {
  notes: INote[];
  note: INote;
  handleNotes: (data: INote[]) => void;
}
export default function StickyNote({ notes, note, handleNotes }: IProps) {
  const classes = styles();
  const [Note, setNote] = React.useState<INote>({ id: "", text: "" });

  return (
    <Draggable>
      <Paper className={classes.container}>
        <Box className={classes.header}>
          <Typography
            variant="caption"
            style={{ fontSize: 16, fontFamily: "thematesh", color: "#fff" }}
          >
            Note
          </Typography>
          <Edit htmlColor="#fff" />
        </Box>
        <Box className={classes.notes_container}>
          <Box style={{ width: "90%", alignSelf: "center", padding: 5 }}>
            <ol>
              {notes.map((n) => (
                <li key={n.id}>
                  <Typography style={{ textAlign: "justify" }} variant="body2">
                    {n.text}
                  </Typography>
                </li>
              ))}
            </ol>
          </Box>
        </Box>
        <Box className={classes.add_note_container}>
          <TextField
            color="primary"
            variant="standard"
            size="small"
            label="note..."
            style={{ color: "#fff" }}
            onChange={(e) => {
              if (e.target.value.length > 0) {
                setNote({ id: uuid(), text: e.target.value });
              }
            }}
          />
          <IconButton
            onClick={() => {
              Boolean(Note) && handleNotes([...notes, Note]);
            }}
            color="default"
            size="small"
          >
            <Send />
          </IconButton>
        </Box>
      </Paper>
    </Draggable>
  );
}
