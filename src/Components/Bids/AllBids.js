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

const columns = [
  { id: "_id", label: "ID", minWidth: 170, align: "center" },
  { id: "FullName", label: "Post ID", minWidth: 100, align: "center" },
  {
    id: "JobRole",
    label: "Bid Amount",
    minWidth: 170,
    align: "center",
  },
  {
    id: "Mobile",
    label: "NoOfDaysToDelivery",
    minWidth: 170,
    align: "center",
  },
  {
    id: "Email",
    label: "BidUser",
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

function AllBids() {
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
      All Bids
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

  const [viewDetails, setViewDetails] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const [postDetails, setPostDetails] = useState([]);

  useEffect(() => {
    axios
      .get("https://developershubbackend.herokuapp.com/allBids", {
        headers: {
          "x-token":localStorage.getItem('token'),
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
 
  const getPostDetails = (id) => {
    axios
      .get(`https://developershubbackend.herokuapp.com/GetPost/${id}`, {
        headers: {
          "x-token":localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setPostDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

   //Delete Bid
   const deleteBid = (id) => {
    axios
      .delete(`https://developershubbackend.herokuapp.com/Bid/${id}`)
      .then((res) => {
        alert("Bid Deleted");
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
                <h4>All Bids</h4>
              </Col>
              <Col
                sm={3}
                className="d-flex align-items-end justify-content-end"
              ></Col>
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
                                {row.PostId}
                              </TableCell>
                              <TableCell className="text-center">
                                {row.BidPrice}
                              </TableCell>
                              <TableCell className="text-center">
                                {row.NoOfDaysDelivery}
                              </TableCell>
                              <TableCell className="text-center">
                                {row.UserDetails.UserName}
                              </TableCell>
                              <TableCell className="d-flex justify-content-around align-items-center">
                                <VisibilityIcon
                                  className="eye"
                                  onClick={() => {
                                    handleShow();
                                    setViewDetails([row]);
                                    getPostDetails(row.PostId);
                                    console.log([row]);
                                  }}
                                />
                                <DeleteIcon className="eye" onClick={()=>{deleteBid(row._id)}} />
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
      <Modal
        size="xl"
        style={{ margin: 120 }}
        className="mt-5"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>Project Bid Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
          <Row>
            <Col sm={9}>
              <div className="card">
                <div className="card-body">
                  {postDetails.map((details) => {
                    return (
                      <div>
                        <div className="">
                          <TextField
                            className="mt-2 text-filed1"
                            id="PostTitle"
                            label="PostTitle"
                            disabled
                            defaultValue={details.PostTitle}
                          />
                          &nbsp;
                          <TextField
                            className="mt-2 text-filed2"
                            id="PostTitle"
                            label="BidAmount"
                            disabled
                            defaultValue={`$` + details.BidPrice}
                          />
                          <TextField
                            className="mt-3 text-filed3"
                            id="Required SKills"
                            label="Required SKills"
                            disabled
                            defaultValue={details.RequiredSkills}
                          />
                          &nbsp;
                          <TextField
                            className="mt-3"
                            id="Required SKills"
                            label="Total Bids"
                            disabled
                            defaultValue={details.TotalBids}
                          />
                          &nbsp;
                          <TextField
                            className="mt-3"
                            id="PostTitle"
                            label="PostDate"
                            disabled
                            defaultValue={details.PostDate}
                          />
                          <textarea
                            className="mt-3 w-100"
                            id="PostTitle"
                            label="PostDate"
                            rows={4}
                            disabled
                            defaultValue={details.Description}
                          />
                        </div>
                        <p>User Proposal : </p>
                        <textarea
                            className="w-100"
                            id="PostTitle"
                            label="PostDate"
                            rows={4}
                            disabled
                            defaultValue={viewDetails[0].Proposal}
                          />
                      </div>
                    );
                  })}
                </div>
              </div>
            </Col>
            <Col sm={3}>
              <div className="card">
                <div className="card-header text-center bg-dark text-white">
                  <h6>Bid User Details</h6>
                </div>
                <div className="card-body">
                  {viewDetails.map((details) => {
                    return (
                      <div>
                        <div className="d-flex justify-content-center">
                          <Avatar
                            alt="Client"
                            className="fw-bold"
                            src={details.UserDetails.UserProfile}
                          />
                        </div>
                        <div className="mt-2 d-flex justify-content-center">
                          <Rating
                            name="half-rating-read"
                            defaultValue={details.UserDetails.UserRating}
                            readOnly
                          />
                        </div>
                        <TextField
                          className="mt-3"
                          id="Client Name"
                          label="User Name"
                          disabled
                          defaultValue={details.UserDetails.UserName}
                        />
                        <TextField
                          className="mt-3"
                          id="Client Email"
                          label="User Email"
                          disabled
                          defaultValue={details.UserDetails.UserMail}
                        />
                        <TextField
                          className="mt-3"
                          id="Client Mobile"
                          label="User Mobile"
                          disabled
                          defaultValue={details.UserDetails.UserNum}
                        />
                        <TextField
                          className="mt-3"
                          id="Client Mobile"
                          label="User Bid Amount"
                          disabled
                          defaultValue={details.BidPrice}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}

export default AllBids;
