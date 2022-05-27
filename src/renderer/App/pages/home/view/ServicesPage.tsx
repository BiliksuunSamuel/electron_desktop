import {
  Box,
  Button,
  Container,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import moment = require("moment");
import * as React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { Months, Years } from "../../../data/ModelData";
import { GetOrdersThunk } from "../../../functions/order";
import { PrepareBarchartData } from "../services/prepareChartData";
import { services_styles } from "../style";

export default function ServicesPage() {
  const classes = services_styles();
  const dispatch = useAppDispatch();
  const [year, setYear] = React.useState(moment(Date.now()).format("YYYY"));
  const { orders } = useAppSelector((state) => state.OrdersReducer);

  React.useEffect(() => {
    dispatch(GetOrdersThunk());
  }, []);
  return (
    <Container className={classes.root}>
      <Box className={classes.header}>
        <Typography variant="body1">Service Monitor </Typography>
        <Box className={classes.header_right}>
          <Button
            size="small"
            variant="text"
            style={{ textTransform: "none", marginRight: 20 }}
            onClick={() => dispatch(GetOrdersThunk())}
          >
            Refresh
          </Button>
          <TextField
            variant="outlined"
            size="small"
            className={classes.input}
            select
            label="Year"
            onChange={(e) => setYear(e.target.value)}
          >
            {Years().map((y) => (
              <MenuItem value={y} key={y}>
                {y}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>
      <Container className={classes.main_content_container}>
        <Box className={classes.chart_container}>
          <AreaChart
            width={730}
            height={250}
            style={{ alignSelf: "center" }}
            margin={{ left: 10, top: 10, bottom: 10, right: 10 }}
            data={PrepareBarchartData(orders, year)}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="total"
              stroke="#1a237e"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="paid"
              stroke="#097969"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="arrears"
              stroke="#b22222"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
          </AreaChart>
        </Box>
        <Box className={classes.chart_container}>
          <BarChart
            height={250}
            width={730}
            style={{ alignSelf: "center" }}
            margin={{ left: 10, top: 10, bottom: 10, right: 10 }}
            data={PrepareBarchartData(orders, year)}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="paid" fill="#097969" />
            <Bar dataKey="total" fill="#1a237e" />
            <Bar dataKey="arrears" fill="#b22222" />
          </BarChart>
        </Box>
      </Container>
    </Container>
  );
}
