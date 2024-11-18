import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkUserLoggedIn } from "./reuseable-code/CheckedLoggedIn";
function ThankYouPage() {
  const navigate = useNavigate(); //For navigation

  useEffect(() => {
    if (!checkUserLoggedIn()) {
      // navigate to login page if cookie not avialabel
      navigate("/userlogin");
    }
  });
  return (
    <>
      <div className="breadcrumbs">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="bread fw-bold ">
                <span>
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
      <div className="container">
        <div className="row purchase-page text-center mb-5">
          <div>
            <div>
              <i className="fa-solid fa-check"></i>
            </div>
            <h1>Thank you for purchasing, Your order is complete</h1>
            <Link to="/users/orders">
              <button className="btn border border-dark me-3 mb-3">
                View your orders
              </button>
            </Link>
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
