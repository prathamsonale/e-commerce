import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/style.css";
import axios from "axios";
import { loginValidationSchema } from "../reuseable-code/ValidationSchemas"; // Import the validation schema
import Cookies from "js-cookie"; // Import js-cookie
import Loader from "../reuseable-code/Loader";
import { checkUserLoggedIn } from "../reuseable-code/CheckedLoggedIn"; // Import checkUserLoggedIn function
import { useDispatch } from "react-redux";
import { setUserId } from "../../redux/user/userSlice";
function Login() {
  const [passwordStatus, setPasswordStatus] = useState(false);
  const [error, setError] = useState({});
  const [usersData, setUserData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state
  const dispatch = useDispatch();

  const matchUserData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(import.meta.env.VITE_USER_KEY);
      const user = response.data.find(
        (user) =>
          user.email === usersData.email && user.password === usersData.password
      );
      return user || null;
    } catch (err) {
      console.error("Error fetching user data:", err);
      setLoading(false);
      return null;
    }
  };

  useEffect(() => {
    if (checkUserLoggedIn()) {
      navigate("/"); //Navigate to home page
    }
  }, [navigate]);

  const handleChange = (e) => {
    setUserData({
      ...usersData,
      [e.target.id]: e.target.value,
    });
    setError({
      ...error,
      [e.target.id]: "",
    });
  };

  const validate = async () => {
    try {
      await loginValidationSchema().validate(usersData, {
        abortEarly: false,
      });
      setError({}); // Clear errors if validation passes
      return true;
    } catch (err) {
      const errors = {};
      err.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      setError(errors);
      window.scrollTo(0, 0);
      return false;
    }
  };

  const handleLogin = async () => {
    if (await validate()) {
      setLoading(true);
      const user = await matchUserData();
      if (user) {
        const expires = new Date();
        expires.setDate(expires.getDate() + 7); // Set expiration to 7 days from now

        Cookies.set("user_session", JSON.stringify(user.token), {
          expires: expires, // Set expiration as a Date object
          secure: import.meta.env.NODE_ENV === "production", // Only set secure : true if using HTTPS
          sameSite: "Strict",
        });
        // await setCookie(axios, dispatch, setUserId, Cookies);
        dispatch(setUserId(user.id));
        setUserData({ email: "", password: "" });
        navigate("/");
      } else {
        setError({ password: "Invalid email or password." });
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };
  const handleKeyDown = (e, nextField, prevField) => {
    if (e.key === "ArrowDown") {
      document.getElementById(nextField)?.focus(); // Move to next field
    } else if (e.key === "ArrowUp") {
      document.getElementById(prevField)?.focus(); // Move to previous field
    } else if (e.key === "Enter") {
      handleLogin();
    }
  };
  return (
    <>
      {loading && <Loader />}
      <div className="breadcrumbs">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <p className="bread fw-bold">
                <span>
                  <Link to="/userlogin" className="pointer-cursor">
                    Users
                  </Link>
                </span>{" "}
                / <span>Login</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        id="userLogin"
      >
        <div className="row sign-up">
          <div className="col-lg-6 info">
            <div className="info-panel">
              <h1>Hello</h1>
              <p>Register to use all features on our site</p>
              <Link to="/usersignup">
                <button>Sign Up</button>
              </Link>
            </div>
          </div>
          <div className="col-lg-6">
            <form className="d-flex">
              <h1>Login With</h1>
              <div className="social-icons">
                <Link to="#" className="icon">
                  <i className="fa-brands fa-google-plus-g"></i>
                </Link>
                <Link to="#" className="icon">
                  <i className="fa-brands fa-facebook-f"></i>
                </Link>
                <Link to="#" className="icon">
                  <i className="fa-brands fa-github"></i>
                </Link>
                <Link to="#" className="icon">
                  <i className="fa-brands fa-linkedin-in"></i>
                </Link>
              </div>
              <h1>OR</h1>
              <div className="d-flex justify-content-start align-items-start flex-column">
                <div className="email mb-3 d-flex justify-content-start align-items-start flex-column">
                  <input
                    id="email"
                    value={usersData.email}
                    onChange={handleChange}
                    onKeyDown={(e) => handleKeyDown(e, "password", "")}
                    type="text"
                    placeholder="Email"
                  />
                  {error.email && (
                    <span
                      className="text-danger fw-bold"
                      style={{ fontSize: "13px" }}
                    >
                      {error.email}
                    </span>
                  )}
                </div>
                <div className="password d-flex justify-content-center align-items-center">
                  <input
                    id="password"
                    value={usersData.password}
                    onChange={handleChange}
                    onKeyDown={(e) => handleKeyDown(e, "", "email")}
                    type={passwordStatus ? "text" : "password"}
                    placeholder="Password"
                  />
                  <span onClick={() => setPasswordStatus(!passwordStatus)}>
                    {passwordStatus ? (
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/709/709612.png"
                        alt="Show"
                        height={20}
                      />
                    ) : (
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/2767/2767146.png"
                        alt="Hide"
                        height={20}
                      />
                    )}
                  </span>
                </div>
                {error.password && (
                  <span
                    className="text-danger fw-bold"
                    style={{ fontSize: "13px" }}
                  >
                    {error.password}
                  </span>
                )}
              </div>
              <button type="button" onClick={handleLogin}>
                Sign In
              </button>
              <Link
                to="/usersignup"
                className="d-none sign-in-link text-dark mt-2"
              >
                <div className="sign-in-link-container">
                  <span>Create new account</span>{" "}
                  <span className=" fs-1 text-center ms-1">&rarr;</span>
                </div>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
