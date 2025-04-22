import * as Yup from "yup";

// Validation schema for login page
export const loginValidationSchema = () =>
  Yup.object().shape({
    // Email validation
    email: Yup.string()
      .required("Email is required.")
      .email("Email must be a valid email address")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/,
        "Email must be a valid email address & ends with domain .com"
      )
      .test(
        "is-empty",
        "Email is required",
        (value) => value && value.trim() !== ""
      ),

    // Password validation
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must have at least 6 characters")
      .test(
        "is-empty",
        "Password is required",
        (value) => value && value.trim() !== ""
      ),
  });

// Validation schema for user sign-up page
export const signUpValidationSchema = () =>
  Yup.object().shape({
    // Name validation
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .test(
        "is-empty",
        "Name is required",
        (value) => value && value.trim() !== ""
      ),

    // Email validation
    email: Yup.string()
      .required("Email is required.")
      .email("Email must be a valid email address")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/,
        "Email must be a valid email address & ends with domain .com"
      )
      .test(
        "is-empty",
        "Email is required",
        (value) => value && value.trim() !== ""
      ),

    // Password validation
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must have at least 6 characters")
      .max(10, "Password must have characters in between 6 to 10")
      .test(
        "is-empty",
        "Password is required",
        (value) => value && value.trim() !== ""
      ),

    // Phone number validation (10-digit Indian number starting with 7, 8, or 9)
    phone: Yup.string()
      .required("Phone number is required.")
      .matches(
        /^[7-9][0-9]{9}$/,
        "Phone number must be a 10-digit Indian number starting with 7, 8, or 9."
      )
      .test(
        "is-empty",
        "Phone number is required.",
        (value) => value && value.trim() !== ""
      ),
  });

// Validation schema for checkout page
export const checkoutValidationSchema = () =>
  Yup.object().shape({
    countrySelect: Yup.string().required("Country name is required."),

    firstname: Yup.string()
      .required("First name is required.")
      .min(3, "First name must be at least 3 characters.")
      .test(
        "is-empty",
        "First name is required.",
        (value) => value && value.trim() !== ""
      ),

    lastname: Yup.string()
      .required("Last name is required.")
      .min(3, "Last name must be at least 3 characters.")
      .test(
        "is-empty",
        "Last name is required.",
        (value) => value && value.trim() !== ""
      ),

    address: Yup.string()
      .required("Address is required.")
      .min(3, "Address must be at least 3 characters.")
      .test(
        "is-empty",
        "Address is required.",
        (value) => value && value.trim() !== ""
      ),

    town: Yup.string()
      .required("Town or city is required.")
      .min(3, "Town or city must be at least 3 characters.")
      .test(
        "is-empty",
        "Town or city is required.",
        (value) => value && value.trim() !== ""
      ),

    state: Yup.string()
      .required("State is required.")
      .min(3, "State name must have at least 3 characters.")
      .test(
        "is-empty",
        "State is required.",
        (value) => value && value.trim() !== ""
      ),

    postalcode: Yup.string()
      .required("Zip/Postal code is required.")
      .matches(/^[0-9]{6}$/, "Zip / Postal code must be at least 6 numbers.")
      .test(
        "is-empty",
        "Zip/Postal code is required.",
        (value) => value && value.trim() !== ""
      ),

    email: Yup.string()
      .required("Email is required.")
      .email("Email must be a valid email address")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/,
        "Email must be a valid email address & ends with domain .com"
      )
      .test(
        "is-empty",
        "Email is required",
        (value) => value && value.trim() !== ""
      ),

    phoneno: Yup.string()
      .required("Phone number is required.")
      .matches(
        /^[7-9][0-9]{9}$/,
        "Phone number must be a 10-digit Indian number starting with 7, 8, or 9."
      )
      .test(
        "is-empty",
        "Phone number is required.",
        (value) => value && value.trim() !== ""
      ),
  });
