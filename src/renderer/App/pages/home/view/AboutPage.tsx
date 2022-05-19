import * as React from "react";
import {
  Box,
  Container,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import { about_styles } from "../style";
import { EditOutlined } from "@material-ui/icons";
import { CustomerInfoModal } from "../components";
import { resources } from "../../../resources/resources";
import { useAppSelector } from "../../../app/hook";
export default function AboutPage() {
  const classes = about_styles();
  const [open, setOpen] = React.useState(false);
  const { company } = useAppSelector((state) => state.CompanyInfoReducer);
  return (
    <Container className={classes.root}>
      <CustomerInfoModal open={open} handleClose={() => setOpen(false)} />
      <Paper className={classes.header}>
        <Typography
          style={{ flex: 1, textAlign: "center", marginRight: 10 }}
          variant="body1"
          className={classes.header_title}
        >
          Business Details
        </Typography>
        <Box style={{ alignSelf: "flex-end", marginRight: 20, flex: 0.15 }}>
          <IconButton onClick={() => setOpen(true)} size="small">
            <EditOutlined />
          </IconButton>
        </Box>
      </Paper>
      <Box className={classes.content}>
        <Paper className={classes.info_container} elevation={1}>
          <Box className={classes.image_container}>
            <img src={resources.house} className="img" />
          </Box>
          <Typography variant="body1" style={{ fontSize: 16, margin: "5px 0" }}>
            {company.name}
          </Typography>
          <Typography variant="body2">{company.tel}</Typography>
          <Typography variant="body2">{company.email}</Typography>
          <Typography variant="body2">{company.address}</Typography>
          <Typography variant="body2">{company.motto}</Typography>
        </Paper>
      </Box>
    </Container>
  );
}
