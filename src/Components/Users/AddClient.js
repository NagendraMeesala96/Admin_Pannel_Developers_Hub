import { Fragment, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import TextField from "@mui/material/TextField";
import axios from "axios";

function AddClient() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const [clientDetails, setClientDetails] = useState({
    FullName: "",
    Email: "",
    Mobile: "",
    Password: "",
  });

  const changeHandler = (e) => {
    setClientDetails({ ...clientDetails, [e.target.name]: e.target.value });
  };

  const submitHandler = () => {
    axios
      .post(
        "https://developershubbackend.herokuapp.com/Client/register",
        clientDetails
      )
      .then((res) => {
        alert("Client Added");
        handleClose();
        window.location.reload();
      })
      .catch((err) => {
        alert(err.response.data);
        console.log(err.response.data);
      });
  };

  return (
    <Fragment>
      <div>
        <button
          className="btn btn-primary d-flex"
          onClick={() => {
            handleShow();
          }}
        >
          Add Client
        </button>
      </div>
      {/*Modal code */}
      <Modal className="mt-5" show={show} onHide={handleClose}>
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>Add Client</Modal.Title>
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
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              submitHandler();
            }}
          >
            Add Client
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default AddClient;
