import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "react-bootstrap";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import SideBar from "../SideBar/SideBar";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import AddProjectPost from "./AddProjectPost";

export default function ProjectPosts() {
  const breadcrumbs = [
    <Typography key="3" color="text.primary">
      Developer Hub
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
      All Project Posts
    </Typography>,
  ];

  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  const [rows, setRows] = React.useState([]);

  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [viewDetails, setViewDetails] = useState([]);

  const [show, setShow] = useState(false);

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
      .get("https://developershubbackend.herokuapp.com/allPosts", {
        headers: {
          "x-token":localStorage.getItem('token')
        },
      })
      .then((res) => {
        console.log(res.data);
        setRows(res.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //Delete Post
  const deleteProjectPost = (id) => {
    axios
      .delete(`https://developershubbackend.herokuapp.com/Post/${id}`)
      .then((res) => {
        alert("Post Deleted");
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
        <Col xs={3} sm={3}>
          <SideBar />
        </Col>
        <Col xs={9} sm={9} >
          <div className="content mt-5" style={{ width: "99%" }}>
            <Stack spacing={2}>
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
              >
                {breadcrumbs}
              </Breadcrumbs>
            </Stack>
            <Row className="mt-5">
              <Col className="h3 d-flex" sm={6}>
                All Project Posts
              </Col>
              <Col
                className="d-flex align-items-end justify-content-end"
                sm={6}
              >
                <AddProjectPost />
              </Col>
            </Row>
          </div>
          <Paper
            className=" content mt-5"
            sx={{ width: "99%", overflow: "hidden" }}
          >
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{ minWidth: 80 }}
                      className="fw-bold bg-dark text-center text-white"
                    >
                      ID
                    </TableCell>
                    <TableCell
                      style={{ minWidth: 370 }}
                      className="fw-bold bg-dark text-center text-white"
                    >
                      PostTitle
                    </TableCell>
                    <TableCell
                      style={{ minWidth: 20 }}
                      className="fw-bold bg-dark text-center text-white"
                    >
                      BidPrice
                    </TableCell>
                    <TableCell
                      style={{ minWidth: 270 }}
                      className="fw-bold bg-dark text-center text-white"
                    >
                      RequiredSkills
                    </TableCell>
                    <TableCell
                      style={{ minWidth: 130 }}
                      className="fw-bold bg-dark text-center text-white"
                    >
                      PostDate
                    </TableCell>
                    <TableCell
                      style={{ minWidth: 20 }}
                      className="fw-bold bg-dark text-center text-white"
                    >
                      TotalBids
                    </TableCell>

                    <TableCell
                      style={{ minWidth: 170 }}
                      className="fw-bold bg-dark text-center text-white"
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                            {row.PostTitle.slice(0, 50)}
                          </TableCell>
                          <TableCell className="text-center">
                            {row.BidPrice}
                          </TableCell>
                          <TableCell className="text-center">
                            {row.RequiredSkills}
                          </TableCell>
                          <TableCell className="text-center">
                            {row.PostDate.slice(0, 10)}
                          </TableCell>
                          <TableCell className="text-center">
                            {row.TotalBids}
                          </TableCell>
                          <TableCell className="d-flex justify-content-around align-items-center">
                            <VisibilityIcon
                              className="eye"
                              onClick={() => {
                                handleShow();
                                setViewDetails([row]);
                              }}
                            />
                            <DeleteIcon
                              className="eye"
                              onClick={() => {
                                deleteProjectPost(row._id);
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Col>
      </Row>

      {/*Modal code */}
      <Modal
        size="xl"
        style={{ margin: 120 }}
        className="mt-5"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>Project Post Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
          <Row>
            <Col sm={9}>
              <div className="card">
                <div className="card-body">
                  {viewDetails.map((details) => {
                    return (
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
                          defaultValue={details.PostDate.slice(0, 10)}
                        />
                        <textarea
                          className="mt-3 w-100"
                          id="PostTitle"
                          label="PostDate"
                          rows={6}
                          disabled
                          defaultValue={details.Description}
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
                  <h6>The Client Details</h6>
                </div>
                <div className="card-body">
                  {viewDetails.map((details) => {
                    return (
                      <div>
                        <div className="d-flex justify-content-center">
                          <Avatar
                            alt="Client"
                            className="fw-bold"
                            src={details.OwnerDetails.ClientProfilePic}
                          />
                        </div>
                        <TextField
                          className="mt-2"
                          id="Client Name"
                          label="Client Name"
                          disabled
                          defaultValue={details.OwnerDetails.ClientName}
                        />
                        <TextField
                          className="mt-3"
                          id="Client Email"
                          label="Client Email"
                          disabled
                          defaultValue={details.OwnerDetails.ClientEmail}
                        />
                        <TextField
                          className="mt-3"
                          id="Client Mobile"
                          label="Client Mobile"
                          disabled
                          defaultValue={details.OwnerDetails.ClientNum}
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
    </React.Fragment>
  );
}
