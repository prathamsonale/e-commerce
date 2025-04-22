import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/style.css";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie for cookie management
import { signUpValidationSchema } from "../reuseable-code/ValidationSchemas"; // Import the validation schema
import Loader from "../reuseable-code/Loader"; // Import Loader component for loading state
import { checkUserLoggedIn } from "../reuseable-code/CheckedLoggedIn"; // Import function to check if user is logged in
import { useDispatch } from "react-redux";
import { setUserId } from "../../redux/user/userSlice"; // Redux action to set user ID

function SignUp() {
  // State hooks for password visibility, form data, errors, and loading
  const [passwordStatus, setPasswordStatus] = useState(false); // Toggles password visibility
  const navigate = useNavigate(); // Navigation hook for redirecting
  const [loading, setLoading] = useState(false); // Loading state when submitting form
  const dispatch = useDispatch(); // Redux dispatch function

  // User form data state (name, email, password)
  const [usersData, setUserData] = useState({
    name: "",
    email: "",
    phone : "",
    password: "",
  });

  // State to store validation error messages
  const [error, setError] = useState({});

  // Handle change in input fields and clear error for the corresponding field
  const handleChange = (e) => {
    setUserData({
      ...usersData,
      [e.target.id]: e.target.value,
    });
    setError({
      ...error,
      [e.target.id]: "", // Reset error for this specific field
    });
  };

  // Use effect to check if the user is logged in, if true, redirect to homepage
  useEffect(() => {
    if (checkUserLoggedIn()) {
      navigate("/"); // Redirect to homepage if logged in
    }
  }, [navigate]);

  // Function to validate form data using the validation schema
  const validate = async () => {
    try {
      // Validate data using Yup schema (signUpValidationSchema)
      await signUpValidationSchema().validate(usersData, {
        abortEarly: false, // Do not stop after the first error
      });
      setError({}); // Clear errors if validation is successful
      return true;
    } catch (err) {
      const errors = {};
      err.inner.forEach((error) => {
        // Collect all validation errors into an object
        errors[error.path] = error.message;
      });
      setError(errors); // Set validation errors
      window.scrollTo(0, 0); // Scroll to the top of the page to show errors
      return false;
    }
  };

  // Function to check if the user already exists in the database
  const matchUserData = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_USER_KEY); // Fetch users from the API
      const existingUser = await response.data.find(
        (user) => user.email === usersData.email // Check if the email already exists
      );
      return existingUser || null; // Return existing user or null
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  // Handle form submission (sign-up process)
  const handleSignUp = async () => {
    if (await validate()) {
      const existingUser = await matchUserData(); // Check if user already exists
      if (!existingUser) {
        const mockToken = `token-${usersData.email}-${Date.now()}`; // Generate a mock token
        const userWithToken = { ...usersData, token: mockToken };
        setLoading(true); // Set loading to true during form submission
        try {
          // Send POST request to create a new user
          const response = await axios.post(
            import.meta.env.VITE_USER_KEY,
            userWithToken
          );
          console.log(response.data.id); // Log the newly created user's ID

          const expires = new Date();
          expires.setDate(expires.getDate() + 7); // Set cookie expiration to 7 days from now

          // Set the user session in cookies
          Cookies.set("user_session", JSON.stringify(response.data.token), {
            expires: expires, // Set expiration as a Date object
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "Strict",
          });

          // Dispatch the user ID to Redux store
          dispatch(setUserId(response.data.id));

          // Clear form fields
          setUserData({ name: "", email: "", phone : "", password: "" });

          // Redirect to homepage
          navigate("/");
        } catch (error) {
          // Set error message if sign-up fails
          setError({ general: "Signup failed. Please try again." });
          console.error("Error during signup:", error);
        } finally {
          setLoading(false); // Reset loading state
        }
      } else {
        // Set error message if email already exists
        setError({ email: "Email already exists." });
      }
    }
  };

  // Handle keyboard navigation between fields (e.g. up/down arrows, enter key)
  const handleKeyDown = (e, nextField, prevField) => {
    if (e.key === "ArrowDown") {
      document.getElementById(nextField)?.focus(); // Move to next field
    } else if (e.key === "ArrowUp") {
      document.getElementById(prevField)?.focus(); // Move to previous field
    } else if (e.key === "Enter") {
      handleSignUp(); // Trigger sign-up on Enter key press
    }
  };

  return (
    <>
      {loading && <Loader />}{" "}
      {/* Show loading spinner if loading state is true */}
      {/* Breadcrumb navigation */}
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
      {/* Main sign-up form */}
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        id="userLogin"
      >
        <div className="row">
          <div className="col-lg-6">
            <form>
              <h1>Register With</h1>

              <div className="d-flex justify-content-start align-items-start flex-column">
                {/* Name input field */}
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
                {/* Email input field */}
                <div className="email mb-3 d-flex justify-content-start align-items-start flex-column">
                  <input
                    id="email"
                    value={usersData.email}
                    onChange={handleChange}
                    type="text"
                    placeholder="Email"
                    onKeyDown={(e) => handleKeyDown(e, "phone", "name")}
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
                {/* Phone input field */}
                <div className="email mb-3 d-flex justify-content-start align-items-start flex-column">
                  <input
                    id="phone"
                    value={usersData.phone}
                    onChange={handleChange}
                    type="text"
                    placeholder="Phone"
                    onKeyDown={(e) => handleKeyDown(e, "password", "email")}
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
                {/* Password input field with toggle visibility */}
                <div className="password d-flex justify-content-center align-items-center">
                  <input
                    id="password"
                    value={usersData.password}
                    onChange={handleChange}
                    type={passwordStatus ? "text" : "password"}
                    placeholder="Password"
                    onKeyDown={(e) => handleKeyDown(e, "", "phone")}
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
              {/* Submit button */}
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
          {/* Info panel for sign-in */}
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
