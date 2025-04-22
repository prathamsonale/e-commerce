import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../reuseable-code/Loader";
import { LazyLoadImage } from "react-lazy-load-image-component"; // Import LazyLoadImage for lazy loading of images
import "react-lazy-load-image-component/src/effects/blur.css"; // Import the blur effect for images while loading

function UserDashboard() {
  // Fetching user ID and data from Redux store
  const userId = useSelector((state) => state.user.userId);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const orderData = useSelector((state) => state.orders.ordersDataLength);

  // Local state for loading and user information
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  // Fetch user info when the component is mounted or when userId changes
  useEffect(() => {
    if (userId) {
      setLoading(true); // Set loading to true while fetching data
      axios
        .get(import.meta.env.VITE_USER_KEY + userId) // API call to get user info based on userId
        .then((response) => {
          // On success, set the user data
          setUserInfo({
            username: response.data.username,
            email: response.data.email,
            phone: response.data.phone,
            password: response.data.password
          });
        })
        .catch((error) => {
          // Handle errors if the API call fails
          console.error(error);
        })
        .finally(() => {
          // Once data is fetched or error is caught, set loading to false
          setLoading(false);
        });
    }
  }, [userId]); // Dependency array: only re-run when userId changes

  return (
    <>
      {/* Show Loader while loading */}
      {loading && <Loader />}

      {/* Breadcrumbs for navigation */}
      <div className="breadcrumbs">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <p className="bread fw-bold">
                <span>
                  <Link to={""}>Users</Link>
                </span>{" "}
                / <span>Dashboard</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard content */}
      <div className="container-fluid" id="userdashboard">
        <div className="row">
          <div className="col">
            <h2 className="fw-bold">Welcome!</h2>

            {/* Display user's name if available */}
            {userInfo && (
              <div>
                <div>
                  Hi, <b>{userInfo.name}!</b>{" "}
                </div>
              </div>
            )}

            {/* User dashboard message with links to various sections */}
            <div>
              <p>
                today is great day to check your{" "}
                <Link
                  to="/users/useraccount"
                  className="text-decoration-underline"
                >
                  account page
                </Link>
                . You can check your{" "}
                <Link to="/users/orders" className="text-decoration-underline">
                  last orders
                </Link>{" "}
                or have a look to{" "}
                <Link
                  to="/users/wishlist"
                  className="text-decoration-underline"
                >
                  your wishlist
                </Link>
                , <br />
                Or maybe you can start to shop and check our{" "}
                <Link to="/allproducts" className="text-decoration-underline">
                  latest offers.
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Row displaying images with badges */}
        <div className="row">
          <div className="col user-dash-imgs">
            {/* Order data image with badge */}
            <div className="img-container">
              <Link to="/users/orders">
                <LazyLoadImage
                  src="https://i.postimg.cc/FHm5p1qH/aaxc3h5i4-removebg-preview.png"
                  alt="Abstract design banner"
                  effect="blur" // Adds blur effect while image is loading
                />
              </Link>
              <span className="badge">{orderData}</span>
            </div>

            {/* Wishlist data image with badge */}
            <div className="img-container">
              <Link to="/allproducts">
                <LazyLoadImage
                  src="https://media.istockphoto.com/id/1312753256/photo/orange-heart-icon-flat-design.jpg?s=612x612&w=0&k=20&c=Syzl_ms-v7FGXJC7KvTexzVM0NEFmkJ0OwrQz0jgtxY="
                  alt="Orange heart icon"
                  effect="blur" // Adds blur effect while image is loading
                />
              </Link>
              <span className="badge">{wishlistItems.length}</span>
            </div>

            {/* Account page image with badge */}
            <div className="img-container">
              <Link to="/users/useraccount">
                <LazyLoadImage
                  src="https://i.postimg.cc/SRqJkmRQ/png-transparent-computer-icons-login-button-miscellaneous-orange-computer-removebg-preview-1.png"
                  alt="Login button icon"
                  effect="blur" // Adds blur effect while image is loading
                />
              </Link>
              <span className="badge">Account</span>
            </div>

            {/* Featured content image with badge */}
            <div className="img-container">
              <Link to="/allproducts">
                <LazyLoadImage
                  src="https://i.postimg.cc/NG7Kb2CK/images-removebg-preview-1.png"
                  alt="Featured content"
                  effect="blur" // Adds blur effect while image is loading
                />
              </Link>
              <span className="badge">Featured</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
