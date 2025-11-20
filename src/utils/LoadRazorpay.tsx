import { createOrderApi, verifyPaymentApi } from "../api/authApi";

// ✅ Helper to dynamically load Razorpay SDK
const loadRazorpay = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const openRazorpayCheckout = async (booking: any) => {
  try {
    // 1️⃣ Load Razorpay SDK
    const razorpayLoaded = await loadRazorpay();
    if (!razorpayLoaded) {
      alert("Failed to load Razorpay SDK. Check your internet connection.");
      return;
    }

    console.log("Booking : ", booking);
    // 2️⃣ Create order on backend
    const orderRes = await createOrderApi({
      amount: booking.totalAmount,
      bookingId: booking._id,
    });

    const order = orderRes?.data?.data?.order;
    if (!order) {
      alert("Order creation failed");
      return;
    }

    console.log("Razorpay Key:", order);

    // 3️⃣ Razorpay options
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID, // CRA-compatible
      amount: order.amount,
      currency: "INR",
      name: "Vehicle Rental System",
      description: `Booking payment for ${booking.vehicleId.title}`,
      order_id: order.id,
      handler: async (response: any) => {
        try {
          await verifyPaymentApi({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            bookingId: booking._id,
          });

          alert("Payment successful!");
        } catch (err) {
          console.error("Payment verification failed:", err);
          alert("Payment verification failed.");
        }
      },
      prefill: {
        name: booking?.user?.name || "User",
        email: booking?.user?.email || "user@example.com",
        contact: booking?.user?.mobile || "9999999999",
      },
      theme: { color: "#2563EB" },
    };

    // 4️⃣ Open Razorpay checkout
    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
  } catch (error) {
    console.error("Error opening Razorpay:", error);
    alert("Something went wrong while starting payment.");
  }
};
