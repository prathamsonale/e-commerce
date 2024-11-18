import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie
import { checkAdminLoggedIn } from "./reuseable-code/CheckedLoggedIn";

function AdminLogin() {
  const [passwordStatus, setPasswordStatus] = useState(false);
  const [successful, setSuccessful] = useState("");
  const [error, setError] = useState({});
  const [data, setData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
    setError((prev) => ({ ...prev, [`${e.target.id}Error`]: "" }));
    setSuccessful("");
  };

  useEffect(() => {
    if (checkAdminLoggedIn()) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const validate = () => {
    const errMessages = {};
    if (!data.username.trim()) {
      errMessages.usernameError = "Username is required";
    } else if (data.username.trim() !== import.meta.env.VITE_ADMIN_USERNAME) {
      errMessages.usernameError = "Wrong Username";
    }
    if (!data.password.trim()) {
      errMessages.passwordError = "Password is required";
    } else if (data.password.trim() !== import.meta.env.VITE_ADMIN_PASSWORD) {
      errMessages.passwordError = "Wrong Password";
    }
    setError(errMessages);
    return Object.keys(errMessages).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (validate()) {
      setSuccessful("Login Successful!");
      const expires = new Date();
      expires.setDate(expires.getDate() + 7);
      const sessionToken = "secureSessionToken"; // Replace with server-side token
      Cookies.set("admin_session", sessionToken, {
        expires: expires,
        secure: process.env.NODE_ENV === "production",
      }); // Use js-cookie to set the cookie
      navigate("/admin/dashboard");
      setData({ username: "", password: "" });
    }
  };

  const handleKeyDown = (e, nextField, prevField) => {
    if (e.key === "ArrowDown") {
      document.getElementById(nextField)?.focus(); // Move to next field
    } else if (e.key === "ArrowUp") {
      document.getElementById(prevField)?.focus(); // Move to previous field
    } else if (e.key === "Enter") {
      handleSubmit(e);
    }
  };
  return (
    <>
      <div className="breadcrumbs">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="bread fw-bold">
                <span>
                  <Link to={"/"} className="pointer-cursor">
                    Home
                  </Link>
                </span>{" "}
                / <span>Admin Login</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid mt-5 mb-5" id="login">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-lg-3 border border-dark rounded p-5 login">
            <div className="text-center fs-3 mb-3">
              <b>Admin Login</b>
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="fw-bold mb-1">
                Username
              </label>
              <div className="d-flex text-center password">
                <input
                  value={data.username}
                  type="text"
                  id="username"
                  onChange={handleChange}
                  onKeyDown={(e) => handleKeyDown(e, "password", "")} // Add keydown event for Enter
                  className="form-control"
                />
              </div>
              {error.usernameError && (
                <span className="text-danger fw-bold">
                  {error.usernameError}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="password" className="fw-bold mb-1">
                Password
              </label>
              <div className="d-flex text-center password">
                <input
                  value={data.password}
                  id="password"
                  type={passwordStatus ? "text" : "password"} // Toggle password visibility
                  className="form-control mb-2"
                  onChange={handleChange}
                  onKeyDown={(e) => handleKeyDown(e, "", "username")} // Add keydown event for Enter
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
              {error.passwordError && (
                <span className="text-danger fw-bold">
                  {error.passwordError}
                </span>
              )}
              <div className="text-center mt-3">
                <button className="btn btn-success" onClick={handleSubmit}>
                  Submit
                </button>
                {successful && (
                  <div className="text-success fw-bold mt-5">{successful}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
