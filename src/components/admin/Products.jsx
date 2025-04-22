import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Products() {
  const [productData, setProductData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch product data
  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(import.meta.env.VITE_API_KEY);
      const allProducts = res.data.allProducts || [];
      setProductData(allProducts);
      setFilteredData(allProducts);
    } catch (e) {
      console.error("Error fetching products:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_KEY}${productId}`);
      getData();
    } catch (e) {
      console.error("Delete error:", e);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term === "") {
      setFilteredData(productData);
    } else {
      const filtered = productData.filter((product) => {
        const productId = product.productId?.toString() || "";
        const productTitle = product.title?.toLowerCase() || "";
        const productBrand = product.brand?.toLowerCase() || "";
        const productCategory = product.category?.toLowerCase() || "";
        const productPrice = product.price?.toString().toLowerCase() || "";

        return (
          productId.includes(term) ||
          productTitle.includes(term.toLowerCase()) ||
          productBrand.includes(term.toLowerCase()) ||
          productCategory.includes(term.toLowerCase()) ||
          productPrice.includes(term.toLowerCase())
        );
      });
      setFilteredData(filtered);
    }
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumbs">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <p className="bread fw-bold">
                <span>
                  <Link to={"/admin/dashboard"}>Admin</Link>
                </span>{" "}
                / <span>Products</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="container-fluid mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Product ID, Title, Brand, Category or Price."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Loading Spinner or Table */}
      {loading ? (
        <div className="loading-spinner text-center">
          <div className="spinner-border" role="status"></div>
          <p>Loading products...</p>
        </div>
      ) : (
        <div className="container-fluid">
          {filteredData.length === 0 && searchTerm !== "" ? (
            <div className="alert alert-warning">
              No results found for "{searchTerm}"
            </div>
          ) : filteredData.length === 0 ? (
            <div className="alert alert-info">No products available.</div>
          ) : null}

          <div className="row t-responsive">
            <table className="table table-bordered border-dark text-center table-responsive">
              <thead className="thead-dark">
                <tr>
                  <th>#</th>
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
                {filteredData.map((product, i) => (
                  <tr key={product.productId} className="fw-bold">
                    <td>{i + 1}</td>
                    <td style={{ width: "250px" }}>
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        height="100px"
                        loading="lazy"
                      />
                    </td>
                    <td>{product.title}</td>
                    <td>{product.brand}</td>
                    <td>{product.category}</td>
                    <td>&#8377;{product.price}</td>
                    <td>
                      <del>&#8377;{product.mrp}</del>
                    </td>
                    <td style={{ width: "250px" }}>
                      <Link to={`/admin/addproducts/${product.productId}`}>
                        <button className="btn btn-primary m-1">Edit</button>
                      </Link>
                      <button
                        onClick={() => handleDelete(product.productId)}
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
