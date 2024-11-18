import axios from "axios";
import webLogo from "../../assets/images/images-removebg-preview.png";

// Function to get Razorpay payment options
export const getRazorpayOptions = (
  userId,
  finalAmount,
  cartProducts,
  checkout,
  navigate,
  resetForm,
  setLoading
) => {

  // Function to format and store order data after successful payment
  const storeOrder = (response) => {
    const orderData = {
      userId: userId, // User ID (can be used to associate the order with the user)
      products: cartProducts.map((product) => ({
        id: product.id, // Product ID
        image: product.imageUrl, // Product image URL
        title: product.title, // Product title
        quantity: product.quantity, // Quantity of the product
        price: product.price * product.quantity, // Total price for the quantity of the product
      })),
      paymentId: response.razorpay_payment_id, // Razorpay payment ID from the response
      finalAmount: finalAmount, // The total amount of the order
      user: {
        name: checkout.firstname, // Customer's first name
        lastname: checkout.lastname, // Customer's last name
        email: checkout.email, // Customer's email
        phoneno: checkout.phoneno, // Customer's phone number
        address: checkout.address, // Shipping address
        town: checkout.town, // Town of the customer
        state: checkout.state, // State of the customer
        postalcode: checkout.postalcode, // Postal code of the customer
        country: checkout.countrySelect, // Selected country for shipping
      },
      orderedTime: new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata", // Time zone set to Indian Standard Time
      }),
    };
    return orderData; // Return the structured order data
  };

  return {
    key: "rzp_test_4yosHYDduPYmKN", // Razorpay Key ID for the test environment
    amount: finalAmount * 100, // Amount in paise (INR) - Razorpay expects the amount in paise, so multiply by 100
    currency: "INR", // Currency is set to Indian Rupees
    name: "Cool Footwear", // Your business or project name that will be shown in the payment window
    image: webLogo, // Business logo shown in the payment window
    description: "Test Transaction", // Short description of the transaction
    callback_url: "https://eneqd3r9zrjok.x.pipedream.net/", // Callback URL that gets triggered after payment success
    handler: function (response) {
      // Payment success handler
      if (response && response.razorpay_payment_id) {
        setLoading(true); // Set loading state to true while processing the payment

        const orderData = storeOrder(response); // Get the structured order data

        // Send the order data to your backend to store the order
        axios
          .post(import.meta.env.VITE_USER_ORDERS_KEY, orderData) // POST request to save order
          .then(() => {
            navigate("/thankyou"); // Navigate to the Thank You page after successful payment
            resetForm(); // Reset the checkout form after the order is processed
          })
          .catch((err) => {
            // Handle errors if the order data could not be saved
            console.error("Error storing order:", err);
          })
          .finally(() => setLoading(false)); // Set loading to false once the process is complete
      }
    },
    prefill: {
      name: checkout.firstname + " " + checkout.lastname, // Prefill customer’s name in the Razorpay payment form
      email: checkout.email, // Prefill customer’s email in the payment form
    },
    notes: {
      address: checkout.address, // Prefill shipping address in the payment form
    },
    theme: {
      color: "#88C8BC", // Set the theme color for the Razorpay payment window
    },
  };
};
