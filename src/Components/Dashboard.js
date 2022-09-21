import { Fragment, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import SideBar from "./SideBar/SideBar";
import TopBar from "./SideBar/TopBar";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { Avatar } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
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

function Dashboard() {
  const [rows, setRows] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [loading, setLoading] = useState(true);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    axios
      .get("https://developershubbackend.herokuapp.com/Search")
      .then((res) => {
        console.log(res.data.data);
        setRows(res.data.data.reverse());
        setFilterData(res.data.data.reverse());
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  //Search

  const searchHandler = (event) => {
    setSearchKey(event.target.value);
    let filteredUsers = filterData.filter((e) => {
      return e.FullName.toLowerCase().includes(event.target.value.toLowerCase())
     });

     setRows(filteredUsers)
  };


  //Search Btn Handler
  const searchBtnHandler = () => {
    let filterSearch = searchKey
    let filteredUsers = filterData.filter((e) => {
     return e.FullName.includes(filterSearch)
    });
    console.log(filteredUsers)
    //setRows(filteredUsers)
  };

  return (
    <Fragment>
      <Row>
        <Col xs={3} sm={3}>
          <SideBar />
        </Col>
        <Col xs={9} sm={9}>
          <TopBar />
          <div className="search-box d-flex justify-content-center">
            <input
              type="text"
              className="form-control w-25"
              placeholder="Search User Here"
              value={searchKey}
              onChange={searchHandler}
            />
            <button className="btn btn-primary m-1" onClick={searchBtnHandler}>
              Search
            </button>
          </div>
          <Paper
            className="mt-4 content"
            sx={{ width: "100%", overflow: "hidden" }}
          >
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
                                onClick={() => {}}
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
              rowsPerPageOptions={[15, 25, 100]}
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
    </Fragment>
  );
}

export default Dashboard;
