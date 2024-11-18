import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { checkUserLoggedIn } from "../reuseable-code/CheckedLoggedIn";
import { useDispatch, useSelector } from "react-redux";
import { clearUserId } from "../../redux/user/userSlice";
import axios from "axios";
import Loader from "../reuseable-code/Loader";
import { clearCartProducts } from "../../redux/cart/cartSlice";
import { clearWishlist } from "../../redux/cart/wishlistslice";

function Users() {
  const navigate = useNavigate();
  const navbarTogglerRef = useRef(null);
  const navbarCollapseRef = useRef(null);
  const dispatch = useDispatch();

  // Get userId from Redux store
  const userId = useSelector((state) => state.user.userId);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
  });

  // Function to fetch user info based on userId
  const fetchUserInfo = (userId) => {
    setLoading(true);
    axios
      .get(import.meta.env.VITE_USER_KEY + userId)
      .then((response) => {
        setUserInfo({
          name: response.data.name,
          email: response.data.email,
        });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Close navbar after clicking a link
  const closeNavbar = () => {
    if (navbarCollapseRef.current.classList.contains("show")) {
      navbarTogglerRef.current.click(); // Simulate click to close
    }
  };

  // Logout function to clear session token
  const logout = () => {
    dispatch(clearUserId());
    dispatch(clearCartProducts());
    dispatch(clearWishlist());
    navigate("/userlogin"); // Redirect to login
  };

  // Check if user is logged in
  useEffect(() => {
    if (!checkUserLoggedIn()) {
      navigate("/userlogin");
    }
  }, [navigate]);

  useEffect(() => {
    if (userId) {
      fetchUserInfo(userId);
    }
  }, [userId]);

  const handleProfileClick = () => {
    if (userId) {
      fetchUserInfo(userId);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="container-fluid px-0" id="users">
        <div className="row">
          <div className="col-lg-2">
            {/* Sidebar */}
            <nav
              className="navbar navbar-expand-lg navbar-light"
              id="sidebarNav"
            >
              <div className="container-fluid">
                <button
                  ref={navbarTogglerRef}
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
                <div
                  className="collapse navbar-collapse"
                  ref={navbarCollapseRef}
                  id="navbarNav"
                >
                  <ul className="navbar-nav mx-3 mt-4">
                    <li className="nav-item">
                      <Link
                        to={`/users/dashboard`}
                        className="nav-link fw-bold"
                        onClick={closeNavbar}
                      >
                        <div className="d-flex justify-content-start align-items-center user-info">
                          <img
                            src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg"
                            alt="Profile"
                            onClick={handleProfileClick} // Use the same function on profile image click
                          />
                          <div className="user-name">
                            <span>Hello,</span>
                            {userInfo && <h5>{userInfo.name}</h5>}
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to={`/users/dashboard`}
                        className="nav-link fw-bold"
                        onClick={closeNavbar}
                      >
                        <i className="fa-solid fa-house"></i>
                        Dashboard
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/users/orders"
                        className="nav-link fw-bold"
                        onClick={closeNavbar}
                      >
                        <i className="fa-solid fa-cart-shopping"></i>
                        My Orders
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/users/useraccount"
                        className="nav-link fw-bold"
                        onClick={closeNavbar}
                      >
                        <i className="fa-solid fa-user"></i>
                        Account info
                      </Link>
                    </li>
                    <li className="nav-item">
                      {/* Logout Button */}
                      <button
                        onClick={logout}
                        className="btn btn-dark mt-2 logout-btn"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            {/* Sidebar */}
          </div>

          <div className="col-lg-10">
            <Outlet />
            {/* Outlet is a component from the react-router-dom library that allows you to render child routes in a nested routing structure. */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Users;
