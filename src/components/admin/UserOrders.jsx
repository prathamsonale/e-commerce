import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserOrders() {
  const [orderData, setOrderData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // Track the search term

  const getData = async () => {
    setLoading(true);
    await axios
      .get(import.meta.env.VITE_USER_ORDERS_KEY)
      .then((res) => {
        setOrderData(res.data);
        setFilteredData(res.data); // Initialize filteredData with all orders
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getData();
  }, []);

  // Function to filter orders based on the search term
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term === "") {
      // If search term is empty, show all orders
      setFilteredData(orderData);
    } else {
      // Filter orders based on the search term
      const filtered = orderData.filter((order) => {
        const orderId = order.orderId.toString();
        const userName =
          `${order.user.name} ${order.user.lastname}`.toLowerCase();
        const email = order.user.email.toLowerCase();
        const phoneNo = order.user.phoneno.toString();

        return (
          orderId.includes(term) ||
          userName.includes(term.toLowerCase()) ||
          email.includes(term.toLowerCase()) ||
          phoneNo.includes(term)
        );
      });
      setFilteredData(filtered); // Update filtered data
    }
  };

  const handleDelete = (orderId) => {
    setLoading(true);
    if (orderId) {
      axios
        .delete(import.meta.env.VITE_USER_ORDERS_KEY + orderId)
        .then(() => {
          getData();
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <div className="breadcrumbs">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <p className="bread fw-bold">
                <span>
                  <Link to={"/admin/dashboard"}>Admin</Link>
                </span>{" "}
                / <span>User Orders</span>
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
          placeholder="Search by Order ID, User Name, Email, or Phone No."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading  orders...</p>
        </div>
      ) : (
        <div className="container-fluid" id="userOrders">
          {/* Display message if no results found */}
          {/* Display message if no results found */}
          {filteredData.length === 0 && searchTerm !== "" ? (
            <div className="alert alert-warning">
              No results found for "{searchTerm}"
            </div>
          ) : filteredData.length === 0 ? (
            <div className="alert alert-info">No orders available.</div>
          ) : null}

          <div className="row t-responsive">
            <table className="table table-bordered border-dark text-center table-responsive">
              <thead className="thead">
                <tr>
                  <th>#</th>
                  <th>Order ID</th>
                  <th>User ID</th>
                  <th>Product ID</th>
                  <th>Quantity</th>
                  <th>Product Price</th>
                  <th>Payment ID</th>
                  <th>Total Amount</th>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Phone No.</th>
                  <th>Address</th>
                  <th>Town</th>
                  <th>State</th>
                  <th>Postal Code</th>
                  <th>Country</th>
                  <th>Ordered Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((order, i) => (
                  <React.Fragment key={order.orderId}>
                    {/* Loop through the Products array */}
                    {order.products.map((product, j) => (
                      <tr
                        key={`${order.orderId}-${product.id}`}
                        className="fw-bold"
                      >
                        {j === 0 && (
                          <td rowSpan={order.products.length}>{i + 1}</td>
                        )}
                        {j === 0 && (
                          <td rowSpan={order.products.length}>
                            {order.orderId}
                          </td>
                        )}
                        {j === 0 && (
                          <td rowSpan={order.products.length}>
                            {order.userId}
                          </td>
                        )}
                        <td>{product.id}</td>
                        <td>{product.quantity}</td>
                        <td>&#8377;{product.price}</td>

                        {j === 0 && (
                          <td rowSpan={order.products.length}>
                            {order.paymentId}
                          </td>
                        )}
                        {j === 0 && (
                          <td rowSpan={order.products.length}>
                            &#8377;{order.finalAmount}
                          </td>
                        )}
                        {j === 0 && (
                          <td
                            rowSpan={order.products.length}
                          >{`${order.user.name} ${order.user.lastname}`}</td>
                        )}
                        {j === 0 && (
                          <td rowSpan={order.products.length}>
                            {order.user.email}
                          </td>
                        )}
                        {j === 0 && (
                          <td rowSpan={order.products.length}>
                            {order.user.phoneno}
                          </td>
                        )}
                        {j === 0 && (
                          <td rowSpan={order.products.length}>
                            {order.user.address}
                          </td>
                        )}
                        {j === 0 && (
                          <td rowSpan={order.products.length}>
                            {order.user.town}
                          </td>
                        )}
                        {j === 0 && (
                          <td rowSpan={order.products.length}>
                            {order.user.state}
                          </td>
                        )}
                        {j === 0 && (
                          <td rowSpan={order.products.length}>
                            {order.user.postalcode}
                          </td>
                        )}
                        {j === 0 && (
                          <td rowSpan={order.products.length}>
                            {order.user.country}
                          </td>
                        )}
                        {j === 0 && (
                          <td rowSpan={order.products.length}>
                            {order.orderedTime}
                          </td>
                        )}
                        {j === 0 && (
                          <td rowSpan={order.products.length}>
                            <button
                              onClick={() => handleDelete(order.orderId)}
                              className="btn btn-danger"
                            >
                              Delete
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default UserOrders;
