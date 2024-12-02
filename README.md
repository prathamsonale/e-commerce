# CoolFootwear - E-commerce Platform

Welcome to **CoolFootwear**, a modern e-commerce platform built with React that provides a seamless shopping experience with essential functionalities like adding products to the cart, user authentication, payment integration, admin controls, and much more! This project is designed for optimal performance and user experience, featuring a responsive design, state management with Redux, and secure handling of data.

---

## Key Features

- **User Authentication & Authorization**: Secure login and registration for users. Authentication tokens are stored in cookies for security.

- **Add to Cart**: Add products to the shopping cart and manage cart items.
 
- **Payment Integration (Test Mode)**: Integration with a payment system for checkout (currently in test mode).
 
- **State Management**: Redux is used for state management to handle the shopping cart and user sessions.
 
- **Responsive Design**: The application is fully responsive and works across multiple devices.
 
- **Skeleton Loader**: Skeleton screens for loading product data for a smoother user experience.
 
- **Admin Panel**: Admins can add new products, update existing ones, and view user orders.
 
- **User Profile**: Users can view and manage their account details, order history, and wishlist.
 
- **Mock API**: Data is stored temporarily using **MockAPI** for users, products, and orders. No backend required.
 
- **Local Storage**: Cart data and other temporary information are stored locally on the user's browser.
 
- **Security**: Sensitive information such as tokens and authentication details are stored in cookies with secure configurations.

---

## Live Preview

You can view the live version of the CoolFootwear application deployed on **Netlify**:

[**Live Preview**](https://coolfootwearproject.netlify.app/)

---

## Technologies Used

- **React** - Frontend framework for building the user interface.
 
- **Redux** - For managing the application state (e.g., cart data, user authentication).
 
- **MockAPI** - For storing and retrieving user, product, and order data.
 
- **Yup** - For validating form data (e.g., user registration, login).
 
- **React Router** - For navigation between pages.
 
- **Axios** - For making API requests.
 
- **React Bootstrap** - For styling and layout components.
 
- **Netlify** - For deploying the application.
 
- **Cookies** - For storing authentication tokens securely.
 
- **and much more...**

---

## Installation

To set up the project locally, follow these steps:

### 1. Clone the repository

- git clone https://github.com/RutvikKumbhar90/CoolFootwear-Project.git

### 2. Install Dependencies

Navigate to the project directory and install the required dependencies:

- cd coolfootwear
- npm install


### 3. Start the Development Server

Once the dependencies are installed, start the React development server:

- npm run dev

---

### Contributing

Feel free to contribute by submitting issues or creating pull requests. Here are a few ways you can help:

- Report bugs
- Suggest new features

---

### Acknowledgements

- React
- Redux
- MockAPI
- Netlify
- 
---

### Project Structure

Here’s a quick overview of the project structure:

Coolfootwear-Project/
│
├── node_modules/             # Contains all the npm packages and dependencies for the project
│
├── public/                   # Static files that are publicly accessible (e.g., images, icons, fonts, etc.)
│   └── index.html            # The main HTML file, where the root div and other static content reside
│
├── src/                     
│   ├── assets/               # Contains static assets like images, icons, and other media files
│   ├── components/           # Reusable React components such as Navbar, Footer, ProductCard, etc.
│   ├── redux/                # Redux store, slices, actions, and reducers for state management
│   ├── App.jsx               # Main component that renders other components and handles routing
│   └── main.jsx              # Entry point for React app, where the App component is rendered into the DOM
│
├── .env                      # Environment variables for configuration, e.g., API keys, URLs, etc.
├── .gitignore                # List of files/folders that should be ignored by git (e.g., node_modules, build folders)
├── eslint.config.js          # Configuration for ESLint (JavaScript linting tool) to ensure code quality
├── index.html                # Main HTML file, typically serves as the entry point for the app in the browser
├── netlify.toml              # Configuration for deploying the app on Netlify (build settings, redirects, etc.)
├── package-lock.json         # Automatically generated file that locks the versions of npm dependencies
├── package.json              # Project's metadata, dependencies, scripts, and configurations
├── README.md                 # The README file you're reading (this one!), with project information
└── vite.config.js            # Configuration file for Vite, a fast build tool used for the React app

---

Enjoy using CoolFootwear! If you have any questions or feedback, feel free to reach out. Happy shopping! 👟

***Just copy everything inside the code block, and you're good to go!***



