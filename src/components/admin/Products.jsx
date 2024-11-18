import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Products() {
  // State hooks for managing product data, search term, and loading state
  const [productData, setProductData] = useState([]); // Holds all product data
  const [filteredData, setFilteredData] = useState([]); // Holds filtered product data based on search term
  const [loading, setLoading] = useState(true); // Manages loading spinner state
  const [searchTerm, setSearchTerm] = useState(""); // Manages the search term entered by the user

  // Function to fetch product data from the API
  const getData = async () => {
    setLoading(true); // Set loading to true before fetching data
    await axios
      .get(import.meta.env.VITE_API_KEY) // Use API endpoint (in environment variable)
      .then((res) => {
        setProductData(res.data); // Set the fetched data to state
        setFilteredData(res.data); // Initially set filtered data as all product data
      })
      .catch((e) => {
        console.log(e); // Log any error that occurs during the fetch
      })
      .finally(() => setLoading(false)); // Set loading to false after the request is completed
  };

  // Fetch data when component is first mounted
  useEffect(() => {
    getData();
  }, []); // Empty dependency array ensures this runs only once on component mount

  // Function to handle product deletion
  const handleDelete = (id) => {
    // Call the API to delete the product
    axios
      .delete(import.meta.env.VITE_API_KEY + id) // Delete the product by its ID
      .then(() => {
        getData(); // Re-fetch the data after deleting a product
      })
      .catch((e) => {
        // Optionally, handle any errors from the delete request
      });
  };

  // Function to filter products based on search term
  const handleSearch = (e) => {
    const term = e.target.value; // Get the value from the input field
    setSearchTerm(term); // Update the search term state

    if (term === "") {
      // If search term is empty, reset to show all products
      setFilteredData(productData);
    } else {
      // Filter products based on ID, title, brand, category, or price matching the search term
      const filtered = productData.filter((product) => {
        const productId = product.id.toString(); // Convert product ID to string
        const productTitle = product.title.toLowerCase(); // Convert title to lowercase for case-insensitive search
        const productBrand = product.brand.toLowerCase(); // Same for brand
        const productCategory = product.category.toLowerCase(); // Same for category
        const productPrice = product.price.toString().toLowerCase(); // Same for price

        // Check if any of these fields include the search term
        return (
          productId.includes(term) ||
          productTitle.includes(term.toLowerCase()) ||
          productBrand.includes(term.toLowerCase()) ||
          productCategory.includes(term.toLowerCase()) ||
          productPrice.includes(term.toString().toLowerCase())
        );
      });
      setFilteredData(filtered); // Update filtered data based on the search results
    }
  };

  return (
    <>
      {/* Breadcrumb navigation */}
      <div className="breadcrumbs">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <p className="bread fw-bold ">
                <span>
                  <Link to={"/admin/dashboard"}>Admin</Link>
                </span>{" "}
                / <span>Products</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search bar for filtering products */}
      <div className="container-fluid mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Product ID, Title, Brand, Category or Price."
          value={searchTerm} // Controlled input, its value is the state `searchTerm`
          onChange={handleSearch} // Call handleSearch when the user types
        />
      </div>

      {/* Loading spinner or product list */}
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading products...</p>
        </div>
      ) : (
        <div className="container-fluid">
          {/* Display a message if no products match the search */}
          {filteredData.length === 0 && searchTerm !== "" ? (
            <div className="alert alert-warning">
              No results found for "{searchTerm}"
            </div>
          ) : filteredData.length === 0 ? (
            <div className="alert alert-info">No products available.</div>
          ) : null}

          {/* Table to display the filtered product data */}
          <div className="row t-responsive">
            <table className="table table-bordered border-dark text-center table-responsive">
              <thead className="thead">
                <tr>
                  <th>#</th>
                  <th>Product ID</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Brand</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>MRP</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Map over filteredData to display each product */}
                {filteredData.map((value, i) => (
                  <tr key={value.id} className="fw-bold ">
                    <td>{i + 1}</td> {/* Display the index + 1 */}
                    <td>{value.id}</td> {/* Product ID */}
                    <td style={{ width: "250px" }}>
                      <img
                        src={value.imageUrl} // Product image URL
                        alt=""
                        height={"100px"} // Set image height
                        loading="lazy" // Lazy load the image
                      />
                    </td>
                    <td>{value.title}</td> {/* Product title */}
                    <td>{value.brand}</td> {/* Product brand */}
                    <td>{value.category}</td> {/* Product category */}
                    <td>&#8377;{value.price}</td> {/* Product price (in INR) */}
                    <td>
                      <del>&#8377;{value.mrp}</del> {/* MRP with strike-through */}
                    </td>
                    <td style={{ width: "250px" }}>
                      {/* Link to edit page */}
                      <Link to={`/admin/addproducts/${value.id}`}>
                        <button className="btn btn-primary m-1">Edit</button>
                      </Link>
                      {/* Button to delete the product */}
                      <button
                        onClick={() => handleDelete(value.id)} // Trigger deletion on click
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default Products;
