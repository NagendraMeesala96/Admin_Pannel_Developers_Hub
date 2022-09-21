import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Col from "react-bootstrap/Col";
import { Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import PersonalDetails from "./PersonalDetails";
import EditEducation from "./EditEducation";
import LanguageIcon from "@mui/icons-material/Language";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import StarIcon from "@mui/icons-material/Star";
import PersonIcon from "@mui/icons-material/Person";
import CommentIcon from "@mui/icons-material/Comment";
import { useParams } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Spinner from "react-bootstrap/Spinner";
import ClientPersonalDetails from "./Client/ClientPersonalDetails";

function OthersProfile() {
  let { id, userType } = useParams();

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
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/Employee"
      onClick={handleClick}
    >
      {userType}
    </Link>,
    <Typography key="3" color="text.primary">
      Profile
    </Typography>,
  ];

  function handleClick(event) {
    console.log(event);
  }

  const navigate = useNavigate();

  const [imgUrl, setImgUrl] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const [imgUploadLoading, setImgUploadLoading] = useState(false);

  const [data, setUserData] = useState([]);

  const [review, setReview] = useState([]);

  const [update, setUpdate] = useState(true);

  const [submitBtn, setSubmitBtn] = useState(false);

  const [editSocialMedia, setEditSocialMedia] = useState({
    Facebook: "",
    Instagram: "",
    GitHub: "",
    LinkedIn: "",
    Website: "",
    Twitter: "",
  });

  const [editPersonalMedia, setPersonalDetails] = useState({
    FullName: "",
    Email: "",
    Mobile: "",
  });

  //Upload Img
  let imgHandler = async (e) => {
    setImgUploadLoading(true);

    let cloudName = `doutsozxy`;

    const files = e.target.files;

    const data = new FormData();

    data.append("file", files[0]);

    data.append("upload_preset", "empImages");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
      {
        method: "post",
        body: data,
      }
    );
    //console.log("waiting....");
    const file = await res.json();
    //console.log("over....");
    setImgUrl(file.secure_url);
    console.log(file.secure_url);
    setImgUploadLoading(false);
  };

  const uploadImg = () => {
    if (imgUrl == "") {
      alert("Please upload Image");
    } else {
      let data = {
        ProfilePic: imgUrl,
      };
      axios
        .put(`https://developershubbackend.herokuapp.com/Client/UpdateImg/${id}`, data)
        .then((res) => {
          alert(res.data.status);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    axios
      .get(`https://developershubbackend.herokuapp.com/ClientProfile/${id}`)
      .then((res) => {
        setUserData(res.data);
        setEditSocialMedia({
          Facebook: res.data.SocialMedia.Facebook,
          Instagram: res.data.SocialMedia.Instagram,
          GitHub: res.data.SocialMedia.GitHub,
          LinkedIn: res.data.SocialMedia.LinkedIn,
          Website: res.data.SocialMedia.Website,
          Twitter: res.data.SocialMedia.Twitter,
        });
        setPersonalDetails({
          FullName: res.data.FullName,
          Email: res.data.Email,
          Mobile: res.data.Mobile,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeHandler = (e) => {
    setEditSocialMedia({ ...editSocialMedia, [e.target.name]: e.target.value });
  };

  const saveChanges = () => {
    let updatedData = {
      Facebook: editSocialMedia.Facebook,
      Instagram: editSocialMedia.Instagram,
      GitHub: editSocialMedia.GitHub,
      LinkedIn: editSocialMedia.LinkedIn,
      Website: editSocialMedia.Website,
      Twitter: editSocialMedia.Twitter,
    };

    axios
      .put(
        `https://developershubbackend.herokuapp.com/Client/UpdateSocialMedia/${id}`,
        updatedData
      )
      .then((res) => {
        alert(res.data.status);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      <Row>
        <Col sm={3}>
          <SideBar />
        </Col>
        <Col sm={9}>
          <section className="content">
            <div className="mt-5">
              <Stack spacing={2}>
                <Breadcrumbs
                  separator={<NavigateNextIcon fontSize="small" />}
                  aria-label="breadcrumb"
                >
                  {breadcrumbs}
                </Breadcrumbs>
              </Stack>
              <div className="profile-bord mt-5">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="card mb-3 p-3" style={{ height: 550 }}>
                      <h4 className="text-center">User ProfilePic</h4>
                      <div className="card-body text-center">
                        <img
                          src={data.ProfilePic}
                          alt="avatar"
                          className="rounded-circle img-fluid"
                          style={{ width: "215px", height: "215px" }}
                        />
                        <h5 className="my-3 text-center">{data.FullName}</h5>
                        <p className="text-muted   text-center">
                          {data.JobRole}
                        </p>
                        <p>{imgUrl}</p>
                        <div className="d-flex justify-content-center mb-2 mt-5">
                          <Row className="d-flex justify-content-center ">
                            <Col sm={8}>
                              <input
                                type="file"
                                className="form-control"
                                onChange={imgHandler}
                              />
                            </Col>
                            <Col sm={4}>
                              {imgUploadLoading ? (
                                <div>
                                  <Spinner animation="border" role="status">
                                    <span className="visually-hidden">
                                      Loading...
                                    </span>
                                  </Spinner>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  className="btn btn-outline-primary ms-1"
                                  onClick={uploadImg}
                                >
                                  Upload
                                </button>
                              )}
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="card mb-4 " style={{ height: 550 }}>
                      <h4 className="text-center mt-2">Personal Details</h4>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-sm-3">
                            <p className="mb-0">Name</p>
                          </div>
                          <div className="col-sm-9">
                            <p className="text-muted mb-0">{data.FullName}</p>
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <p className="mb-0">Email</p>
                          </div>
                          <div className="col-sm-9">
                            <p className="text-muted mb-0">{data.Email}</p>
                          </div>
                        </div>
                        <hr />

                        <div className="row">
                          <div className="col-sm-3">
                            <p className="mb-0">Mobile</p>
                          </div>
                          <div className="col-sm-9">
                            <p className="text-muted mb-0">{data.Mobile}</p>
                          </div>
                        </div>
                        
                        <hr />
                        <div className="d-flex justify-content-center mb-1">
                          <ClientPersonalDetails obj={editPersonalMedia} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div
                      className="card mb-4 mb-lg-4"
                      style={{ height: "550px" }}
                    >
                      <div className="card-body p-3">
                        <h4 className="text-center">Social Media</h4>
                        <ul className="list-group list-group-flush rounded-3">
                          <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                            <LanguageIcon />
                            <p className="mb-0">
                              https://{editSocialMedia.Website}.com
                            </p>
                          </li>
                          <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                            <GitHubIcon color="red" />
                            <p>{editSocialMedia.GitHub}</p>
                          </li>
                          <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                            <LinkedInIcon />
                            <p>{editSocialMedia.LinkedIn}</p>
                          </li>
                          <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                            <TwitterIcon />
                            <p className="mb-0">@{editSocialMedia.Twitter}</p>
                          </li>
                          <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                            <InstagramIcon />
                            <p className="mb-0">{editSocialMedia.Instagram}</p>
                          </li>
                          <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                            <FacebookIcon />
                            <p className="mb-0">{editSocialMedia.Facebook}</p>
                          </li>
                        </ul>
                        <hr />
                        <div className="d-flex justify-content-center mt-5">
                          <button
                            type="button"
                            className="btn btn-outline-primary ms-1 up-sco"
                            onClick={handleShow}
                          >
                            Update Social Media
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Social Media </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Website Name :</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Website Name"
                    name="Website"
                    value={editSocialMedia.Website}
                    onChange={changeHandler}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>GitHub Name :</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="GitHub Name"
                    autoFocus
                    name="GitHub"
                    value={editSocialMedia.GitHub}
                    onChange={changeHandler}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>LinkedIn Name :</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Linked In Name"
                    autoFocus
                    name="LinkedIn"
                    value={editSocialMedia.LinkedIn}
                    onChange={changeHandler}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Twitter Name :</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Twitter Name"
                    autoFocus
                    name="Twitter"
                    value={editSocialMedia.Twitter}
                    onChange={changeHandler}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Instagram Name :</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Instagram Name"
                    autoFocus
                    name="Instagram"
                    value={editSocialMedia.Instagram}
                    onChange={changeHandler}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Facebook Name :</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Facebook Name"
                    autoFocus
                    name="Facebook"
                    value={editSocialMedia.Facebook}
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
        </Col>
      </Row>
    </Fragment>
    
  );
}

export default OthersProfile;
