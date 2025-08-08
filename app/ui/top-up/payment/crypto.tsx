"use client";

import useOrder from "@/hooks/use-order";

const CryptoPayment = () => {
  const {} = useOrder();

  const handlePayment = async () => {
    const apiKey = process.env.NOWPAYMENTS_API_KEY;
    const url = "https://api.nowpayments.io/v1/invoice";

    const paymentData = {
      price_amount: 100,
      price_currency: "usd",
      order_id: "11111",
      order_description: "Apple Macbook Pro 2019 x 1",
      ipn_callback_url: "https://nowpayments.io",
      success_url: "https://nowpayments.io",
      cancel_url: "https://nowpayments.io",
      partially_paid_url: "https://nowpayments.io",
      is_fixed_rate: true,
      is_fee_paid_by_user: true,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "30SQ0PY-ESQMMTB-JFYZKFX-C771XYN",
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        console.log("failed invoicing");
        return;
      }

      const data = await response.json();
      console.log(data);
      window.location.href = data.invoice_url;

      /*       if (data && data.invoice_url) {
        window.location.href = data.invoice_url;
      } else {
        console.log("creating payment url failed");
      } */
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <button
      className="w-[200px] bg-blue-400 hover:cursor-pointer"
      onClick={() => {
        handlePayment();
      }}
    >
      Pay with crypto
    </button>
  );
};

export default CryptoPayment;
