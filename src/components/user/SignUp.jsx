import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/style.css";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie
import { signUpValidationSchema } from "../reuseable-code/ValidationSchemas"; //Import Validation Schema
import Loader from "../reuseable-code/Loader";
import { checkUserLoggedIn } from "../reuseable-code/CheckedLoggedIn";
import { useDispatch } from "react-redux";
import { setUserId } from "../../redux/user/userSlice";
function SignUp() {
  const [passwordStatus, setPasswordStatus] = useState(false); // Password toggle visibility
  const navigate = useNavigate(); // Navigation
  const [loading, setLoading] = useState(false); // Loading state
  const dispatch = useDispatch();
  // User details
  const [usersData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({}); // To store error message object

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

  useEffect(() => {
    if (checkUserLoggedIn()) {
      navigate("/");
    }
  }, [navigate]);

  const validate = async () => {
    try {
      await signUpValidationSchema().validate(usersData, {
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

  const matchUserData = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_USER_KEY);
      const existingUser = await response.data.find(
        (user) => user.email === usersData.email
      );
      return existingUser || null;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const handleSignUp = async () => {
    if (await validate()) {
      const existingUser = await matchUserData();
      if (!existingUser) {
        const mockToken = `token-${usersData.email}-${Date.now()}`;
        const userWithToken = { ...usersData, token: mockToken };
        setLoading(true);
        try {
          const response = await axios.post(
            import.meta.env.VITE_USER_KEY,
            userWithToken
          );
          console.log(response.data.id);

          const expires = new Date();
          expires.setDate(expires.getDate() + 7); // Set expiration to 7 days from now

          Cookies.set("user_session", JSON.stringify(response.data.token), {
            expires: expires, // Set expiration as a Date object
            secure: process.env.NODE_ENV === "production", // Only set secure : true if using HTTPS
            sameSite: "Strict",
          });
          dispatch(setUserId(response.data.id));
          setUserData({ name: "", email: "", password: "" });
          navigate("/");
        } catch (error) {
          setError({ general: "Signup failed. Please try again." }); // More general error message
          console.error("Error during signup:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setError({ email: "Email already exists." });
      }
    }
  };

  const handleKeyDown = (e, nextField, prevField) => {
    if (e.key === "ArrowDown") {
      document.getElementById(nextField)?.focus(); // Move to next field
    } else if (e.key === "ArrowUp") {
      document.getElementById(prevField)?.focus(); // Move to previous field
    } else if (e.key === "Enter") {
      handleSignUp();
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
                / <span>Sign Up</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        id="userLogin"
      >
        <div className="row">
          <div className="col-lg-6">
            <form>
              <h1>Register With</h1>
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
                    id="name"
                    value={usersData.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Name"
                    onKeyDown={(e) => handleKeyDown(e, "email", "")}
                  />
                  {error.name && (
                    <span
                      className="text-danger fw-bold"
                      style={{ fontSize: "13px" }}
                    >
                      {error.name}
                    </span>
                  )}
                </div>
                <div className="email mb-3 d-flex justify-content-start align-items-start flex-column">
                  <input
                    id="email"
                    value={usersData.email}
                    onChange={handleChange}
                    type="text"
                    placeholder="Email"
                    onKeyDown={(e) => handleKeyDown(e, "password", "name")}
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
                    type={passwordStatus ? "text" : "password"}
                    placeholder="Password"
                    onKeyDown={(e) => handleKeyDown(e, "", "email")}
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
              <button type="button" className="mt-3" onClick={handleSignUp}>
                Sign Up
              </button>
              <Link
                to="/userlogin"
                className="d-none sign-in-link text-dark mt-2"
              >
                Already have an account?
              </Link>
            </form>
          </div>
          <div className="col-lg-6 info">
            <div className="info-panel">
              <h1>Welcome Back!</h1>
              <p>Provide your personal details to use all features</p>
              <Link to="/userlogin">
                <button>Sign In</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
