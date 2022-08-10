import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteUser, loadUsers } from "../redux/action";
import "../App.css";
import { Link } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#5956E9",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  const users = useSelector((state) => state.data);

  const handelDelete = (id) => {
    if (window.confirm("Are you sure you wanted to delete the user")) {
      dispatch(deleteUser(id));
      dispatch(loadUsers());
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} lg={8}>
      <Typography
            className="add_user_heading"
            fontWeight={600}
            fontSize={25}
            textAlign={"center"}
          >
            Thunk&nbsp;Crud
          </Typography>
        <Link style={{ textDecoration: "none" }} to="/addUser">
          <Button className="add_user_btn" variant="contained">
            Add User
          </Button>
        </Link>
        <TableContainer component={Paper} sx={{ marginTop: "100px" }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">Contact</StyledTableCell>
                <StyledTableCell align="center">Address</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users &&
                users.users.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.email}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {row.contact}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.address}
                    </StyledTableCell>
                    <StyledTableCell align="center">
               
                      <Button
                        className="del_btn"
                        onClick={() => handelDelete(row.id)}
                      >
                        Delete
                      </Button>
                      &nbsp;&nbsp;&nbsp;&nbsp;
             <Link to={`/editUser/${row.id}`}>
                      <Button className="edit_btn">&nbsp;Edit</Button></Link>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
