import { useState } from "react";
import axios from "../lib/axios";
import OutLineBg from "../OutLineBg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/login.css";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { imageUpload } from "../utils/ImageUpload";
const Login = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [checkPass, setCheckPass] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isMatch, setIsMatch] = useState(true);
  const [fNameErr, setFNameErr] = useState(false);
  const [lNameErr, setLNameErr] = useState(false);
  const [passErr, setPassErr] = useState(false);
  const [phoneErr, setPhoneErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [imagePreview, setImagePreview] = useState();
  const [emailLog, setEmailLog] = useState("");
  const [passLog, setPassLog] = useState("");
  const [emailLogErr, setEmailLogErr] = useState(false);
  const [passLogErr, setPassLogErr] = useState(false);

  const notifyError = (msg) => toast.error(msg);
  const notifySuccess = (msg) => toast.success(msg);
  const handleRegister = async () => {
    if (email === "") {
      setEmailErr(true);
    }
    if (password === "") {
      setPassErr(true);
    }
    if (lastName === "") {
      setLNameErr(true);
    }

    if (firstName === "") {
      setFNameErr(true);
    }
    if (phoneNumber === "") {
      setPhoneErr(true);
    }

    if (fNameErr || lNameErr || passErr || phoneErr || emailErr) return;

    if (password !== checkPass) return setIsMatch(false);

    try {
      const res = await axios.post("/users/create-user", {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        avatar: imagePreview,
      });
      notifySuccess("????ng k?? ng?????i d??ng m???i th??nh c??ng");
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setPassword("");
    } catch (error) {
      notifyError(error.response.data.msg);
    }
  };

  const handleUploadImage = async (file) => {
    setIsLoading(true);
    await new Promise(async () => {
      const image = await imageUpload(file);
      setImagePreview(image);
      setIsLoading(false);
    });
  };

  const handleLogin = async () => {
    if (emailLog == "") {
      setEmailLogErr(true);
    }
    if (passLog == "") {
      setPassLogErr(true);
    }
    if (emailLogErr || passLogErr) return;
    try {
      const res = await axios.post("/users/sign-in", {
        email: emailLog,
        password: passLog,
      });
      localStorage.setItem("items", JSON.stringify(res.data.user));
      notifySuccess("????ng nh???p th??nh c??ng");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.log(error);
      notifyError(error.response.data.msg);
    }
  };

  return (
    <>
      <ToastContainer />
      <OutLineBg>
        <div>
          <link
            href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
            rel="stylesheet"
          />
          <div className="container pb-5 mb-sm-4">
            <div className="row pt-5">
              <div className="col-md-6 pt-sm-3">
                <div className="card">
                  <div className="card-body">
                    <h2 className="h4 mb-1">????ng Nh???p</h2>
                    <div className="d-sm-flex align-items-center py-3">
                      <h3 className="h6 font-weight-semibold opacity-70 mb-3 mb-sm-2 mr-sm-3">
                        ????ng nh???p b???ng:
                      </h3>
                      <div>
                        <a
                          className="social-btn sb-facebook mr-2 mb-2"
                          href="#"
                          data-toggle="tooltip"
                          title
                          data-original-title="Sign in with Facebook"
                        >
                          <i className="fa fa-facebook" />
                        </a>
                        <a
                          className="social-btn sb-twitter mr-2 mb-2"
                          href="#"
                          data-toggle="tooltip"
                          title
                          data-original-title="Sign in with Twitter"
                        >
                          <i className="fa fa-twitter" />
                        </a>
                        <a
                          className="social-btn sb-linkedin mr-2 mb-2"
                          href="#"
                          data-toggle="tooltip"
                          title
                          data-original-title="Sign in with LinkedIn"
                        >
                          <i className="fa fa-linkedin" />
                        </a>
                      </div>
                    </div>
                    <hr />
                    <h3 className="h6 font-weight-semibold opacity-70 pt-4 pb-2">
                      Ho???c s??? d???ng m???u d?????i ????y
                    </h3>
                    <form className="needs-validation" noValidate>
                      <div className="input-group form-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={24}
                              height={24}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-mail"
                            >
                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                              <polyline points="22,6 12,13 2,6" />
                            </svg>
                          </span>
                        </div>
                        <input
                          className="form-control"
                          type="email"
                          placeholder="Email"
                          required
                          value={emailLog}
                          onChange={(e) => {
                            setEmailLog(e.target.value);
                            if (e.target.value === "")
                              return setEmailLogErr(true);
                            setEmailLogErr(false);
                          }}
                        />
                        {emailLogErr && (
                          <div className="invalid-feedback">
                            Vui l??ng nh???p email
                          </div>
                        )}
                      </div>
                      <div className="input-group form-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={24}
                              height={24}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-lock"
                            >
                              <rect
                                x={3}
                                y={11}
                                width={18}
                                height={11}
                                rx={2}
                                ry={2}
                              />
                              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                          </span>
                        </div>
                        <input
                          className="form-control"
                          type="password"
                          placeholder="Password"
                          required
                          value={passLog}
                          onChange={(e) => {
                            setPassLog(e.target.value);
                            if (e.target.value === "")
                              return setPassLogErr(true);
                            setPassLogErr(false);
                          }}
                        />
                        {passLogErr && (
                          <div className="invalid-feedback">
                            Please enter valid password!
                          </div>
                        )}
                      </div>

                      <div className="d-flex flex-wrap justify-content-between">
                        <div className="custom-control custom-checkbox">
                          <input
                            className="custom-control-input"
                            type="checkbox"
                            defaultChecked
                            id="remember_me"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="remember_me"
                          >
                            Nh??? M???t Kh???u
                          </label>
                        </div>
                        <a
                          className="nav-link-inline font-size-sm"
                          href="account-password-recovery.html"
                        >
                          Qu??n M???t Kh???u
                        </a>
                      </div>
                      <hr className="mt-4" />
                      <div className="text-right pt-4">
                        <button
                          className="btn btn-primary"
                          type="button"
                          onClick={handleLogin}
                        >
                          ????ng Nh???p
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-md-6 pt-5 pt-sm-3">
                <h2 className="h4 mb-3">Kh??ng t??i kho???n? ????ng k??</h2>
                <p className="text-muted mb-4">
                  Qu?? tr??nh ????ng k?? ch??? m???t ch??a ?????y m???t ph??t nh??ng mang l???i cho
                  b???n to??n quy???n ki???m so??t c??c ????n ?????t h??ng c???a m??nh.
                </p>
                <form className="needs-validation" noValidate>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="reg-fn">T??n</label>
                        <input
                          className="form-control"
                          type="text"
                          required
                          id="reg-fn"
                          value={firstName}
                          onChange={(e) => {
                            setFirstName(e.target.value);
                            if (e.target.value === "") return setFNameErr(true);
                            setFNameErr(false);
                          }}
                        />
                        {fNameErr && (
                          <div className="invalid-feedback">
                            Vui l??ng nh???p t??n!
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="reg-ln">H???</label>
                        <input
                          className="form-control"
                          type="text"
                          required
                          id="reg-ln"
                          value={lastName}
                          onChange={(e) => {
                            setLastName(e.target.value);
                            if (e.target.value === "") {
                              setLNameErr(true);
                            } else {
                              setLNameErr(false);
                            }
                          }}
                        />
                        {lNameErr && (
                          <div className="invalid-feedback">
                            Vui l??ng nh???p h???!
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="reg-email">E-mail </label>
                        <input
                          className="form-control"
                          type="email"
                          required
                          id="reg-email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (e.target.value === "") return setEmailErr(true);
                            setEmailErr(false);
                          }}
                        />
                        {emailErr && (
                          <div className="invalid-feedback">
                            Vui l??ng nh???p Email!
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="reg-phone">Nh???p s??? ??i???n tho???i</label>
                        <input
                          className="form-control"
                          type="text"
                          required
                          id="reg-phone"
                          value={phoneNumber}
                          onChange={(e) => {
                            setPhoneNumber(e.target.value);
                            if (e.target.value === "") return setPhoneErr(true);
                            setPhoneErr(false);
                          }}
                        />
                        {phoneErr && (
                          <div className="invalid-feedback">
                            Vui l??ng nh???p s??? ??i???n tho???i!
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="reg-password">Nh???p m???t kh???u</label>
                        <input
                          className="form-control"
                          type="password"
                          required
                          id="reg-password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            if (e.target.value === "") return setPassErr(true);
                            setPassErr(false);
                          }}
                        />
                        {passErr && (
                          <div className="invalid-feedback">
                            Vui l??ng nh???p m???t kh???u!
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="reg-password-confirm">
                          Nh???p l???i m???t kh???u
                        </label>
                        <input
                          className="form-control"
                          type="password"
                          required
                          id="reg-password-confirm"
                          value={checkPass}
                          onChange={(e) => setCheckPass(e.target.value)}
                        />
                        <div className="invalid-feedback">
                          {!isMatch ? "M???t kh???u kh??ng tr??ng kh???p!" : null}
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="reg-fn">???nh</label>
                        <input
                          className="form-control"
                          type="file"
                          required
                          id="reg-fn"
                          onChange={(e) => {
                            handleUploadImage(e.target.files[0]);
                          }}
                        />
                        {fNameErr && (
                          <div className="invalid-feedback">
                            Vui l??ng nh???p t??n!
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-sm-6">
                      {isLoading ? (
                        <CircularProgress color="success" />
                      ) : (
                        imagePreview && <img src={imagePreview} />
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={handleRegister}
                    >
                      ????ng K??
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </OutLineBg>
    </>
  );
};

export default Login;
