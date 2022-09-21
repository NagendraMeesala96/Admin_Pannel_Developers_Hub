import * as React from "react";
import { Fragment, useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import SideBar from "../SideBar/SideBar";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "react-bootstrap/Modal";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import AddReview from "./AddReview";

const columns = [
  { id: "_id", label: "ID", minWidth: 170, align: "center" },
  { id: "FullName", label: "Task Provider", minWidth: 170, align: "center" },
  {
    id: "JobRole",
    label: "Task Worker",
    minWidth: 170,
    align: "center",
  },
  {
    id: "Mobile",
    label: "Rating",
    minWidth: 70,
    align: "center",
  },
  {
    id: "Email",
    label: "Review Comment",
    minWidth: 170,
    align: "center",
  },
  {
    id: "Email",
    label: "Action",
    minWidth: 170,
    align: "center",
  },

];

function AllReviews() {
  const breadcrumbs = [
    <Typography key="3" color="text.primary">
      Developers Hub
    </Typography>,
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      onClick={handleClick}
    >
      Dashboard
    </Link>,
    <Typography key="3" color="text.primary">
      All Reviews
    </Typography>,
  ];

  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  const [rows, setRows] = React.useState([]);

  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    axios
      .get("https://developershubbackend.herokuapp.com/AllReviews", {
        headers: {
          "x-token":localStorage.getItem('token')
        },
      })
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        setRows(res.data.reverse());
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

   //Delete Bid
   const deleteReview = (id) => {
    axios
      .delete(`https://developershubbackend.herokuapp.com/DeleteReview/${id}`)
      .then((res) => {
        
        alert("Review Deleted");
        window.location.reload();
      })
      .catch((err) => {
        alert(err.response.data);
        console.log(err.response.data);
        
      });
  };

  return (
    <Fragment>
      <Row>
        <Col sm={3}>
          <SideBar />
        </Col>
        <Col sm={9}>
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
                <h4>All Reviews</h4>
              </Col>
              <Col sm={3} className="d-flex justify-content-end">
                <AddReview/>
              </Col>
              
            </Row>
            <Paper className="mt-5" sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                          className="fw-bold bg-dark text-white"
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
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
                        .map((row) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.code}
                            >
                              <TableCell className="text-center">
                                {row._id}
                              </TableCell>
                              <TableCell className="text-center">
                                {row.taskProvider}
                              </TableCell>
                              <TableCell className="text-center">
                                {row.taskWorker}
                              </TableCell>
                              <TableCell className="text-center">
                                {row.rating}
                              </TableCell>
                              <TableCell className="text-center">
                                {row.reviewContent}
                              </TableCell>
                              <TableCell className="d-flex justify-content-around align-items-center">
                                
                                <DeleteIcon className="eye" onClick={()=>{deleteReview(row._id)}} />
                              </TableCell>
                            </TableRow>
                          );
                        })
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 15, 50]}
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
      
    </Fragment>
  );
}

export default AllReviews;
