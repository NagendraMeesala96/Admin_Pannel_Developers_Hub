import { Fragment, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Spinner } from "react-bootstrap";

function AddEmployee() {
  const [empDetails, setEmpDetails] = useState({
    FullName: "",
    Email: "",
    Mobile: "",
    Skills: "",
    Password: "",
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setEmpDetails({ ...empDetails, [e.target.name]: e.target.value });
  };

  const submitHandler = () => {
    setLoading(true);
    axios
      .post("https://developershubbackend.herokuapp.com/register", empDetails)
      .then((res) => {
        alert("Employee Added");
        setLoading(false);
        handleClose();
        window.location.reload();
      })
      .catch((err) => {
        setLoading(false);
        alert(err.response.data);
        console.log(err.response.data);
      });
  };

  return (
    <Fragment>
      <div>
        <button
          className="btn btn-success p-2 d-flex"
          onClick={() => {
            handleShow();
          }}
        >
          Add Employee
        </button>
      </div>
      {/*Modal code */}
      <Modal className="mt-5" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
          <Form>
            <TextField
              required
              id="outlined-required"
              label="Full Name"
              name="FullName"
              className="w-100"
              onChange={changeHandler}
            />
            <TextField
              required
              id="outlined-required"
              label="Email"
              name="Email"
              className="w-100 mt-3"
              onChange={changeHandler}
            />
            <TextField
              required
              id="outlined-required"
              label="Password"
              name="Password"
              className="w-100 mt-3"
              onChange={changeHandler}
            />
            <TextField
              required
              id="outlined-required"
              label="MobileNum"
              name="Mobile"
              className="w-100 mt-3"
              onChange={changeHandler}
            />
            <TextField
              required
              id="outlined-required"
              label="Skills"
              name="Skills"
              className="w-100 mt-3"
              onChange={changeHandler}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex align-items-center">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              submitHandler();
            }}
          >
            Add Employee
          </Button>
          &nbsp;&nbsp;
          {loading ? (
            <Spinner animation="border" role="status" className="d-flex mt-3">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : null}
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default AddEmployee;
