import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserOrders() {
  // State variables to manage order data, filtered data, loading state, and search term
  const [orderData, setOrderData] = useState([]);  // Holds all orders fetched from the API
  const [filteredData, setFilteredData] = useState([]);  // Holds filtered orders based on search
  const [loading, setLoading] = useState(true);  // State to track if data is being loaded
  const [searchTerm, setSearchTerm] = useState("");  // Holds the current search term

  // Function to fetch data from the API
  const getData = async () => {
    setLoading(true);  // Start loading
    await axios
      .get(import.meta.env.VITE_USER_ORDERS_KEY)  // Fetch orders from the API
      .then((res) => {
        setOrderData(res.data);  // Set the fetched data to orderData state
        setFilteredData(res.data);  // Initialize filteredData with all orders
      })
      .catch((e) => {
        console.log(e);  // Log any error during the fetch
      })
      .finally(() => setLoading(false));  // Stop loading after fetch
  };

  // UseEffect hook to fetch data when the component is mounted
  useEffect(() => {
    getData();
  }, []);  // Empty dependency array ensures it runs only once after the component is mounted

  // Function to handle search input and filter orders based on search term
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);  // Update the search term

    if (term === "") {
      // If search term is empty, reset to show all orders
      setFilteredData(orderData);
    } else {
      // Filter orders based on the search term
      const filtered = orderData.filter((order) => {
        const orderId = order.orderId.toString();
        const userName = `${order.user.name} ${order.user.lastname}`.toLowerCase();
        const email = order.user.email.toLowerCase();
        const phoneNo = order.user.phoneno.toString();

        return (
          orderId.includes(term) || 
          userName.includes(term.toLowerCase()) ||
          email.includes(term.toLowerCase()) ||
          phoneNo.includes(term)
        );
      });
      setFilteredData(filtered);  // Update filtered data based on search
    }
  };

  // Function to handle deletion of an order
  const handleDelete = (orderId) => {
    setLoading(true);  // Start loading
    if (orderId) {
      axios
        .delete(import.meta.env.VITE_USER_ORDERS_KEY + orderId)  // Make DELETE request to remove order
        .then(() => {
          getData();  // Refresh the order data after deletion
        })
        .catch((error) => {
          console.error(error);  // Log any error during deletion
        })
        .finally(() => {
          setLoading(false);  // Stop loading after deletion
        });
    }
  };

  return (
    <>
      {/* Breadcrumbs for navigation */}
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

      {/* Search bar to filter orders */}
      <div className="container-fluid mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Order ID, User Name, Email, or Phone No."
          value={searchTerm}
          onChange={handleSearch}  // Update the search term on change
        />
      </div>

      {/* Conditional rendering for loading state */}
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading orders...</p>
        </div>
      ) : (
        <div className="container-fluid" id="userOrders">
          {/* Display message if no results found */}
          {filteredData.length === 0 && searchTerm !== "" ? (
            <div className="alert alert-warning">
              No results found for "{searchTerm}"
            </div>
          ) : filteredData.length === 0 ? (
            <div className="alert alert-info">No orders available.</div>
          ) : null}

          {/* Table displaying orders */}
          <div className="row t-responsive">
            <table className="table table-bordered border-dark text-center table-responsive">
              <thead className="thead">
                <tr>
                  {/* Table headers for order details */}
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
                {/* Loop through filteredData and display each order */}
                {filteredData.map((order, i) => (
                  <React.Fragment key={order.orderId}>
                    {/* Loop through the Products array for each order */}
                    {order.products.map((product, j) => (
                      <tr key={`${order.orderId}-${product.id}`} className="fw-bold">
                        {/* Only render these cells once per order */}
                        {j === 0 && (
                          <td rowSpan={order.products.length}>{i + 1}</td>
                        )}
                        {j === 0 && (
                          <td rowSpan={order.products.length}>{order.orderId}</td>
                        )}
                        {j === 0 && (
                          <td rowSpan={order.products.length}>{order.userId}</td>
                        )}
                        {/* Render product-specific details */}
                        <td>{product.id}</td>
                        <td>{product.quantity}</td>
                        <td>&#8377;{product.price}</td>

                        {/* Render remaining order details once per order */}
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
                          <td rowSpan={order.products.length}>
                            {`${order.user.name} ${order.user.lastname}`}
                          </td>
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
                        {/* Render delete button once per order */}
                        {j === 0 && (
                          <td rowSpan={order.products.length}>
                            <button
                              onClick={() => handleDelete(order.orderId)}  // Handle order deletion
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
