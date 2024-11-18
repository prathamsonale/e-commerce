import "./assets/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import ProductsDetail from "./components/ProductsDetail";
import AllProducts from "./components/AllProducts";
import Products from "./components/admin/Products";
import Men from "./components/Men";
import Women from "./components/Women";
import AddProducts from "./components/admin/AddProducts";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Contact from "./components/Contact";
import ThankYouPage from "./components/ThankYouPage";
import Dashboard from "./components/admin/Dashboard";
import AdminLogin from "./components/AdminLogin";
import Checkout from "./components/Checkout";
import Login from "./components/user/Login";
import SignUp from "./components/user/SignUp";
import UserData from "./components/admin/UserData";
import UserDashboard from "./components/user/UserDashboard";
import MyOrders from "./components/user/MyOrders";
import Users from "./components/user/Users";
import MyAccount from "./components/user/MyAccount";
import Admin from "./components/admin/Admin";
import { useEffect } from "react";
import UserOrders from "./components/admin/UserOrders";
function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Header />
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/productdetail/:id" element={<ProductsDetail />} />
          <Route path="/allproducts" element={<AllProducts />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/thankyou" element={<ThankYouPage />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="userlogin" element={<Login />} />
          <Route path="usersignup" element={<SignUp />} />

          {/* Nested routing For Users */}
          <Route path="users" element={<Users />}>
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="orders" element={<MyOrders />} />
            <Route path="useraccount" element={<MyAccount />} />
          </Route>
          {/* Nested routing For Admin*/}
          <Route path="/admin" element={<Admin />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="addproducts" element={<AddProducts />} />
            <Route path="addproducts/:id" element={<AddProducts />} />
            <Route path="products" element={<Products />} />
            <Route path="userdata" element={<UserData />} />
            <Route path="userorders" element={<UserOrders />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
