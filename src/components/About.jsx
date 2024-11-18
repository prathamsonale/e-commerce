import React from "react";
import { Link } from "react-router-dom";

function About() {
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
                / <span>About</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="colorlib-about">
        <div className="container">
          <div className="row row-pb-lg">
            <div className="col-sm-6 mb-3">
              <div className="video colorlib-video">
                <a href="https://vimeo.com/24464706" className="popup-vimeo">
                  <i className="fas fa-play"></i>
                </a>
                <div className="overlay"></div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="about-wrap">
                <h2>Footwear the leading eCommerce Store around the Globe</h2>
                <p>
                  The Big Oxmox advised her not to do so, because there were
                  thousands of bad Commas, wild Question Marks and devious
                  Semikoli, but the Little Blind Text didn’t listen. She packed
                  her seven versalia, put her initial into the belt and made
                  herself on the way.
                </p>
                <p>
                  When she reached the first hills of the Italic Mountains, she
                  had a last view back on the skyline of her hometown
                  Bookmarksgrove, the headline of Alphabet Village and the
                  subline of her own road, the Line Lane. Pityful a rethoric
                  question ran over her cheek, then she continued her way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
