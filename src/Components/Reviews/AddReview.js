import { Fragment, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import TextField from "@mui/material/TextField";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
function AddReview() {
  const [giveRating, setGiveRating] = useState({
    taskWorker: "",
    rating: "",
    reviewContent: "",
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const [taskWorker, setTaskWorker] = useState("");

  const [empData, setEmpData] = useState([]);

  const handleChange = (event) => {
    setTaskWorker(event.target.value);
    setGiveRating({...giveRating, taskWorker:event.target.value})
  };

  const changeHandler = (e) => {
    setGiveRating({ ...giveRating, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios
      .get("https://developershubbackend.herokuapp.com/allEmployeesList")
      .then((res) => {
        setEmpData(res.data);
        
      })
      .catch((err) => {
        alert(err)
      });
  }, []);

  const submitHandler = () => {
    setGiveRating({ ...giveRating, taskWorker: taskWorker });
    axios
      .post("https://developershubbackend.herokuapp.com/addReview", giveRating, {
        headers: {
          "x-token":localStorage.getItem('token')
        },
      })
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
    <Fragment>
      <div>
        <button
          className="btn btn-success p-2 d-flex"
          onClick={() => {
            handleShow();
          }}
        >
          Add Review
        </button>
      </div>
      {/*Modal code */}
      <Modal className="mt-5" show={show} onHide={handleClose}>
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>Add Review</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
          <Form>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Employee
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={taskWorker}
                label="Age"
                onChange={handleChange}
              >
                {empData.map((data) => {
                  return <MenuItem value={data._id}>{data.FullName}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <TextField
              required
              id="outlined-required"
              label="Rating"
              name="rating"
              className="w-100 mt-3"
              onChange={changeHandler}
            />
            <TextField
              required
              id="outlined-required"
              label="ReviewContent"
              name="reviewContent"
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
            Add Rating
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default AddReview;
