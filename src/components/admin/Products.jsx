import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Products() {
  const [productData, setProductData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // Track the search term

  const getData = async () => {
    setLoading(true);
    await axios
      .get(import.meta.env.VITE_API_KEY)
      .then((res) => {
        setProductData(res.data);
        setFilteredData(res.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (id) => {
    // console.log(id);
    axios
      .delete(import.meta.env.VITE_API_KEY + id)
      .then(() => {
        getData();
      })
      .catch((e) => {
        // console.log(" " + e);
      });
  };

  // Function to filter users based on the search term
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term === "") {
      // If search term is empty, show all users
      setFilteredData(productData);
    } else {
      // Filter users based on the search term
      const filtered = productData.filter((product) => {
        const productId = product.id.toString();
        const productTitle = product.title.toLowerCase();
        const productBrand = product.brand.toLowerCase();
        const productCategory = product.category.toLowerCase();
        const productPrice = product.price.toString().toLowerCase();

        return (
          productId.includes(term) ||
          productTitle.includes(term.toLowerCase()) ||
          productBrand.includes(term.toLowerCase()) ||
          productCategory.includes(term.toLowerCase()) ||
          productPrice.includes(term.toString().toLowerCase())
        );
      });
      setFilteredData(filtered); // Update filtered data
    }
  };

  return (
    <>
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
      {/* Search Bar */}
      <div className="container-fluid mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Product ID, Title, Brand, Category or Price."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading products...</p>
        </div>
      ) : (
        <div className="container-fluid">
          {/* Display message if no results found */}
          {filteredData.length === 0 && searchTerm !== "" ? (
            <div className="alert alert-warning">
              No results found for "{searchTerm}"
            </div>
          ) : filteredData.length === 0 ? (
            <div className="alert alert-info">No users available.</div>
          ) : null}

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
                {filteredData.map((value, i) => (
                  <tr key={value.id} className="fw-bold ">
                    <td>{i + 1}</td>
                    <td>{value.id}</td>
                    <td style={{ width: "250px" }}>
                      <img
                        src={value.imageUrl}
                        alt=""
                        height={"100px"}
                        loading="lazy"
                      />
                    </td>
                    <td>{value.title}</td>
                    <td>{value.brand}</td>
                    <td>{value.category}</td>
                    <td>&#8377;{value.price}</td>
                    <td>
                      <del>&#8377;{value.mrp}</del>
                    </td>
                    <td style={{ width: "250px" }}>
                      <Link to={`/admin/addproducts/${value.id}`}>
                        <button className="btn btn-primary m-1">Edit</button>
                      </Link>
                      <button
                        onClick={() => handleDelete(value.id)}
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
