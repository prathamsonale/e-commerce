import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/cart/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../redux/cart/wishlistslice";
import { checkUserLoggedIn } from "./reuseable-code/CheckedLoggedIn";
import AllProductsSkeletonLoader from "./reuseable-code/AllProductsSkeletonLoader";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const wishlist = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageRange, setPageRange] = useState([1, 10]);
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    size: "",
    sort: "",
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(import.meta.env.VITE_API_KEY);
      if (response && response.data) {
        const allProducts = response.data.allProducts || [];
        setProducts(allProducts);
        setTotalPages(Math.ceil(allProducts.length / 12));
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    window.scrollTo(0, 0);
  }, [page]);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    )
      setPage(selectedPage);
  };

  const resetFilters = () => {
    setFilters({ category: "", brand: "", size: "", sort: "" });
  };

  const handleAddToCart = (product) => {
    const { productId, imageUrl, title, price } = product;
    dispatch(
      addProduct({ id: productId, imageUrl, title, price, quantity: 1 })
    );
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

  const displayedProducts = filteredProducts.slice((page - 1) * 12, page * 12);

  const updatePageRange = (currentPage) => {
    const startPage = Math.floor((currentPage - 1) / 10) * 10 + 1;
    const endPage = Math.min(startPage + 9, totalPages);
    setPageRange([startPage, endPage]);
  };

  useEffect(() => {
    updatePageRange(page);
    window.scrollTo(0, 0);
  }, [page, totalPages]);

  const goToNextRange = () => {
    const newStartPage = pageRange[1] + 1;
    if (newStartPage <= totalPages) {
      setPage(newStartPage);
    }
  };

  const goToPreviousRange = () => {
    const newStartPage = pageRange[0] - 12;
    if (newStartPage > 0) {
      setPage(newStartPage);
    }
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
                      onClick={() =>
                        category === "All"
                          ? resetFilters()
                          : setFilters({ ...filters, category })
                      }
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
                      onClick={() =>
                        brand === "All"
                          ? resetFilters()
                          : setFilters({ ...filters, brand })
                      }
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
                        onClick={() =>
                          size === "All"
                            ? resetFilters()
                            : setFilters({ ...filters, size })
                        }
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
                  ? Array(9)
                      .fill(0)
                      .map((_, index) => (
                        <div
                          key={index}
                          className="col-lg-4 col-md-6 col-sm-12 mb-4"
                        >
                          <AllProductsSkeletonLoader />
                        </div>
                      ))
                  : displayedProducts.map((product, index) => (
                      <div
                        key={index}
                        className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex justify-content-center align-items-center"
                      >
                        <div className="card bg-white h-100 allProduct text-dark">
                          <div className="card-body">
                            <div
                              className={`wishlist-icon ${
                                wishlist.includes(product.productId)
                                  ? "red"
                                  : "gray"
                              }`}
                              onClick={() =>
                                toggleWishlist(product.productId)
                              }
                            >
                              {wishlist.includes(product.productId) ? (
                                <i className="fa-solid fa-heart"></i>
                              ) : (
                                <i className="fa-regular fa-heart"></i>
                              )}
                            </div>

                            <Link to={`/productdetail/${product.productId}`}>
                              <LazyLoadImage
                                src={product.imageUrl}
                                alt={product.title}
                                width="200"
                                height="150"
                                className="mb-2"
                                effect="blur"
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

              {displayedProducts.length > 0 && (
                <div className="pagination">
                  <span
                    onClick={goToPreviousRange}
                    className={pageRange[0] > 1 ? "" : "pagination__disabled"}
                  >
                    Previous
                  </span>
                  <span
                    onClick={() => selectPageHandler(page - 1)}
                    className={page > 1 ? "" : "pagination__disabled"}
                  >
                    ◀️
                  </span>
                  {[...Array(totalPages)].map((_, i) => {
                    return (
                      <span
                        className={page === i + 1 ? "pagination__selected" : ""}
                        onClick={() => selectPageHandler(i + 1)}
                        key={i}
                      >
                        {i + 1}
                      </span>
                    );
                  })}
                  <span
                    className={page < totalPages ? "" : "pagination__disabled"}
                    onClick={() => selectPageHandler(page + 1)}
                  >
                    ▶️
                  </span>
                  <span
                    onClick={goToNextRange}
                    className={
                      pageRange[1] < totalPages ? "" : "pagination__disabled"
                    }
                  >
                    Next
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
