import axios from "axios"; // Importing axios for making HTTP requests
import React, { useEffect, useState } from "react"; // Importing React and hooks (useEffect, useState)
import { useSelector } from "react-redux"; // Importing useSelector to access Redux store
import { Link } from "react-router-dom"; // Importing Link for routing
import Loader from "../reuseable-code/Loader"; // Importing the Loader component to show loading indicator

function MyAccount() {
  const userId = useSelector((state) => state.user.userId); // Getting the user ID from Redux store
  const [loading, setLoading] = useState(true); // Loading state to show a loader while fetching data
  const [userData, setUserData] = useState({
    name: "", // Initializing user data with empty values
    email: "",
  });
  const [isEditing, setIsEditing] = useState(false); // State to track whether user is in editing mode

  // Handle changes in the input fields (name, email)
  const handleChange = (e) => {
    setUserData({
      ...userData, // Spread the existing data to keep unchanged fields
      [e.target.id]: e.target.value, // Update the corresponding field (name or email)
    });
  };

  // Enable editing when the "Edit" button is clicked
  const handleEdit = () => {
    setIsEditing(true); // Set editing mode to true
  };

  // Update user data on the server when "Save Changes" is clicked
  const handleUpdate = async () => {
    setLoading(true); // Set loading state to true while waiting for the update
    await axios
      .put(import.meta.env.VITE_USER_KEY + userId, userData) // PUT request to update user data on the server
      .then((response) => {
        setUserData(response.data); // Update state with the response data (new user data)
        setIsEditing(false); // Exit editing mode after successful update
      })
      .catch((error) => console.error("Error updating user data", error)) // Log any errors
      .finally(() => setLoading(false)); // Set loading state to false once the operation is complete
  };

  // Fetch user data when the component mounts or userId changes
  useEffect(() => {
    setLoading(true); // Show loader while fetching data
    const getUserData = async () => {
      await axios
        .get(import.meta.env.VITE_USER_KEY + userId) // GET request to fetch user data
        .then((response) => {
          setUserData({
            name: response.data.name, // Update name field
            email: response.data.email, // Update email field
          });
        })
        .catch((error) => console.error("Error fetching user data", error)) // Log any errors
        .finally(() => setLoading(false)); // Hide loader after data fetching is complete
    };
    if (userId) {
      getUserData(); // Fetch user data only if userId exists
    }
  }, [userId]); // Effect will run whenever userId changes

  return (
    <>
      {loading && <Loader />} {/* Show loading spinner if data is being fetched */}
      {/* Breadcrumbs for navigation */}
      <div className="breadcrumbs">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <p className="bread fw-bold">
                <span>
                  <Link to={`/users/dashboard/`}>Users</Link> {/* Link to users dashboard */}
                </span>{" "}
                / <span>My Account</span> {/* Current page */}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content of My Account page */}
      <div className="container">
        <div className="row mb-4">
          {/* Name field */}
          <div className="col-lg-6">
            <div className="d-flex justify-content-between align-items-center">
              <label htmlFor="name" className="form-label">
                <strong>Name</strong>
              </label>
              {/* Edit button to enable editing */}
              <button className="btn text-primary" onClick={handleEdit}>
                <strong>Edit</strong>
              </button>
            </div>
            {/* Input field for name, disabled if not in editing mode */}
            <input
              id="name"
              value={userData.name}
              type="text"
              className="form-control"
              onChange={handleChange}
              disabled={!isEditing} // Disable input if not in editing mode
            />
          </div>

          {/* Email field */}
          <div className="col-lg-6">
            <div className="d-flex justify-content-between align-items-center">
              <label htmlFor="email" className="form-label">
                <strong>Email</strong>
              </label>
              {/* Edit button to enable editing */}
              <button className="btn text-primary" onClick={handleEdit}>
                <strong>Edit</strong>
              </button>
            </div>
            {/* Input field for email, disabled if not in editing mode */}
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

        {/* Show Save Changes button only if in editing mode */}
        {isEditing && (
          <div className="row">
            <div className="col-lg-12 d-flex justify-content-end">
              {/* Save button to trigger user data update */}
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
