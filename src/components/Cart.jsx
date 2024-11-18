import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { increment, decrement, removeProduct } from "../redux/cart/cartSlice";
import Swal from "sweetalert2"; // For error or success pop-up alerts
import { checkUserLoggedIn } from "./reuseable-code/CheckedLoggedIn";
import { LazyLoadImage } from "react-lazy-load-image-component"; // Import LazyLoadImage
import "react-lazy-load-image-component/src/effects/blur.css"; //  Adds a blur effect while loading

function Cart() {
  const cartProducts = useSelector((state) => state.cart.cartProducts);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  // State for managing delivery, discount, and coupon
  const [delivery, setDelivery] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [couponError, setCouponError] = useState("");
  const [SubTotal, setSubTotal] = useState(0);

  const length = String(SubTotal).length;
  useEffect(() => {
    if (length === 3) setDelivery(40);
    else if (length === 4) setDelivery(70);
    else if (length === 5) setDelivery(100);
    else if (length > 5) setDelivery(150);
    else setDelivery(0);
  }, [SubTotal, length]);

  const handleChange = (e) => {
    setCoupon(e.target.value);
    setCouponError("");
  };
  useEffect(() => {
    if (cartProducts) {
      setSubTotal(
        cartProducts.reduce((total, product) => {
          return total + product.price * product.quantity;
        }, 0)
      );
    }
  }, [cartProducts]);

  // Apply coupon logic
  const applyCoupon = () => {
    const couponValue = Number(coupon);
    if (couponValue > 0 && couponValue <= SubTotal) {
      setDiscount(couponValue);
      setCouponError("");
    } else {
      setCouponError(
        couponValue > SubTotal
          ? "Coupon cannot be greater than total amount."
          : "Coupon is not valid!"
      );
    }
    setCoupon("");
  };

  // Handle Enter key for coupon application
  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      applyCoupon();
    }
  };

  const handleCheckout = () => {
    if (checkUserLoggedIn()) {
      const finalAmount = SubTotal + delivery - discount;
      const deliveryCharges = delivery;
      navigate("/checkout", {
        state: { finalAmount, deliveryCharges },
      }); // Navigate with totalAmount
    } else {
      Swal.fire({
        title: "Error!",
        text: "Login or Signup is required!",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Go to Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/userlogin");
        }
      });
    }
  };

  // Show empty cart message if no products
  const isEmptyCart = cartProducts.length === 0;

  return (
    <div id="cart">
      <div className="breadcrumbs">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="bread fw-bold">
                <span>
                  <Link to="/" className="pointer-cursor">
                    Home
                  </Link>
                </span>{" "}
                / <span>Cart</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {isEmptyCart ? (
        <div className="text-center empty-cart">
          <LazyLoadImage
            src="https://i.imgur.com/dCdflKN.png"
            alt="empty-cart"
            effect="blur" // Optional: Adds a blur effect while loading
          />
          <h5>Add something to make me happy :)</h5>
          <Link to="/allproducts">
            <button className="btn btn-primary">Continue shopping</button>
          </Link>
        </div>
      ) : (
        <div className="container-fluid mt-3">
          {cartProducts.map((product) => (
            <div className="row special" key={product.id}>
              <div className="column">
                <div className="image-container">
                  <Link to={`/productdetail/${product.id}`}>
                    <img src={product.imageUrl} alt="product" />
                  </Link>
                </div>
              </div>
              <div className="column">
                <h5>{product.title}</h5>
              </div>
              <div className="column">
                <h5>
                  <span className="d-none">Price: </span>&#8377;{product.price}
                </h5>
              </div>
              <div className="column">
                <button
                  onClick={() => dispatch(decrement(product.id))}
                  className="btn btn-secondary me-3"
                >
                  -
                </button>
                {product.quantity}
                <button
                  onClick={() => dispatch(increment(product.id))}
                  className="btn btn-secondary ms-3"
                >
                  +
                </button>
              </div>
              <div className="column">
                <h5>
                  <span className="d-none">Total: </span>&#8377;
                  {product.price * product.quantity}
                </h5>
              </div>
              <div className="column">
                <button
                  onClick={() => dispatch(removeProduct(product.id))}
                  className="btn btn-danger me-3"
                >
                  Remove
                </button>
              </div>
              <hr className="mt-3" />
            </div>
          ))}
          <div className="container" id="calculation">
            <div className="row">
              <div className="col-lg-9 d-flex">
                <div>
                  <input
                    type="text"
                    value={coupon}
                    onChange={handleChange}
                    placeholder="Your Coupon Number 10,50,500..."
                    onKeyDown={handleKeydown}
                  />
                  {couponError && (
                    <span className="text-danger fw-bold">{couponError}</span>
                  )}
                </div>
                <button className="btn btn-secondary" onClick={applyCoupon}>
                  Apply coupon
                </button>
              </div>
              <div className="col-lg-3 text-secondary">
                <div className="calculation">
                  <div className="d-flex justify-content-between">
                    <h5>Subtotal:</h5>
                    <h5>&#8377;{SubTotal}/-</h5>
                  </div>
                  <div className="d-flex justify-content-between">
                    <h5>Delivery:</h5>
                    <h5>&#8377;{delivery}/-</h5>
                  </div>
                  <div className="d-flex justify-content-between">
                    <h5>Discount:</h5>
                    <h5>&#8377;{discount}/-</h5>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <h5>Total:</h5>
                    <h5>&#8377;{SubTotal + delivery - discount}/-</h5>
                  </div>
                  <div className="text-center mt-3">
                    <button
                      className="btn btn-primary"
                      onClick={handleCheckout} // Call handleCheckout on click
                    >
                      Proceed to checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
