import { Fragment, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import TextField from "@mui/material/TextField";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
function AddProjectPost(props) {
  const [show, setShow] = useState(false);

  const AddHandleClose = () => setShow(false);

  const AddHandleShow = () => setShow(true);

  const [postData, setPostData] = useState({
    PostTitle: "",
    Description: "",
    BidPrice: "",
    RequiredSkills: "",
  });

  const changeHandler = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  function refreshPage() {
    window.location.reload(false);
  }

  const handleSubmit = (event) => {
    axios
      .post(
        "https://developershubbackend.herokuapp.com/addClientPost",
        postData,
        {
          headers: {
            "x-token":localStorage.getItem('token')
          },
        }
      )
      .then((res) => {
        alert("Post Published");
        AddHandleClose();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      <button className="btn btn-success" onClick={AddHandleShow}>
        Add ProjectPost
      </button>
      <Modal className="mt-5" show={show} onHide={AddHandleClose}>
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>Add Project Post</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
          <Form>
            <TextField
              required
              id="outlined-required"
              label="Post Title"
              name="PostTitle"
              className="w-100"
              onChange={changeHandler}
            />
            <TextField
              required
              id="outlined-required"
              label="Bid Amount"
              name="BidPrice"
              className="w-100 mt-3"
              onChange={changeHandler}
            />
            <TextField
              required
              id="outlined-required"
              label="RequiredSkills"
              name="RequiredSkills"
              className="w-100 mt-3"
              onChange={changeHandler}
            />
            <textarea
              required
              name="Description"
              placeholder="  Description *"
              rows={4}
              className="w-100 mt-3"
              onChange={changeHandler}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={AddHandleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmit();
            }}
          >
            Publish Post
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default AddProjectPost;
