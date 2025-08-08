"use client";

import useOrder from "@/hooks/use-order";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/navigation";

const Paypal = () => {
  const router = useRouter();
  const { orderData } = useOrder();

  return (
    orderData && (
      <div className="w-full">
        <PayPalScriptProvider
          options={{
            currency: "EUR",
            clientId:
              "AUn_RNeNyjQTCjeUqQqbrwr0qNeTdzCTuI3dv1DQaOhxtXP1hCF2DbWuZ8RkvNazGl-vq9-GTjfhePjZ",
          }}
        >
          <PayPalButtons
            style={{
              layout: "horizontal",
              color: "blue",
              label: "pay",
              height: 54,
              tagline: false,
              shape: "pill",
            }}
            createOrder={async () => {
              try {
                const response = await fetch("/api/paypal/orders", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    description: "airtime purchase",
                    price: orderData.amountEur,
                  }),
                });
                const order = await response.json();
                if (order.id) {
                  console.log("order id", order.id);
                  return order.id;
                } else {
                  const errorDetail = order?.details?.[0];
                  const errorMessage = errorDetail
                    ? `${errorDetail.issue} ${errorDetail.description} (${order.debug_id})`
                    : JSON.stringify(order);

                  throw new Error(errorMessage);
                }
              } catch (error) {
                console.error(error);
              }
            }}
            onCancel={(data) => {
              console.log("Cancelled:", data);
            }}
            onApprove={async (data, actions) => {
              try {
                const response = await fetch(`/api/paypal/orders/capture`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    orderId: data.orderID,
                  }),
                });
                const order = await response.json();

                const errorDetail = order?.details?.[0];

                if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                  return actions.restart();
                } else if (errorDetail) {
                  throw new Error(
                    `${errorDetail.description} (${order.debug_id})`
                  );
                } else {
                  // order paid :save to database
                  //save order in db
                  /* axios
                    .post("/api/savepaypal", {
                      ...datasave,
                      paypalorderId:
                        order.purchase_units[0].payments.captures[0].id,
                    })
                    .then((res) => {
                      console.log(res);
                    });*/

                  router.push("/topup-success");
                }
              } catch {}
            }}
          />
        </PayPalScriptProvider>
      </div>
    )
  );
};

export default Paypal;
