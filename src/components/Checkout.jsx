import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { checkoutValidationSchema } from "./reuseable-code/ValidationSchemas"; //Import Validation Schema
import { getRazorpayOptions } from "./reuseable-code/PaymentGateway"; //Import getRazorpayOptions function
import { checkUserLoggedIn } from "./reuseable-code/CheckedLoggedIn"; //Import checkUserLoggedIn function
import Loader from "./reuseable-code/Loader"; // Import a loader component to show loading state
import Swal from "sweetalert2"; // For error or success pop-up alerts

function Checkout() {
  // Getting cart products and userId from redux store
  const cartProducts = useSelector((state) => state.cart.cartProducts);
  const userId = useSelector((state) => state.user.userId);

  // State hooks to manage form, errors, loading, and modal visibility
  const [checked, setChecked] = useState(false); // For terms and conditions checkbox
  const location = useLocation(); // To access temporary state passed through routing
  const finalAmount = location.state?.finalAmount; // Final amount from previous page
  const deliveryCharges = location.state?.deliveryCharges; // Delivery charges from previous page
  const [loading, setLoading] = useState(false); // Loading state for Razorpay payment
  const [error, setError] = useState({}); // To store validation errors
  const navigate = useNavigate(); // Used to navigate to different pages programmatically
  const [modalVisible, setModalVisible] = useState(false); // To control modal visibility
  const [hasScrolled, setHasScrolled] = useState(false); // To check if user has scrolled

  //Checkout form state
  const [checkout, setCheckout] = useState({
    countrySelect: "",
    firstname: "",
    lastname: "",
    address: "",
    town: "",
    state: "",
    postalcode: "",
    email: "",
    phoneno: "",
  });

  useEffect(() => {
    if (!checkUserLoggedIn()) {
      // Navigate to login page if cookie not avialabel
      navigate("/userlogin");
    } else if (deliveryCharges === undefined) {
      // Navigate to AllProducts page if user is logged in but accesing the Checkout page in illegal way through url or something else
      navigate("/allproducts");
    }
  }, [navigate, deliveryCharges]);

  const handleChange = (e) => {
    // To update values in checkout object
    setCheckout({
      ...checkout,
      [e.target.id]: e.target.value,
    });
    setError({
      //  To update values in checkout object
      ...error,
      [e.target.id]: "",
    });
  };

  // Validation function for form data
  const validate = async () => {
    try {
      await checkoutValidationSchema().validate(checkout, {
        abortEarly: false,
      }); // Run schema validation
      setError({}); // If validation passes, clear any previous errors
      return true; // Return true if validation is successful
    } catch (err) {
      const errors = {};
      err.inner.forEach((error) => {
        errors[error.path] = error.message; // Map each error to the field
      });
      setError(errors); // Set errors to display them in the form
      window.scrollTo(0, 0); // Scroll to top if validation fails
      return false; // Return false if validation fails
    }
  };

  // Handles Razorpay payment process
  const handlePayment = async () => {
    const isValid = await validate(); // Validate form before proceeding
    if (isValid) {
      if (!checked) {
        Swal.fire({
          title: "Error!",
          text: "Please accept terms and conditions!", // Show error if terms not accepted
          icon: "error",
          confirmButtonText: "Ok",
        });
        window.scrollTo(0, 0);
      } else {
        // If everything is valid, proceed with Razorpay payment
        const options = getRazorpayOptions(
          userId,
          finalAmount,
          cartProducts,
          checkout,
          navigate,
          resetForm,
          setLoading
        );
        var rzp1 = new window.Razorpay(options); // Initialize Razorpay payment gateway
        rzp1.open(); // Open Razorpay payment window
      }
    }
  };

  // Reset the form fields after successful payment
  const resetForm = () => {
    setCheckout({
      countrySelect: "",
      firstname: "",
      lastname: "",
      address: "",
      town: "",
      state: "",
      postalcode: "",
      email: "",
      phoneno: "",
    });
    setChecked(false); // Uncheck terms and conditions
  };

  // Show modal when the user scrolls for the first time
  useEffect(() => {
    const handleScroll = () => {
      if (!hasScrolled) {
        setModalVisible(true); // Show modal on first scroll
        setHasScrolled(true); // Mark as scrolled to prevent showing the modal again
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasScrolled]);

  // Close the modal
  const closeModal = () => {
    setModalVisible(false);
  };

  // Handle keyboard navigation between fields (using arrow keys)
  const handleKeyDown = (e, nextField, prevField) => {
    if (e.key === "ArrowDown") {
      document.getElementById(nextField)?.focus(); // Move to next field on ArrowDown
    } else if (e.key === "ArrowUp") {
      document.getElementById(prevField)?.focus(); // Move to previous field on ArrowUp
    } else if (e.key === "Enter") {
      handlePayment(); // Trigger payment on Enter key press
    }
  };
  return (
    <>
      {loading && <Loader />}
      {/* Breadcrumb navigation */}
      <div className="breadcrumbs">
        <div className="container-fluid">
          <div className="row special">
            <div className="col">
              <p className="bread fw-bold">
                <span>
                  <Link to={"/home"}>Home</Link>
                </span>{" "}
                / <span>Checkout</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>
              &times;
            </span>
            <h3>Notice</h3>
            <p>
              1. Ensure the information you provide is correct and follows the
              proper format.
            </p>
            <p>
              2. Use an Indian phone number and email address (do not use your
              personal details).
            </p>
            <p>
              <b>
                Please note: All payments are for testing purposes. Do not enter
                real bank details, scan QR codes, or make any actual payments.
              </b>
            </p>
            <p>
              <b className="text-danger">
                This message is intended to protect you and your device from
                potential vulnerabilities.
              </b>
            </p>
          </div>
        </div>
      )}

      <div className="container-fluid mt-3" id="checkout">
        <div className="row special">
          <div className="col-lg-8">
            <h3 className="fw-bold">Billing Details</h3>
            <form>
              {/* Country */}
              <div className="mb-3">
                <label className="form-label" htmlFor="countrySelect">
                  Select Country
                </label>
                <select
                  id="countrySelect"
                  className="form-control"
                  value={checkout.countrySelect}
                  onChange={handleChange}
                  style={{ height: "43px" }}
                  onKeyDown={(e) => handleKeyDown(e, "firstname")}
                >
                  <option value="">Select your country</option>
                  <option value="India">India</option>
                  <option value="Japan">Japan</option>
                  <option value="China">China</option>
                </select>
                {error.countrySelect && (
                  <span
                    className="text-danger fw-bold"
                    style={{ fontSize: "13px" }}
                  >
                    {error.countrySelect}
                  </span>
                )}
              </div>

              {/* First Name and Last Name */}
              <div className="row mb-2">
                <div className="col-lg-6 mb-3">
                  <label className="form-label" htmlFor="firstname">
                    First Name
                  </label>
                  <input
                    id="firstname"
                    className="form-control"
                    type="text"
                    placeholder="Your firstname"
                    value={checkout.firstname}
                    onChange={handleChange}
                    onKeyDown={(e) =>
                      handleKeyDown(e, "lastname", "countrySelect")
                    }
                  />
                  {error.firstname && (
                    <span
                      className="text-danger fw-bold"
                      style={{ fontSize: "13px" }}
                    >
                      {error.firstname}
                    </span>
                  )}
                </div>
                <div className="col-lg-6">
                  <label className="form-label" htmlFor="lastname">
                    Last Name
                  </label>
                  <input
                    id="lastname"
                    className="form-control"
                    type="text"
                    placeholder="Your lastname"
                    value={checkout.lastname}
                    onChange={handleChange}
                    onKeyDown={(e) => handleKeyDown(e, "address", "firstname")}
                  />
                  {error.lastname && (
                    <span
                      className="text-danger fw-bold"
                      style={{ fontSize: "13px" }}
                    >
                      {error.lastname}
                    </span>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="mb-3">
                <label className="form-label" htmlFor="address">
                  Address
                </label>
                <textarea
                  id="address"
                  className="form-control"
                  rows="3"
                  placeholder="Your address"
                  value={checkout.address}
                  onChange={handleChange}
                  onKeyDown={(e) => handleKeyDown(e, "town", "lastname")}
                ></textarea>
                {error.address && (
                  <span
                    className="text-danger fw-bold"
                    style={{ fontSize: "13px" }}
                  >
                    {error.address}
                  </span>
                )}
              </div>

              {/*Town */}
              <div className="mb-3">
                <label className="form-label" htmlFor="town">
                  Town or City
                </label>
                <input
                  id="town"
                  className="form-control"
                  type="text"
                  placeholder="Your town or city"
                  value={checkout.town}
                  onChange={handleChange}
                  onKeyDown={(e) => handleKeyDown(e, "state", "address")}
                />
                {error.town && (
                  <span
                    className="text-danger fw-bold"
                    style={{ fontSize: "13px" }}
                  >
                    {error.town}
                  </span>
                )}
              </div>

              {/*State and Postal code */}
              <div className="row mb-2">
                <div className="col-lg-6 mb-3">
                  <label className="form-label" htmlFor="state">
                    State
                  </label>
                  <input
                    id="state"
                    className="form-control"
                    type="text"
                    placeholder="Your state"
                    value={checkout.state}
                    onChange={handleChange}
                    onKeyDown={(e) => handleKeyDown(e, "postalcode", "town")}
                  />
                  {error.state && (
                    <span
                      className="text-danger fw-bold"
                      style={{ fontSize: "13px" }}
                    >
                      {error.state}
                    </span>
                  )}
                </div>
                <div className="col-lg-6">
                  <label className="form-label" htmlFor="postalcode">
                    Zip/Postal code
                  </label>
                  <input
                    id="postalcode"
                    className="form-control"
                    type="text"
                    placeholder="Your zip/postal code"
                    value={checkout.postalcode}
                    onChange={handleChange}
                    onKeyDown={(e) => handleKeyDown(e, "email", "state")}
                  />
                  {error.postalcode && (
                    <span
                      className="text-danger fw-bold"
                      style={{ fontSize: "13px" }}
                    >
                      {error.postalcode}
                    </span>
                  )}
                </div>
              </div>

              {/*Email and Phone number */}
              <div className="row">
                <div className="col-lg-6 mb-3">
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    className="form-control"
                    type="text"
                    placeholder="Your email"
                    value={checkout.email}
                    onChange={handleChange}
                    onKeyDown={(e) => handleKeyDown(e, "phoneno", "postalcode")}
                  />
                  {error.email && (
                    <span
                      className="text-danger fw-bold"
                      style={{ fontSize: "13px" }}
                    >
                      {error.email}
                    </span>
                  )}
                </div>
                <div className="col-lg-6">
                  <div>
                    <label className="form-label" htmlFor="phoneno">
                      Phone Number
                    </label>
                    <input
                      id="phoneno"
                      className="form-control"
                      type="text"
                      placeholder="Your phone number"
                      value={checkout.phoneno}
                      onChange={handleChange}
                      onKeyDown={(e) => handleKeyDown(e, "", "email")}
                    />
                  </div>
                  {error.phoneno && (
                    <span
                      className="text-danger fw-bold"
                      style={{ fontSize: "13px" }}
                    >
                      {error.phoneno}
                    </span>
                  )}
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-3 ms-5 ">
            <h3 className="fw-bold">Cart Total</h3>
            <div className="calculation">
              {cartProducts.map((product) => (
                /* Product info., quantity and price*/
                <div
                  className="d-flex justify-content-between "
                  key={product.id}
                >
                  <h5 className="final-products">
                    {product.quantity} x {product.title}
                  </h5>
                  <h5>&#8377;{product.quantity * product.price}/-</h5>
                </div>
              ))}

              {/* Delivery charges*/}
              <div className="d-flex justify-content-between text-danger">
                <h5>Delivery charges:</h5>
                <h5>&#8377;{deliveryCharges}/-</h5>
              </div>
              <hr />

              {/* Subtotal*/}
              <div className="d-flex justify-content-between">
                <h5>Subtotal:</h5>
                <h5>&#8377;{finalAmount}/-</h5>
              </div>
            </div>

            {/*Terms and condition*/}
            <div className="mt-4">
              <div className="mt-5">
                <input
                  id="term"
                  value="Terms and condition"
                  checked={checked}
                  type="checkbox"
                  className="me-2"
                  onChange={(e) => setChecked(e.target.checked)}
                />
                <label htmlFor="term">
                  I have read and accept the terms and
                </label>
                <label htmlFor="term"> conditions</label>
              </div>
            </div>

            {/*Order button */}
            <div className="text-center mt-4">
              <button onClick={handlePayment} className="btn btn-primary">
                Place an order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
