import axios from "axios";
import webLogo from "../../assets/images/images-removebg-preview.png";

//Taken Payment integration code from official RazorPay website with test mode not live mode
export const getRazorpayOptions = (
  userId,
  finalAmount,
  cartProducts,
  checkout,
  navigate,
  resetForm,
  setLoading
) => {
  const storeOrder = (response) => {
    const orderData = {
      userId: userId,
      products: cartProducts.map((product) => ({
        id: product.id,
        image: product.imageUrl,
        title: product.title,
        quantity: product.quantity,
        price: product.price * product.quantity,
      })),
      paymentId: response.razorpay_payment_id,
      finalAmount: finalAmount,
      user: {
        name: checkout.firstname,
        lastname: checkout.lastname,
        email: checkout.email,
        phoneno: checkout.phoneno,
        address: checkout.address,
        town: checkout.town,
        state: checkout.state,
        postalcode: checkout.postalcode,
        country: checkout.countrySelect,
      },
      orderedTime: new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      }),
    };
    return orderData;
  };
  return {
    key: "rzp_test_4yosHYDduPYmKN", // Razorpay Key ID
    amount: finalAmount * 100, // Amount in paise (INR)
    currency: "INR", //Currency
    name: "Cool Footwear", // Your business / project name
    image: webLogo,
    description: "Test Transaction",
    callback_url: "https://eneqd3r9zrjok.x.pipedream.net/", // Your callback URL
    handler: function (response) {
      if (response && response.razorpay_payment_id) {
        setLoading(true);
        const orderData = storeOrder(response); // Get order data
        // Send order data to your backend for storage
        axios
          .post(import.meta.env.VITE_USER_ORDERS_KEY, orderData)
          .then(() => {
            navigate("/thankyou"); // Navigate to the Thank You page
            resetForm(); // Reset form on successful payment
          })
          .catch((err) => {
            // Handle API errors
            console.error("Error storing order:", err);
          })
          .finally(() => setLoading(false));
      }
    },
    prefill: {
      name: checkout.firstname + " " + checkout.lastname, // Customer's name
      email: checkout.email, // Customer's email
    },
    notes: {
      address: checkout.address, // Shipping address
    },
    theme: {
      color: "#88C8BC",
    },
  };
};
