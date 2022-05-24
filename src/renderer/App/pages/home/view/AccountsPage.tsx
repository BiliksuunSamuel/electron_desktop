import {
  Box,
  Container,
  Divider,
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
import { InfoOutlined } from "@material-ui/icons";
import * as React from "react";
import Draggable from "react-draggable";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { AccountReview } from "../../../components";
import { GetAccountsThunk } from "../../../functions/accounts";
import { IUser } from "../../../interface/IModel";
import { resources } from "../../../resources/resources";
import { accounts_styles, global_styles } from "../style";
export default function AccountsPage() {
  const classes = accounts_styles();
  const { accounts } = useAppSelector((state) => state.AccountsReducer);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.UserReducer);
  const global = global_styles();
  const [info, setInfo] = React.useState<IUser | null>(null);
  React.useEffect(() => {
    dispatch(GetAccountsThunk());
  }, []);
  return (
    <Container className={classes.root}>
      {info && (
        <AccountReview
          user={info}
          handleClose={() => setInfo(null)}
          open={Boolean(info)}
        />
      )}
      <Box className={classes.header}>
        <Box className={classes.header_content}>
          <Box className={classes.image_container}>
            <img src={resources.users} alt="users" className="img" />
          </Box>
          <Typography style={{ fontSize: 18, color: "#000" }} variant="body1">
            Feed Konzept Users
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box className={classes.content}>
        <Draggable>
          <TableContainer className={classes.table_container} component={Paper}>
            <Table>
              <TableHead>
                <TableRow className={global.grid_cell}>
                  <TableCell className={global.grid_cell} align="center">
                    Username
                  </TableCell>
                  <TableCell className={global.grid_cell} align="center">
                    PhoneNumber
                  </TableCell>
                  <TableCell className={global.grid_cell} align="center">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user &&
                  accounts
                    .filter((ac) => ac._id !== user._id)
                    .map((account) => (
                      <TableRow className={global.grid_cell} key={account._id}>
                        <TableCell className={global.grid_cell} align="center">
                          {account.username}
                        </TableCell>
                        <TableCell className={global.grid_cell} align="center">
                          {account.phone}
                        </TableCell>
                        <TableCell align="center" className={global.grid_cell}>
                          <IconButton
                            onClick={() => setInfo(account)}
                            size="small"
                          >
                            <InfoOutlined />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Draggable>
      </Box>
    </Container>
  );
}
