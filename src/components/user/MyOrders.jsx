import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../reuseable-code/Loader";
import { ordersDataLength } from "../../redux/order/orderSlice";

function MyOrders() {
  const userId = useSelector((state) => state.user.userId); // Get the logged-in user ID
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const getOrderData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(import.meta.env.VITE_USER_ORDERS_KEY);

        // Filter the orders that match the current user's userId
        const filteredOrders = res.data.filter(
          (order) => order.userId === userId
        );
        const sortOrders = filteredOrders.sort((a, b) => {
          return b.orderId - a.orderId;
        });

        dispatch(ordersDataLength(orderData.length));
        setOrderData(sortOrders);
      } catch (err) {
        console.error("Error fetching order data: ", err);
        setOrderData([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      getOrderData(); // Fetch orders only if userId exists
    }
  }, [userId, dispatch, orderData.length]); // Re-run the effect when userId changes

  return (
    <>
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

      <div className="container" id="order-id">
        {orderData && orderData.length > 0 ? (
          orderData.map((order) => (
            <div key={order.orderId} className="order-row">
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
                      <p></p>
                    </div>
                  </div>
                </div>
                <div className="order-id">
                  <p>
                    <strong>Order ID:</strong> #{order.orderId}
                  </p>
                </div>
              </div>

              {/* Products List (Nested flex rows for products) */}
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
                        <Link to="/allproducts">
                          <button className="btn buy-again">
                            Buy it Again
                          </button>
                        </Link>
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
          <div className="text-center">
            <h1>No orders yet :(</h1>
          </div>
        )}
      </div>
    </>
  );
}

export default MyOrders;
