import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../reuseable-code/Loader";
import { ordersDataLength } from "../../redux/order/orderSlice";

function MyOrders() {
  // Get the logged-in user ID from the Redux store
  const userId = useSelector((state) => state.user.userId);

  // State to store order data and loading state
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize Redux dispatch function
  const dispatch = useDispatch();

  // Fetch orders on component mount or when userId changes
  useEffect(() => {
    const getOrderData = async () => {
      setLoading(true); // Start loading
      try {
        // Make API request to get user orders
        const res = await axios.get(import.meta.env.VITE_USER_ORDERS_KEY);

        // Filter orders by the current logged-in user
        const filteredOrders = res.data.filter(
          (order) => order.userId === userId
        );

        // Sort orders by orderId in descending order (newest first)
        const sortOrders = filteredOrders.sort((a, b) => {
          return b.orderId - a.orderId;
        });

        // Dispatch the length of the order list to Redux (optional usage)
        dispatch(ordersDataLength(orderData.length));

        // Update state with the sorted order data
        setOrderData(sortOrders);
      } catch (err) {
        // Handle errors during the API request
        console.error("Error fetching order data: ", err);
        setOrderData([]); // Set empty array if there's an error
      } finally {
        setLoading(false); // Stop loading regardless of success or error
      }
    };

    // Fetch order data only if userId is available (user is logged in)
    if (userId) {
      getOrderData();
    }
  }, [userId, dispatch, orderData.length]); // Re-run the effect when userId or orderData length changes

  return (
    <>
      {/* Show a loader while the data is being fetched */}
      {loading && <Loader />}

      {/* Breadcrumbs for navigation */}
      <div className="breadcrumbs">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <p className="bread fw-bold">
                <span>
                  <Link to={`/users/dashboard/`}>Users</Link>
                </span>{" "}
                / <span>My Orders</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main container for order details */}
      <div className="container" id="order-id">
        {/* Check if orders exist and render them */}
        {orderData && orderData.length > 0 ? (
          orderData.map((order) => (
            <div key={order.orderId} className="order-row">
              {/* Order Header containing order summary */}
              <div className="order-header">
                <div className="order-info">
                  <div className="order-date">
                    <p>
                      <strong>Ordered Time:</strong> {order.orderedTime}
                    </p>
                  </div>
                  <div className="order-amount">
                    <p>
                      <strong>Total Amount:</strong> ₹{order.finalAmount}
                    </p>
                  </div>
                  <div className="order-shipping">
                    <p className="shipping-text">Ship to</p>
                    <div className="shipping-address">
                      {/* Display shipping address of the user */}
                      <p className="mb-1">
                        <strong>
                          {order.user.name} {order.user.lastname}
                        </strong>
                      </p>
                      <p className="mb-0">
                        {order.user.address}, {order.user.town}{" "}
                        {order.user.state} {order.user.postalcode}{" "}
                        {order.user.country}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Display the unique Order ID */}
                <div className="order-id">
                  <p>
                    <strong>Order ID:</strong> #{order.orderId}
                  </p>
                </div>
              </div>

              {/* Products List - Each order contains a list of products */}
              <div className="products-list">
                {order.products.map((product) => (
                  <div className="product-row" key={product.id}>
                    <div className="product-image">
                      <img src={product.image} alt={product.title} />
                    </div>
                    <div className="product-details">
                      <p>
                        <strong>{product.title}</strong>
                      </p>
                      <p>
                        <strong>Price:</strong> ₹{product.price}
                        <strong className="ms-3">Qty:</strong>{" "}
                        {product.quantity}
                      </p>
                      <div className="product-actions">
                        {/* Button to go to product listing page */}
                        <Link to="/allproducts">
                          <button className="btn buy-again">
                            Buy it Again
                          </button>
                        </Link>
                        {/* Button to view detailed product page */}
                        <Link to={`/productdetail/${product.id}`}>
                          <button className="btn show-details">
                            Show Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          // Display message if no orders are found
          <div className="text-center">
            <h1>No orders yet :(</h1>
          </div>
        )}
      </div>
    </>
  );
}

export default MyOrders;
