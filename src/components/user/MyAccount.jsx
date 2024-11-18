import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../reuseable-code/Loader";

function MyAccount() {
  const userId = useSelector((state) => state.user.userId);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });
  const [isEditing, setIsEditing] = useState(false); // State to track if user is editing

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.id]: e.target.value,
    });
  };

  const handleEdit = () => {
    setIsEditing(true); // Enable input fields when "Edit" is clicked
  };

  const handleUpdate = async () => {
    setLoading(true);
    await axios
      .put(import.meta.env.VITE_USER_KEY + userId, userData)
      .then((response) => {
        setUserData(response.data); // Update state with response data
        setIsEditing(false); // Disable input fields after successful update
      })
      .catch((error) => console.error("Error updating user data", error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    const getUserData = async () => {
      await axios
        .get(import.meta.env.VITE_USER_KEY + userId)
        .then((response) => {
          setUserData({
            name: response.data.name,
            email: response.data.email,
          });
        })
        .catch((error) => console.error("Error fetching user data", error))
        .finally(() => setLoading(false));
    };
    if (userId) {
      getUserData();
    }
  }, [userId]);

  return (
    <>
      {loading && <Loader />}
      {/* Breadcrumbs for navigation */}
      <div className="breadcrumbs">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <p className="bread fw-bold">
                <span>
                  <Link to={`/users/dashboard/`}>Users</Link>
                </span>{" "}
                / <span>My Account</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row mb-4">
          <div className="col-lg-6">
            <div className="d-flex justify-content-between align-items-center">
              <label htmlFor="name" className="form-label">
                <strong>Name</strong>
              </label>
              <button className="btn text-primary" onClick={handleEdit}>
                <strong>Edit</strong>
              </button>
            </div>
            <input
              id="name"
              value={userData.name}
              type="text"
              className="form-control"
              onChange={handleChange}
              disabled={!isEditing} // Disable input if not in editing mode
            />
          </div>
          <div className="col-lg-6">
            <div className="d-flex justify-content-between align-items-center">
              <label htmlFor="email" className="form-label">
                <strong>Email</strong>
              </label>
              <button className="btn text-primary" onClick={handleEdit}>
                <strong>Edit</strong>
              </button>
            </div>
            <input
              id="email"
              value={userData.email}
              type="text"
              className="form-control"
              onChange={handleChange}
              disabled={!isEditing} // Disable input if not in editing mode
            />
          </div>
        </div>
        {isEditing && (
          <div className="row">
            <div className="col-lg-12 d-flex justify-content-end">
              <button className="btn btn-primary" onClick={handleUpdate}>
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default MyAccount;
