import React, { useEffect, useRef } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Make sure to install js-cookie
import { checkAdminLoggedIn } from "../reuseable-code/CheckedLoggedIn";

function Admin() {
  const navigate = useNavigate();
  const navbarTogglerRef = useRef(null);
  const navbarCollapseRef = useRef(null);

  // Logout function to clear session token
  const logout = () => {
    Cookies.remove("admin_session");
    navigate("/adminlogin"); // Redirect to login
  };

  // Close navbar after clicking a link
  const closeNavbar = () => {
    if (navbarCollapseRef.current.classList.contains("show")) {
      navbarTogglerRef.current.click(); // Simulate click to close
    }
  };

  useEffect(() => {
    if (!checkAdminLoggedIn()) {
      navigate("/adminlogin"); // Redirect if not logged in
    }
  }, [navigate]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2">
          {/* Sidebar */}
          <nav className="navbar navbar-expand-lg navbar-light" id="sidebarNav">
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
                      to="/admin/dashboard"
                      className="nav-link fw-bold"
                      onClick={closeNavbar}
                    >
                      <i className="fa-solid fa-house"></i>
                      Main dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/admin/userdata"
                      className="nav-link fw-bold"
                      onClick={closeNavbar}
                    >
                      <i className="fa-solid fa-user"></i>
                      users
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/admin/products"
                      className="nav-link fw-bold"
                      onClick={closeNavbar}
                    >
                      <i className="fa-solid fa-box"></i>
                      Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/admin/userorders"
                      className="nav-link fw-bold"
                      onClick={closeNavbar}
                    >
                      <i className="fa-solid fa-cart-shopping"></i>
                      Orders
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/admin/addproducts"
                      className="nav-link fw-bold"
                      onClick={closeNavbar}
                    >
                      <i className="fa-solid fa-tag"></i>
                      Add Product
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
  );
}

export default Admin;
