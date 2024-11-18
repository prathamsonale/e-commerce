import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserData() {
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // Track the search term

  // Fetch user data
  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(import.meta.env.VITE_USER_KEY);
      setUserData(res.data);
      setFilteredData(res.data); // Set filtered data as well
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`${import.meta.env.VITE_USER_KEY}${id}`)
      .then(() => {
        getData();
      })
      .catch((error) => {
        console.log("Error deleting user:", error);
      });
  };

  // Function to filter users based on the search term
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term === "") {
      // If search term is empty, show all users
      setFilteredData(userData);
    } else {
      // Filter users based on the search term
      const filtered = userData.filter((user) => {
        const userId = user.id.toString();
        const userName = user.name.toLowerCase();
        const email = user.email.toLowerCase();

        return (
          userId.includes(term) ||
          userName.includes(term.toLowerCase()) ||
          email.includes(term.toLowerCase())
        );
      });
      setFilteredData(filtered); // Update filtered data
    }
  };

  return (
    <>
      <div className="breadcrumbs">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <p className="bread fw-bold ">
                <span>
                  <Link to={"/admin/dashboard"}>Admin</Link>
                </span>{" "}
                / <span>Users</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Search Bar */}
      <div className="container-fluid mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by User ID, Name, or Email."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading users...</p>
        </div>
      ) : (
        <div className="container-fluid">
          {/* Display message if no results found */}
          {filteredData.length === 0 && searchTerm !== "" ? (
            <div className="alert alert-warning">
              No results found for "{searchTerm}"
            </div>
          ) : filteredData.length === 0 ? (
            <div className="alert alert-info">
              No users available.
            </div>
          ) : null}
          
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
                {filteredData.map((user, i) => (
                  <tr key={user.id} className="fw-bold ">
                    <td>{i + 1}</td>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td style={{ width: "250px" }}>
                      <button
                        onClick={() => handleDelete(user.id)}
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
