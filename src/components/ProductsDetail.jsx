import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addProduct } from "../redux/cart/cartSlice";
import Loader from "./reuseable-code/Loader";

function ProductsDetail() {
  // State to store product details
  const [product, setProduct] = useState(null);
  
  // Loading state to handle the loading spinner while fetching data
  const [loading, setLoading] = useState(true);
  
  // State to store the discount percentage
  const [discount, setDiscount] = useState(0);
  
  // Redux dispatch function to dispatch actions to the Redux store
  const dispatch = useDispatch();
  
  // Get the product ID from the URL using useParams
  const { id } = useParams();

  // Function to calculate discount percentage based on MRP and price
  const calDiscount = (mrp, price) => {
    return Math.round(((mrp - price) / mrp) * 100);  // Formula: ((MRP - Price) / MRP) * 100
  };

  useEffect(() => {
    if (id) {
      setLoading(true);  // Set loading to true when the request starts
      // Fetch product details using axios from the API
      axios
        .get(`${import.meta.env.VITE_API_KEY}${id}`)  // Construct API URL using environment variable
        .then((res) => {
          setProduct(res.data);  // Store the fetched product details in state
          setDiscount(calDiscount(res.data.mrp, res.data.price));  // Calculate discount
        })
        .catch((error) => console.error(error))  // Handle any errors during the fetch
        .finally(() => setLoading(false));  // Set loading to false when the fetch is complete
    }
  }, [id]);  // Effect runs whenever the product ID changes

  // Handle adding the product to the cart
  const handleAddToCart = (product) => {
    const selectedProduct = {
      id: product.id,
      imageUrl: product.imageUrl,
      title: product.title,
      price: product.price,
      mrp: product.mrp,
      quantity: 1,  // Default quantity set to 1
    };

    // Dispatch the addProduct action to the Redux store
    dispatch(addProduct(selectedProduct));

    // Scroll to top after adding the product to the cart
    window.scrollTo(0, 0);
  };

  return (
    <>
      {/* Show loading spinner while data is being fetched */}
      {loading && <Loader />}
      
      {/* Breadcrumb Navigation */}
      <div className="breadcrumbs">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="bread fw-bold">
                <span>
                  <Link to="/" className="pointer-cursor">Home</Link>
                </span>{" "}
                / <span>Product Details</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Render product details once fetched */}
      {product && (
        <div className="container productDetail mt-3">
          <div className="row">
            <div className="col-lg-6 col-md-12 text-center">
              <img src={product.imageUrl} alt={product.title} />{" "}
              {/* Display product image */}
            </div>
            <div className="col-lg-6 col-md">
              <h3>{product.title}</h3>
              <p className="mb-0" style={{ color: "#007389", fontWeight: "500" }}>
                Visit the {product.brand} Store
              </p>
              {/* Product ratings */}
              <span>4.3 </span>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star-half"></i>
              <span style={{ color: "#007389", fontWeight: "500" }}>
                ({Math.floor(1000 + Math.random() * 9000)} ratings)
              </span>
              <p>
                {Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000}+ bought in last month
              </p>
              {/* Product badge */}
              <div className="shape">
                <div className="shape-text">
                  <p>
                    CoolFootwear's <span>Choice</span>
                  </p>
                </div>
              </div>
              <hr />
              {/* Price and discount details */}
              <h3>
                <span className="text-danger">-{discount}% </span>
                <span className="text-success">₹{product.price}</span>
              </h3>
              <span style={{ fontSize: "14px" }}>
                M.R.P:{" "}
                <del>
                  <span className="text-secondary"> ₹{product.mrp}</span>
                </del>
              </span>
              <p className="mb-0 mt-2">Inclusive of all taxes</p>
              {/* EMI information */}
              <p>
                <b>EMI</b> starts at{" "}
                <span style={{ backgroundColor: "yellow" }}>
                  ₹{Math.floor(Math.random() * (500 - 300 + 1)) + 300}
                </span>
                . No Cost EMI available
              </p>
              <hr />
              {/* Available sizes */}
              <div className="block-26 mb-2">
                <p className="fw-bold mb-1">Sizes</p>
                <ul>
                  {["6", "7", "8", "9", "10"].map((size) => (
                    <li key={size}>
                      <Link>{size}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Product color */}
              <p className="mb-3 fw-bold">
                <span className="fw-normal">Colour</span>: {product.color}
              </p>
              <hr />
              {/* Product description */}
              <p className="mb-1 fw-bold">About this item</p>
              <p style={{ fontSize: "17px" }}>{product.description}</p>
              <p className="mb-3 fw-bold">
                <span className="fw-normal">Quantity</span>: 1
              </p>
              {/* Add to Cart button */}
              <div className="block-26 mt-3">
                <button
                  className="btn btn-dark"
                  onClick={() => handleAddToCart(product)}  // Trigger add to cart
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductsDetail;
