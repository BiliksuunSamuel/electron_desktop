import * as React from "react";
import {
  Box,
  Container,
  Divider,
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
          <Divider />
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 5,
              width: "100%",
            }}
          >
            <Typography
              variant="body2"
              style={{ marginRight: 5, textAlign: "left" }}
            >
              Name:
            </Typography>
            <Typography
              variant="body1"
              style={{ fontSize: 16, flex: 1, textAlign: "right" }}
            >
              {company.name}
            </Typography>
          </Box>
          <Divider />

          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 5,
              width: "100%",
            }}
          >
            <Typography
              variant="body2"
              style={{ marginRight: 5, textAlign: "left" }}
            >
              Phone:
            </Typography>
            <Typography
              variant="body2"
              style={{ fontSize: 16, flex: 1, textAlign: "right" }}
            >
              {company.tel}
            </Typography>
          </Box>
          <Divider />
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 5,
              width: "100%",
            }}
          >
            <Typography
              variant="body2"
              style={{ marginRight: 5, textAlign: "left" }}
            >
              Email:
            </Typography>
            <Typography
              variant="body2"
              style={{ fontSize: 16, flex: 1, textAlign: "right" }}
            >
              {company.email}
            </Typography>
          </Box>
          <Divider />
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 5,
              width: "100%",
            }}
          >
            <Typography
              variant="body2"
              style={{ marginRight: 5, textAlign: "left" }}
            >
              Address:
            </Typography>
            <Typography
              variant="body2"
              style={{ fontSize: 16, flex: 1, textAlign: "right" }}
            >
              {company.address}
            </Typography>
          </Box>
          <Divider />

          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 5,
              width: "100%",
            }}
          >
            <Typography
              variant="body2"
              style={{ marginRight: 5, textAlign: "left" }}
            >
              Motto:
            </Typography>
            <Typography
              variant="body2"
              style={{ fontSize: 16, flex: 1, textAlign: "right" }}
            >
              {company.motto}
            </Typography>
          </Box>
          <Divider />
        </Paper>
      </Box>
    </Container>
  );
}
