import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const handleSubscribe = async (plan, auth, couponCode, finalAmount) => {
  try {
    const res = await axios.post(
      `${API_URL}/api/v1/subscription/create-order`,
      {
        amount: finalAmount,     // Use discounted price
        couponCode,              // Include coupon code for backend tracking
      },
      {
        headers: {
          Authorization: auth?.token,
        },
      }
    );

    const order = res.data;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "FitTrack",
      description: plan.name,
      order_id: order.id,
      handler: async function (response) {
        alert("✅ Payment successful!");

        await axios.post(
          `${API_URL}/api/v1/subscription/save-transaction`,
          {
            razorpay_order_id: order.id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            planId: plan._id,
            planName: plan.name,
            amount: finalAmount,
            currency: "INR",
            couponCode,
          },
          {
            headers: {
              Authorization: auth.token,
            },
          }
        );
      },
      prefill: {
        name: auth?.user?.name,
        email: auth?.user?.email,
      },
      theme: {
        color: "#1d4ed8",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  } catch (err) {
    console.error("❌ Error in subscription:", err);
    alert("Payment initiation failed.");
  }
};
export default handleSubscribe;