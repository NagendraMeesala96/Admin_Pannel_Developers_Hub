import { Fragment, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useParams } from "react-router-dom";


function ClientPersonalDetails(props) {
  let { id } = useParams();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const [editPersonalMedia, setPersonalDetails] = useState({
    FullName: props.obj.FullName,
    Email: props.obj.Email,
    Mobile: props.obj.Mobile,
  });

  const loadPage = () => {
    setPersonalDetails({
      FullName: props.obj.FullName,
      Email: props.obj.Email,
      Mobile: props.obj.Mobile,
    });
  };

  const changeHandler = (e) => {
    setPersonalDetails({
      ...editPersonalMedia,
      [e.target.name]: e.target.value,
    });
  };

  const saveChanges = () => {
    let updatedData = {
      FullName: editPersonalMedia.FullName,
      FullName: editPersonalMedia.Email,
      Mobile: editPersonalMedia.Mobile,
    };

    axios
      .put(
        `https://developershubbackend.herokuapp.com/Client/UpdatePersonalDetails/${id}`,
        updatedData
      )
      .then((res) => {
        alert(res.data.status);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Fragment>
      <div>
        <button
          className="btn btn-outline-primary mt-3"
          onClick={() => {
            handleShow();
            loadPage();
          }}
        >
          Update Details
        </button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>PersonalDetails</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label> Name :</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Full Name"
                  name="FullName"
                  value={editPersonalMedia.FullName}
                  onChange={changeHandler}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email :</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="EMail"
                  autoFocus
                  name="Email"
                  value={editPersonalMedia.Email}
                  onChange={changeHandler}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Mobile Num :</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Mobile"
                  autoFocus
                  name="Mobile"
                  value={editPersonalMedia.Mobile}
                  onChange={changeHandler}
                />
              </Form.Group>
              
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                saveChanges();
                handleClose();
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Fragment>
  );
}

export default ClientPersonalDetails;
