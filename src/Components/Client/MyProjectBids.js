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
import Modal from "react-bootstrap/Modal";
import TextField from "@mui/material/TextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import Spinner from "react-bootstrap/Spinner";
import Avatar from "@mui/material/Avatar";
import { useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";

const columns = [
  { id: "S.No", label: "S.No", minWidth: 120 },
  { id: "_id", label: "ID", minWidth: 120 },
  { id: "FullName", label: "Name", minWidth: 50 },
  {
    id: "Mobile",
    label: "Bid Amount",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Email",
    label: "No Of Days To Delivery",
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

export default function MyProjectBids() {
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
      Bids
    </Typography>,
  ];

  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
  const { id } = useParams();
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = useState(true);
  const [postDetails, setPostDetails] = useState([]);
  const [show, setShow] = useState(false);
  const [viewDetails, setViewDetails] = useState([]);

  const [giveRating, setGiveRating] = useState({
    taskWorker: "",
    rating: "",
    reviewContent: "",
  });

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    axios
      .get(`https://developershubbackend.herokuapp.com/PostBid/${id}`, {
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

  //Post Details
  const getPostDetails = (id) => {
    axios
      .get(`https://developershubbackend.herokuapp.com/GetPost/${id}`, {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setPostDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Delete Client
  const deleteEmployee = (id) => {
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

  //Add rating
  const changeHandler = (e) => {
    setGiveRating({ ...giveRating, [e.target.name]: e.target.value });
  };

  const submitRating = (UserId) => {
    setGiveRating({ ...giveRating, taskWorker: UserId });
    axios
      .post(
        "https://developershubbackend.herokuapp.com/addReview",
        giveRating,
        {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        alert("Rating Added");
        handleClose();
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
                <h4 className="">Project Details and BIds </h4>
              </Col>
              <Col
                sm={3}
                className="d-flex align-items-end justify-content-end"
              ></Col>
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
                                  src={row.UserDetails.UserProfile}
                                />
                                &nbsp;&nbsp;&nbsp;{row.UserDetails.UserName}{" "}
                              </TableCell>
                              <TableCell className="text-center">
                                $ {row.BidPrice}
                              </TableCell>
                              <TableCell className="text-center">
                                {row.NoOfDaysDelivery}
                              </TableCell>
                              <TableCell className="d-flex justify-content-around align-items-center">
                                <VisibilityIcon
                                  className="eye"
                                  onClick={() => {
                                    handleShow();
                                    getPostDetails(row.PostId);
                                    setViewDetails([row]);
                                    
                                  }}
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
        <Modal.Footer className="d-flex justify-content-around align-items-center w-50">
          <TextField
            className="mt-3"
            id="Client Mobile"
            label="Rating upto 5"
            name="rating"
            onChange={changeHandler}
          />
          <TextField
            className="mt-3"
            id="Client Mobile"
            label="Review Comment"
            name="reviewContent"
            onChange={changeHandler}
          />
          <button className="btn btn-primary" onClick={submitRating}>Submit</button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
