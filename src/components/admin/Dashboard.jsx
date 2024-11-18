import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      <div className="breadcrumbs">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <p className="bread fw-bold ">
                <span>
                  <Link to={""}>Admin</Link>
                </span>{" "}
                / <span>Dashboard</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid dashboard">
        <div className="row">
          <div className="col-lg-4  d-flex justify-content-center align-items-center mb-3">
            <div className="card text-center ">
              <div>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/33/33308.png"
                  alt=""
                  width="99px"
                />
              </div>
              <div className="card-body">
                <hr />
                <Link to="/admin/userdata">
                  <button className="btn btn-secondary">Users</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-4 d-flex justify-content-center align-items-center mb-3">
            <div className="card text-center">
              <div>
                <img
                  className="img-burn mt-1"
                  src="https://cdn-icons-png.flaticon.com/512/709/709488.png"
                  alt=""
                  width="99px"
                  // height="120px"
                />
              </div>
              <div className="card-body">
                <hr />
                <Link to="/admin/products">
                  <button className="btn btn-secondary">Products</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-4 d-flex justify-content-center align-items-center">
            <div className="card text-center">
              <div>
                <img
                  className="mt-1"
                  src="https://cdn1.iconfinder.com/data/icons/e-commerce-223/48/20-512.png"
                  alt=""
                  width="99px"
                />
              </div>
              <div className="card-body">
                <hr />
                <Link to="/admin/userorders">
                  <button className="btn btn-secondary">Orders</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
