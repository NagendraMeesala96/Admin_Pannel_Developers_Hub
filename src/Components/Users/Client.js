import * as React from "react";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import SideBar from "../SideBar/SideBar";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import AddClient from "./AddClient";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import Spinner from "react-bootstrap/Spinner";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";

const columns = [
  { id: "S.No", label: "S.No", minWidth: 120 },
  { id: "_id", label: "ID", minWidth: 120 },
  { id: "FullName", label: "Name", minWidth: 50 },
  {
    id: "Mobile",
    label: "Mobile Num",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Email",
    label: "Email",
    minWidth: 170,
    align: "center",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "center",
  },
];

//const rows = [];

export default function Client() {
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      onClick={handleClick}
    >
      Dashboard
    </Link>,
    <Typography>Users</Typography>,
    <Typography key="3" color="text.primary">
      Clients
    </Typography>,
  ];

  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
  const navigate = useNavigate();

  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [loading, setLoading] = useState(true);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    axios
      .get("https://developershubbackend.herokuapp.com/allClients", {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setRows(res.data.reverse());
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  //Profile

  const profileHandler = (id) => {
    navigate(`/ClientProfile/Client/${id}`);
  };

  //Delete Client
  const deleteEmployee = (id) => {
    axios
      .delete(`https://developershubbackend.herokuapp.com/client/${id}`)
      .then((res) => {
        alert("Client Deleted");
        window.location.reload();
      })
      .catch((err) => {
        alert(err.response.data);
        console.log(err.response.data);
      });
  };
  return (
    <React.Fragment>
      <Row>
        <Col sm={3} xs={3}>
          <SideBar />
        </Col>
        <Col sm={9} xs={9}>
          <div className="content mt-5">
            <Stack spacing={2}>
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
              >
                {breadcrumbs}
              </Breadcrumbs>
            </Stack>
            <Row className="mt-5">
              <Col sm={9} className="d-flex">
                <h4 className="">All the Clients of Application</h4>
              </Col>
              <Col
                sm={3}
                className="d-flex align-items-end justify-content-end"
              >
                <AddClient />
              </Col>
            </Row>
            <Paper className="mt-4" sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                          className="fw-bold bg-dark text-white text-center"
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody className="table-img text-white">
                    {loading ? (
                      <div className="mt-5 loading d-flex justify-content-center align-items-center">
                        <Spinner animation="border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      </div>
                    ) : (
                      rows
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, index) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.code}
                            >
                              <TableCell className="text-center">
                                {index + 1}
                              </TableCell>
                              <TableCell className="text-center">
                                {row._id}
                              </TableCell>
                              <TableCell className="d-flex align-items-center justify-content-start">
                                <Avatar
                                  alt="Client"
                                  className="fw-bold"
                                  src={row.ProfilePic}
                                />
                                &nbsp;&nbsp;&nbsp;{row.FullName}{" "}
                              </TableCell>
                              <TableCell className="text-center">
                                {row.Email}
                              </TableCell>
                              <TableCell className="text-center">
                                {row.Mobile}
                              </TableCell>
                              <TableCell className="d-flex justify-content-around align-items-center">
                                <VisibilityIcon
                                  className="eye"
                                  onClick={() => {profileHandler(row._id)}}
                                />
                                <DeleteIcon
                                  className="eye"
                                  onClick={() => {
                                    deleteEmployee(row._id);
                                  }}
                                />
                              </TableCell>
                            </TableRow>
                          );
                        })
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 200]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
}
