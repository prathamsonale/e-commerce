import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/style.css";
import axios from "axios";
import { loginValidationSchema } from "../reuseable-code/ValidationSchemas"; // Import validation schema for login form
import Cookies from "js-cookie"; // Import js-cookie for handling cookies
import Loader from "../reuseable-code/Loader"; // Import the loader component
import { checkUserLoggedIn } from "../reuseable-code/CheckedLoggedIn"; // Import utility function to check if user is logged in
import { useDispatch } from "react-redux";
import { setUserId } from "../../redux/user/userSlice"; // Redux action to set the user ID in the global state

function Login() {
  const [passwordStatus, setPasswordStatus] = useState(false); // State to toggle password visibility
  const [error, setError] = useState({}); // State to hold validation errors
  const [usersData, setUserData] = useState({ email: "", password: "" }); // State to store email and password input values
  const navigate = useNavigate(); // Hook to navigate between pages
  const [loading, setLoading] = useState(false); // State to track loading status
  const dispatch = useDispatch(); // Redux dispatch function to dispatch actions

  // Function to match the user data (email and password) with the database
  const matchUserData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(import.meta.env.VITE_USER_KEY); // Fetch users data from the provided API endpoint
      const user = response.data.find(
        (user) => user.email === usersData.email && user.password === usersData.password
      );
      return user || null; // Return user if found, else return null
    } catch (err) {
      console.error("Error fetching user data:", err); // Handle error if the API request fails
      setLoading(false);
      return null; // Return null if there was an error
    }
  };

  // Check if the user is already logged in when the component mounts
  useEffect(() => {
    if (checkUserLoggedIn()) {
      navigate("/"); // Navigate to home page if the user is logged in
    }
  }, [navigate]);

  // Handle input field changes for email and password
  const handleChange = (e) => {
    setUserData({
      ...usersData,
      [e.target.id]: e.target.value, // Update the specific field (email or password) based on its ID
    });
    setError({
      ...error,
      [e.target.id]: "", // Clear any previous errors for the specific field
    });
  };

  // Validate form data using the loginValidationSchema
  const validate = async () => {
    try {
      await loginValidationSchema().validate(usersData, { abortEarly: false });
      setError({}); // Clear errors if validation passes
      return true;
    } catch (err) {
      const errors = {};
      err.inner.forEach((error) => {
        errors[error.path] = error.message; // Map error messages to field names
      });
      setError(errors); // Set errors in state
      window.scrollTo(0, 0); // Scroll to the top of the page to show validation errors
      return false; // Return false if validation fails
    }
  };

  // Handle login logic when the user clicks the "Sign In" button
  const handleLogin = async () => {
    if (await validate()) { // If validation passes, proceed with login
      setLoading(true); // Set loading state to true
      const user = await matchUserData(); // Match user data with database
      if (user) {
        const expires = new Date();
        expires.setDate(expires.getDate() + 7); // Set cookie expiration to 7 days from now

        // Set user session cookie with user token and other options
        Cookies.set("user_session", JSON.stringify(user.token), {
          expires: expires,
          secure: import.meta.env.NODE_ENV === "production", // Use secure cookies only in production
          sameSite: "Strict",
        });

        // Dispatch Redux action to set user ID in the global state
        dispatch(setUserId(user.id));
        setUserData({ email: "", password: "" }); // Reset the form fields
        navigate("/"); // Redirect to home page after successful login
      } else {
        setError({ password: "Invalid email or password." }); // Show error message if user data doesn't match
        setLoading(false); // Set loading state to false
      }
    } else {
      setLoading(false); // Set loading state to false if validation fails
    }
  };

  // Handle keyboard navigation between fields
  const handleKeyDown = (e, nextField, prevField) => {
    if (e.key === "ArrowDown") {
      document.getElementById(nextField)?.focus(); // Focus on the next field when ArrowDown is pressed
    } else if (e.key === "ArrowUp") {
      document.getElementById(prevField)?.focus(); // Focus on the previous field when ArrowUp is pressed
    } else if (e.key === "Enter") {
      handleLogin(); // Trigger login when Enter key is pressed
    }
  };

  return (
    <>
      {loading && <Loader />} {/* Show loader if loading is true */}
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
      <div className="container-fluid d-flex justify-content-center align-items-center" id="userLogin">
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
                    <span className="text-danger fw-bold" style={{ fontSize: "13px" }}>
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
                  <span className="text-danger fw-bold" style={{ fontSize: "13px" }}>
                    {error.password}
                  </span>
                )}
              </div>
              <button type="button" onClick={handleLogin}>
                Sign In
              </button>
              <Link to="/usersignup" className="d-none sign-in-link text-dark mt-2">
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
