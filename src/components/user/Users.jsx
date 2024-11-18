import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom"; // Importing components from react-router-dom
import { checkUserLoggedIn } from "../reuseable-code/CheckedLoggedIn"; // Function to check if the user is logged in
import { useDispatch, useSelector } from "react-redux"; // For interacting with Redux store
import { clearUserId } from "../../redux/user/userSlice"; // Action to clear user data from Redux store
import axios from "axios"; // For making HTTP requests
import Loader from "../reuseable-code/Loader"; // Custom loader component
import { clearCartProducts } from "../../redux/cart/cartSlice"; // Action to clear cart products
import { clearWishlist } from "../../redux/cart/wishlistslice"; // Action to clear wishlist

function Users() {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const navbarTogglerRef = useRef(null); // Reference for the navbar toggler button
  const navbarCollapseRef = useRef(null); // Reference for the collapsible navbar
  const dispatch = useDispatch(); // Hook to dispatch actions to Redux store

  // Fetching the userId from Redux store
  const userId = useSelector((state) => state.user.userId);
  
  // State to manage loading state and user information
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
  });

  // Function to fetch user info from the backend based on userId
  const fetchUserInfo = (userId) => {
    setLoading(true); // Set loading to true while fetching data
    axios
      .get(import.meta.env.VITE_USER_KEY + userId) // Make GET request to the user API
      .then((response) => {
        // On success, set user info in state
        setUserInfo({
          name: response.data.name,
          email: response.data.email,
        });
      })
      .catch((error) => {
        console.error(error); // Log any error
      })
      .finally(() => {
        setLoading(false); // Set loading to false once request completes
      });
  };

  // Function to close the navbar after clicking on a link
  const closeNavbar = () => {
    // Check if the navbar is open and close it
    if (navbarCollapseRef.current.classList.contains("show")) {
      navbarTogglerRef.current.click(); // Simulate a click to close the navbar
    }
  };

  // Logout function to clear the user's session and redirect to login page
  const logout = () => {
    dispatch(clearUserId()); // Clear the userId from Redux store
    dispatch(clearCartProducts()); // Clear cart data from Redux store
    dispatch(clearWishlist()); // Clear wishlist data from Redux store
    navigate("/userlogin"); // Redirect the user to the login page
  };

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    if (!checkUserLoggedIn()) {
      navigate("/userlogin"); // If not logged in, redirect to login page
    }
  }, [navigate]); // This effect runs whenever navigate changes

  // Fetch user information when the userId changes
  useEffect(() => {
    if (userId) {
      fetchUserInfo(userId); // Fetch user info if userId exists
    }
  }, [userId]); // This effect runs whenever userId changes

  // Handle profile picture click, it fetches user info
  const handleProfileClick = () => {
    if (userId) {
      fetchUserInfo(userId); // Fetch user info when profile image is clicked
    }
  };

  return (
    <>
      {loading && <Loader />} {/* Show loading spinner while data is loading */}
      <div className="container-fluid px-0" id="users">
        <div className="row">
          <div className="col-lg-2">
            {/* Sidebar */}
            <nav className="navbar navbar-expand-lg navbar-light" id="sidebarNav">
              <div className="container-fluid">
                <button
                  ref={navbarTogglerRef} // Reference for the navbar toggler
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" ref={navbarCollapseRef} id="navbarNav">
                  <ul className="navbar-nav mx-3 mt-4">
                    {/* User Profile */}
                    <li className="nav-item">
                      <Link to={`/users/dashboard`} className="nav-link fw-bold" onClick={closeNavbar}>
                        <div className="d-flex justify-content-start align-items-center user-info">
                          <img
                            src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg"
                            alt="Profile"
                            onClick={handleProfileClick} // Fetch user info when profile picture is clicked
                          />
                          <div className="user-name">
                            <span>Hello,</span>
                            {userInfo && <h5>{userInfo.name}</h5>} {/* Display user name */}
                          </div>
                        </div>
                      </Link>
                    </li>
                    {/* Dashboard Link */}
                    <li className="nav-item">
                      <Link to={`/users/dashboard`} className="nav-link fw-bold" onClick={closeNavbar}>
                        <i className="fa-solid fa-house"></i>
                        Dashboard
                      </Link>
                    </li>
                    {/* My Orders Link */}
                    <li className="nav-item">
                      <Link to="/users/orders" className="nav-link fw-bold" onClick={closeNavbar}>
                        <i className="fa-solid fa-cart-shopping"></i>
                        My Orders
                      </Link>
                    </li>
                    {/* Account Info Link */}
                    <li className="nav-item">
                      <Link to="/users/useraccount" className="nav-link fw-bold" onClick={closeNavbar}>
                        <i className="fa-solid fa-user"></i>
                        Account info
                      </Link>
                    </li>
                    {/* Logout Button */}
                    <li className="nav-item">
                      <button onClick={logout} className="btn btn-dark mt-2 logout-btn">
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            {/* Sidebar */}
          </div>

          {/* Main content area */}
          <div className="col-lg-10">
            <Outlet /> {/* Render child routes */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Users;
