import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component"; // Import LazyLoadImage
import "react-lazy-load-image-component/src/effects/blur.css"; //  Adds a blur effect while loading
import MenSkeletonLoader from "./reuseable-code/MenSkeletonLoader";

function Men() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const products = [
    {
      imgSrc: "https://coolfootwear.netlify.app/images/item-4.jpg",
      title: "Russ Men's Sneakers",
      price: "$49.00",
    },
    {
      imgSrc: "https://coolfootwear.netlify.app/images/item-6.jpg",
      title: "Boots Shoes Maca",
      price: "$25.87",
    },
    {
      imgSrc: "https://coolfootwear.netlify.app/images/item-8.jpg",
      title: "Men's Leather Moccasin",
      price: "$16.40",
    },
    {
      imgSrc: "https://coolfootwear.netlify.app/images/item-9.jpg",
      title: "Men's Boots Shoes",
      price: "$48.18",
    },
  ];
  return (
    <>
      {/* Breadcrumbs for navigation */}
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
                / <span>Men</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section with header and menu links */}
      <div className="breadcrumbs-two">
        <div className="container-fluid">
          <div className="row special">
            <div className="col">
              <div className="breadcrumbs-img breadcrumbs-men">
                <h2>Men's</h2>
              </div>
              <div className="menu text-center">
                <p>
                  <Link to="#">New Arrivals</Link>{" "}
                  <Link to="#">Best Sellers</Link>{" "}
                  <Link to="#">Extended Widths</Link> <Link to="#">Sale</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product listing section */}
      <div className="container-fluid">
        <div className="special">
          <div className="row">
            {/* Product Card */}
            {loading
              ? Array(4) // Replace with filteredProducts.length or dynamically based on your requirement
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="col-lg-3 col-md-6 col-sm-12 mb-2"
                    >
                      <MenSkeletonLoader   />
                    </div>
                  ))
              : products.map((product, index) => (
                  <div
                    className="col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center align-items-center mb-2"
                    key={index}
                  >
                    <div className="product-card text-center p-2">
                      <LazyLoadImage
                        alt={product.title}
                        src={product.imgSrc} // Image source
                        effect="blur" // Optional: Adds a blur effect while loading
                      />
                      <h4>{product.title}</h4>
                      <h5>{product.price}</h5>
                      <Link to="/allproducts">
                        <button className="btn btn-dark">Go to products</button>
                      </Link>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Men;
