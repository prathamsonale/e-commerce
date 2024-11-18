import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserData() {
  // State hooks to manage user data, filtered data, loading state, and search term
  const [userData, setUserData] = useState([]); // Store the fetched user data
  const [filteredData, setFilteredData] = useState([]); // Store filtered user data based on search term
  const [loading, setLoading] = useState(true); // Track loading state
  const [searchTerm, setSearchTerm] = useState(""); // Track the search term entered by the user

  // Function to fetch user data from the API
  const getData = async () => {
    setLoading(true); // Set loading state to true before fetching data
    try {
      // Fetch data from the API
      const res = await axios.get(import.meta.env.VITE_USER_KEY);
      setUserData(res.data); // Set user data
      setFilteredData(res.data); // Set filtered data initially to all users
    } catch (error) {
      console.log(error); // Log any errors that occur during the fetch
    } finally {
      setLoading(false); // Set loading to false after fetching or error
    }
  };

  // Fetch user data when the component mounts
  useEffect(() => {
    getData();
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  // Function to handle user deletion
  const handleDelete = (id) => {
    // Make a DELETE request to remove a user from the database
    axios
      .delete(`${import.meta.env.VITE_USER_KEY}${id}`)
      .then(() => {
        // Re-fetch the data to update the user list after deletion
        getData();
      })
      .catch((error) => {
        console.log("Error deleting user:", error); // Log error if delete fails
      });
  };

  // Function to filter users based on the search term
  const handleSearch = (e) => {
    const term = e.target.value; // Get the search term from the input field
    setSearchTerm(term); // Update the search term state

    if (term === "") {
      // If search term is empty, show all users
      setFilteredData(userData);
    } else {
      // Filter users based on ID, name, or email matching the search term
      const filtered = userData.filter((user) => {
        const userId = user.id.toString(); // Convert user ID to string for comparison
        const userName = user.name.toLowerCase(); // Convert name to lowercase for case-insensitive matching
        const email = user.email.toLowerCase(); // Convert email to lowercase for case-insensitive matching

        return (
          userId.includes(term) || // Match user ID with search term
          userName.includes(term.toLowerCase()) || // Match user name with search term
          email.includes(term.toLowerCase()) // Match user email with search term
        );
      });
      setFilteredData(filtered); // Update the filtered data state
    }
  };

  return (
    <>
      {/* Breadcrumbs for navigation */}
      <div className="breadcrumbs">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <p className="bread fw-bold">
                <span>
                  <Link to={"/admin/dashboard"}>Admin</Link>
                </span>{" "}
                / <span>Users</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search bar for filtering users */}
      <div className="container-fluid mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by User ID, Name, or Email."
          value={searchTerm} // Bind input value to search term state
          onChange={handleSearch} // Call handleSearch function on input change
        />
      </div>

      {/* Loading spinner displayed while fetching data */}
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading users...</p>
        </div>
      ) : (
        <div className="container-fluid">
          {/* Display a message if no users match the search term */}
          {filteredData.length === 0 && searchTerm !== "" ? (
            <div className="alert alert-warning">
              No results found for "{searchTerm}"
            </div>
          ) : filteredData.length === 0 ? (
            <div className="alert alert-info">
              No users available.
            </div>
          ) : null}

          {/* Table displaying filtered user data */}
          <div className="row t-responsive">
            <table className="table table-bordered border-dark text-center table-responsive">
              <thead className="thead">
                <tr>
                  <th>#</th>
                  <th>UserId</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Render each user in the filteredData array */}
                {filteredData.map((user, i) => (
                  <tr key={user.id} className="fw-bold">
                    <td>{i + 1}</td> {/* Display index */}
                    <td>{user.id}</td> {/* Display user ID */}
                    <td>{user.name}</td> {/* Display user name */}
                    <td>{user.email}</td> {/* Display user email */}
                    <td>{user.password}</td> {/* Display user password */}
                    <td style={{ width: "250px" }}>
                      {/* Delete button for each user */}
                      <button
                        onClick={() => handleDelete(user.id)} // Call handleDelete function when clicked
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default UserData;
