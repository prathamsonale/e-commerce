import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkUserLoggedIn } from "./reuseable-code/CheckedLoggedIn"; // Import function to check if user is logged in

function ThankYouPage() {
  const navigate = useNavigate(); // Hook to navigate programmatically

  // useEffect hook to check if the user is logged in when the component is mounted
  useEffect(() => {
    // If the user is not logged in, redirect them to the login page
    if (!checkUserLoggedIn()) {
      navigate("/userlogin"); // Navigate to the login page if user is not logged in
    }
  }, [navigate]); // Adding 'navigate' as a dependency to prevent unnecessary re-renders

  return (
    <>
      {/* Breadcrumb navigation */}
      <div className="breadcrumbs">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="bread fw-bold ">
                <span>
                  {/* Link to the homepage */}
                  <Link to={"/"} className="pointer-cursor">
                    Home
                  </Link>
                </span>{" "}
                / <span>Purchase complete</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content of the page */}
      <div className="container">
        <div className="row purchase-page text-center mb-5">
          <div>
            <div>
              {/* Icon indicating success (order completed) */}
              <i className="fa-solid fa-check"></i>
            </div>
            <h1>Thank you for purchasing, Your order is complete</h1>

            {/* Button to navigate to the user's orders */}
            <Link to="/users/orders">
              <button className="btn border border-dark me-3 mb-3">
                View your orders
              </button>
            </Link>

            {/* Button to continue shopping */}
            <Link to="/allproducts">
              <button className="btn border border-dark mb-3">
                <i className="fas fa-shopping-cart me-2 "></i>Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ThankYouPage;
