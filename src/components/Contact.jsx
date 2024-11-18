import React, { useState } from "react";
import { Link } from "react-router-dom";

function Contact() {
  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    subject: "",
    message: "",
  });

  const [error, setError] = useState({});
  const [successful, setSuceessful] = useState("");

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
    setError({
      ...error,
      [`${e.target.id}Error`]: "",
    });
    setSuceessful("");
  };

  const validate = () => {
    const erromessages = {};
    if (data.fname.trim().length < 3 || data.fname.trim().length === 0) {
      if (data.fname.trim().length < 3) {
        erromessages.fnameError = "First name must have at least 3 characters";
      }
      if (data.fname.trim().length === 0) {
        erromessages.fnameError = "First name is required";
      }
    }
    if (data.lname.trim().length < 3 || data.lname.trim().length === 0) {
      if (data.lname.trim().length < 3) {
        erromessages.lnameError = "Last name must have at least 3 characters";
      }
      if (data.lname.trim().length === 0) {
        erromessages.lnameError = "Last name is required";
      }
    }
    if (
      !/\S+@\S+\.\S+/.test(data.email.trim()) ||
      data.email.trim().length === 0
    ) {
      if (!/\S+@\S+\.\S+/.test(data.email.trim())) {
        erromessages.emailError = "Email is not valid";
      }
      if (data.email.trim().length === 0) {
        erromessages.emailError = "Email is required";
      }
    }

    if (data.subject.trim().length < 3 || data.subject.trim().length === 0) {
      if (data.subject.trim().length < 3) {
        erromessages.subjectError = "Subject must have at least 3 characters";
      }
      if (data.subject.trim().length === 0) {
        erromessages.subjectError = "Subject is required";
      }
    }
    setError(erromessages);
    return Object.keys(erromessages).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSuceessful("Response submitted successfully.");
      setData({
        fname: "",
        lname: "",
        email: "",
        subject: "",
        message: "",
      });
      console.log(data);
    } else {
      console.log("Form contains errors");
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
                  <Link to={"/"} className="pointer-cursor">
                    Home
                  </Link>
                </span>{" "}
                / <span>Contact</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div id="colorlib-contact">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h3>Contact Information</h3>
              <div className="row contact-info-wrap">
                <div className="col-md-3">
                  <p>
                    <span>
                      <i className="fas fa-map-marker-alt"></i>
                    </span>{" "}
                    <Link to="#">
                      Ekondi Kagal Kolhapur, <br /> Maharashtra 416232 India
                    </Link>
                  </p>
                </div>
                <div className="col-md-3">
                  <p>
                    <span>
                      <i className="fas fa-phone"></i>
                    </span>{" "}
                    <a href="tel://1234567920">+91 8767765515</a>
                  </p>
                </div>
                <div className="col-md-3">
                  <p>
                    <span>
                      <i className="fas fa-paper-plane"></i>
                    </span>{" "}
                    <a href="mailto:info@yoursite.com">info@coolfootwear.com</a>
                  </p>
                </div>
                <div className="col-md-3">
                  <p>
                    <span>
                      <i className="fas fa-globe"></i>
                    </span>{" "}
                    <a href="/nothing">coolfootwear.com</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="contact-wrap">
                <h3>Get In Touch</h3>
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="fname">First Name</label>
                        <input
                          type="text"
                          id="fname"
                          className="form-control fw-bold"
                          placeholder="Your firstname"
                          value={data.fname}
                          onChange={handleChange}
                        />
                        {error.fnameError && (
                          <span className="text-danger fw-bold">
                            {error.fnameError}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="lname">Last Name</label>
                        <input
                          type="text"
                          id="lname"
                          className="form-control fw-bold"
                          placeholder="Your lastname"
                          value={data.lname}
                          onChange={handleChange}
                        />
                        {error.lnameError && (
                          <span className="text-danger fw-bold">
                            {error.lnameError}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="w-100"></div>
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          type="text"
                          id="email"
                          className="form-control fw-bold"
                          value={data.email}
                          onChange={handleChange}
                          placeholder="Your email address"
                        />
                        {error.emailError && (
                          <span className="text-danger fw-bold">
                            {error.emailError}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="w-100"></div>
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <input
                          type="text"
                          id="subject"
                          className="form-control fw-bold"
                          value={data.subject}
                          onChange={handleChange}
                          placeholder="Your subject of this message"
                        />
                        {error.subjectError && (
                          <span className="text-danger fw-bold">
                            {error.subjectError}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="w-100"></div>
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                          name="message"
                          id="message"
                          cols="30"
                          rows="10"
                          className="form-control fw-bold"
                          value={data.message}
                          onChange={handleChange}
                          placeholder="Say something about us"
                        ></textarea>
                      </div>
                    </div>

                    <div className="w-100"></div>
                    <div className="col-sm-12">
                      <div className="form-group text-center">
                        <input
                          type="submit"
                          value="Send Message"
                          className="btn btn-primary"
                        />
                      </div>
                    </div>

                    {successful && (
                      <p className="text-success fw-bold text-center">
                        {successful}
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>

            <div className="col-md-6">
              <div id="map">
                <iframe
                  title="map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63268.87488712863!2d74.22397525701727!3d16.70868767814112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc0937d2ad947d1%3A0x52a81a6c82ef5aa7!2sKagal%2C%20Maharashtra%20416203!5e0!3m2!1sen!2sin!4v1628668051025!5m2!1sen!2sin"
                  width="100%"
                  height="500"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
