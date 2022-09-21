import { Fragment, useState } from "react";
import SideBar from "./SideBar/SideBar";
import { Row, Col } from "react-bootstrap";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

function LogIn() {
  const navigate = useNavigate();

  const [logInLoading, setLogInLoading] = useState(false);

  const [logInData, setLogInData] = useState({
    Email: "",
    Password: "",
  });

  const [errMsg, setErrMsg] = useState({
    status: false,
    errMsg: "",
  });

  const changeHandler = (e) => {
    setLogInData({ ...logInData, [e.target.name]: e.target.value });
  };

  const submitHandler = () => {
    if (logInData.Email == "" || logInData.Password == "") {
      setErrMsg({
        ...errMsg,
        status: true,
        errMsg: "Please fill all the fields",
      });
    } else {
      setLogInLoading(true);
      setErrMsg({ ...errMsg, status: false, errMsg: "" });
      axios
        .post(
          "https://developershubbackend.herokuapp.com/Admin/login",
          logInData
        )
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userProfilePic", res.data.data.ProfilePic);
          setLogInLoading(false);
          navigate(`/Dashboard`);
        })
        .catch((err) => {
          console.log(err);
          setErrMsg({ ...errMsg, status: true, errMsg: err.request.response });
          setLogInLoading(false);
          //alert(err.request.response);
        });
    }
  };
  return (
    <Fragment>
      <Row>
        <Col sm={2}>
          <SideBar />
        </Col>
        <Col
          sm={10}
          className="d-flex justify-content-center align-items-center"
        >
          <div>
            <div className="d-flex justify-content-center align-items-center">
              <Paper
                elevation={8}
                className="mt-4 d-flex p-3"
                sx={{ width: "500px", overflow: "hidden", borderRadius: 5 }}
              >
                <div className="card p-5" style={{ width: 500 }}>
                  <h5 className="text-primary">~Log In Here~</h5>
                  <div className="card-body">
                    {errMsg.status ? (
                      <div class="d-flex" id="error">
                        {errMsg.errMsg}
                      </div>
                    ) : null}
                    <label className="d-flex">Email : </label>
                    <input
                      type="email"
                      className="form-control mt-2 w-100"
                      placeholder="Email"
                      name="Email"
                      value={logInData.Email}
                      onChange={changeHandler}
                    />
                    <label className="d-flex mt-1">Password : </label>
                    <input
                      type="password"
                      className="form-control mt-2"
                      placeholder="Password"
                      name="Password"
                      value={logInData.Password}
                      onChange={changeHandler}
                    />
                    <div className="d-flex">
                      <button
                        className="btn btn-outline-success mt-4"
                        onClick={submitHandler}
                      >
                        LogIn
                      </button>
                    </div>
                    {logInLoading ? (
                      <div>
                        <Spinner
                          animation="border"
                          role="status"
                          className="d-flex mt-3"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        <p className="d-flex">Loading....</p>
                      </div>
                    ) : null}
                  </div>
                </div>
              </Paper>
            </div>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
}

export default LogIn;
