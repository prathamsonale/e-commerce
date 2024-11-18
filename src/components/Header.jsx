import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/images-removebg-preview.png";
import { useSelector } from "react-redux";
import loginLogo from "../assets/images/UserLogin/avatar.png";
import { useRef } from "react";
import { checkUserLoggedIn } from "./reuseable-code/CheckedLoggedIn";

function Header() {
  const cartProducts = useSelector((state) => state.cart.cartProducts);
  const navigate = useNavigate();

  // Create refs for toggler and collapsible navbar
  const navbarTogglerRef = useRef(null);
  const navbarCollapseRef = useRef(null);

  const closeNavbar = () => {
    if (navbarCollapseRef.current.classList.contains("show")) {
      navbarTogglerRef.current.click(); // Simulate click to close
    }
  };

  const handleLoginLogoClick = () => {
    if (checkUserLoggedIn()) {
      navigate("/users/dashboard");
    } else {
      navigate("/userlogin");
    }
  };

  return (
    <>
      <div className="container-fluid" id="header">
        <div className="special">
          <nav className="navbar navbar-expand-lg navbar-light mt-2">
            <div className="container-fluid">
              <Link to="/" className="navbar-brand">
                <img src={logo} alt="Logo" />
              </Link>
              <button
                ref={navbarTogglerRef}
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                ref={navbarCollapseRef}
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item dropdown">
                    <Link
                      to="/men"
                      className="nav-link text-dark"
                      onClick={closeNavbar}
                    >
                      <i className="fa-solid fa-person"></i>
                      Mens
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/women"
                      className="nav-link text-dark"
                      onClick={closeNavbar}
                    >
                      <i className="fa-solid fa-person-dress"></i>
                      Womens
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/allproducts"
                      className="nav-link text-dark"
                      onClick={closeNavbar}
                    >
                      <i className="fa-solid fa-box"></i>
                      All Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/about"
                      className="nav-link text-dark"
                      onClick={closeNavbar}
                    >
                      <i className="fa-solid fa-circle-info"></i>
                      About
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/contact"
                      className="nav-link text-dark"
                      onClick={closeNavbar}
                    >
                      <i className="fa-solid fa-globe"></i>
                      Contact
                    </Link>
                  </li>
                </ul>
                <ul
                  className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex"
                  id="cart"
                >
                  <li className="nav-item position-relative">
                    <Link
                      to="/cart"
                      className="nav-link text-dark"
                      onClick={closeNavbar}
                    >
                      <i className="fas fa-shopping-cart me-1"></i>
                      <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                        {cartProducts.length}
                      </span>
                      <span className="d-none cart-show">
                        <i className="fa-solid fa-cart-shopping"></i>
                        Cart{" "}
                        <span className="text-danger">
                          [{cartProducts.length}]
                        </span>
                      </span>
                    </Link>
                  </li>

                  <li
                    className="nav-item ms-5 login-logo"
                    onClick={closeNavbar}
                  >
                    <span onClick={handleLoginLogoClick}>
                      <img src={loginLogo} alt="Login logo" />
                    </span>
                  </li>
                  <li className="nav-item" onClick={closeNavbar}>
                    <p
                      className="d-none nav-link"
                      onClick={handleLoginLogoClick}
                    >
                      <button className="btn btn-dark hover:btn-danger">
                        Login
                      </button>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        
        <div className="sale">
          <div className="container">
            <div className="row">
              <div className="col-sm-8 offset-sm-2 text-center">
                <div className="row">
                  <div className="owl-carousel2">
                    <div className="item">
                      <div className="col sale-info">
                        <h3 className="default-info">
                          <a href="/nothing">
                            25% off (Almost) Everything! Use Code: Summer Sale
                          </a>
                        </h3>
                        <h3 className="hidden-info">Hurry up!</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
