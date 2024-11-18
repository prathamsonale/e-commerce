import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/cart/cartSlice";
import { addToWishlist, removeFromWishlist } from "../redux/cart/wishlistslice";
import { checkUserLoggedIn } from "./reuseable-code/CheckedLoggedIn";
import AllProductsSkeletonLoader from "./reuseable-code/AllProductsSkeletonLoader";
import { LazyLoadImage } from "react-lazy-load-image-component"; // Import LazyLoadImage
import "react-lazy-load-image-component/src/effects/blur.css"; //  Adds a blur effect while loading

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const wishlist = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [hasScrolled, setHasScrolled] = useState(false); // State to track if user has scrolled
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    size: "",
    sort: "",
  });

  // Get products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(import.meta.env.VITE_API_KEY);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const resetFilters = () => {
    setFilters({ category: "", brand: "", size: "", sort: "" });
  };

  const handleAddToCart = (product) => {
    const { id, imageUrl, title, price } = product;
    dispatch(addProduct({ id, imageUrl, title, price, quantity: 1 }));
  };

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      dispatch(removeFromWishlist(productId));
    } else {
      dispatch(addToWishlist(productId));
    }
  };

  const filteredProducts = products
    .filter(
      (product) =>
        (filters.category === "" || product.category === filters.category) &&
        (filters.brand === "" || product.brand === filters.brand) &&
        (filters.size === "" || product.size === filters.size)
    )
    .sort((a, b) => {
      if (filters.sort === "lowToHigh") return a.price - b.price;
      if (filters.sort === "highToLow") return b.price - a.price;
      return 0;
    });

  useEffect(() => {
    const handleScroll = () => {
      if (!checkUserLoggedIn())
        if (!hasScrolled) {
          setModalVisible(true); // Show modal on first scroll
          setHasScrolled(true); // Mark as scrolled to prevent future modals
        }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasScrolled]);

  const closeModal = () => {
    setModalVisible(false); // Close the modal when the user clicks on the close button
  };

  return (
    <>
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
                / <span>All Products</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <h3>
              <b>Welcome Back!</b>
            </h3>
            <h5>
              <b>Log in</b> or <b>sign up</b>
            </h5>
            <Link to="/userlogin">
              <button className="btn btn-dark mb-3 mt-3">Login</button>
            </Link>
            <Link to="/usersignup">
              <button className="btn btn-secondary mb-2">Sign up</button>
            </Link>
            <p className="btn text-decoration-underline" onClick={closeModal}>
              <b>Stay logged out</b>
            </p>
          </div>
        </div>
      )}

      <div className="filter mb-3">
        <label className="form-label me-3 mt-1">
          <b>Sort By:</b>
        </label>
        <select
          className="form-control fs-5"
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          value={filters.sort}
        >
          <option value="">Featured</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      <div className="container-fluid" id="addProduct">
        <div className="special">
          <div className="row">
            <div className="col-lg-3">
              <div className="side border border-dark mb-1">
                <h3>Category</h3>
                <ul>
                  {["All", "Male", "Female", "Kid"].map((category) => (
                    <li
                      key={category}
                      onClick={() => {
                        if (category === "All") {
                          resetFilters();
                        } else {
                          setFilters({ ...filters, category });
                        }
                      }}
                    >
                      <Link to="#">{category}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="side border border-dark mb-2">
                <h3>Brand</h3>
                <ul>
                  {["All", "Nike", "Adidas", "Bata", "Puma"].map((brand) => (
                    <li
                      key={brand}
                      onClick={() => {
                        if (brand === "All") {
                          resetFilters();
                        } else {
                          setFilters({ ...filters, brand });
                        }
                      }}
                    >
                      <Link to="#">{brand}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="block-26 mb-5 side border border-dark">
                <h3>Size</h3>
                <ul>
                  {["All", "3", "4", "5", "6", "7", "8", "9", "10"].map(
                    (size) => (
                      <li
                        key={size}
                        onClick={() => {
                          if (size === "All") {
                            resetFilters();
                          } else {
                            setFilters({ ...filters, size });
                          }
                        }}
                      >
                        <Link>{size}</Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            <div className="col-lg-9">
              <div className="row d-flex justify-content-around">
                {loading
                  ? // Show SkeletonLoader for each product card while loading
                    Array(9) // Replace with filteredProducts.length or dynamically based on your requirement
                      .fill(0)
                      .map((_, index) => (
                        <div
                          key={index}
                          className="col-lg-4 col-md-6 col-sm-12 mb-4"
                        >
                          <AllProductsSkeletonLoader />
                        </div>
                      ))
                  : filteredProducts.length > 0 &&
                    filteredProducts.map((product, index) => (
                      <div
                        key={index}
                        className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex justify-content-center align-items-center"
                      >
                        <div className="card bg-white h-100 allProduct text-dark">
                          <div className="card-body">
                            <div
                              className={`wishlist-icon ${
                                wishlist.includes(product.id) ? "red" : "gray"
                              }`}
                              onClick={() => toggleWishlist(product.id)}
                            >
                              {wishlist.includes(product.id) ? (
                                <i className="fa-solid fa-heart"></i>
                              ) : (
                                <i className="fa-regular fa-heart"></i>
                              )}
                            </div>

                            <Link to={`/productdetail/${product.id}`}>
                              <LazyLoadImage
                                src={product.imageUrl} // Image source
                                alt={product.title}
                                width="200"
                                height="150"
                                className="mb-2"
                                effect="blur" // Optional: Adds a blur effect while loading
                              />
                              <h5 className="card-title fw-bold text-dark">
                                {product.title}
                              </h5>
                              <h5 className="text-dark">{product.brand}</h5>
                              <p className="card-text">
                                <span className="fw-bold text-success m-1 fs-5">
                                  &#8377;{product.price}&nbsp;
                                </span>
                                <del className="text-danger">
                                  &#8377;{product.mrp}
                                </del>
                              </p>
                            </Link>
                            <button
                              className="btn btn-dark"
                              onClick={() => handleAddToCart(product)}
                            >
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
