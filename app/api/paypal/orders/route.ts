import { NextResponse } from "next/server";
const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET,ENVIRONNEMENT } = process.env;

let base = "https://sandbox.paypal.com";


export async function POST(request: Request){

  if (ENVIRONNEMENT == "PROD") {
    base = "https://api-m.paypal.com" ;
  }
  const {description,price} = await request.json();

  const accessToken = await capture();
  const url = `${base}/v2/checkout/orders`;
  const payload = {
    intent: "CAPTURE",
    purchase_units: [
                {
                    amount: {
                        currency_code: "EUR",
                        value: price / 10,
                         breakdown: {
                            item_total: {
                                currency_code: "EUR",
                                value: price / 10,
                            },
                            shipping: {
                                currency_code: "EUR",
                                value: 0
                              }
                        }, 
                    },
                    // lookup item details in `cart` from database
                    items: [
                        {
                            name: "T-Shirt",
                            unit_amount: {
                                currency_code: "EUR",
                                value: price /10,
                            },
                            quantity: 1,
                            description: "Super Fresh Shirt",
                            sku: "sku01",
                        },
                    ],
                },
    ],
    prefer: "return=minimal"
  };

try{
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,

    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  console.log("order created",data)
  return NextResponse.json(data);
}catch (error) {
  console.log("Failed to create order:", error);
  return NextResponse.json({message:"something went wrong",status:500});
}

}

const capture = async () => {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(
      PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET,
    ).toString("base64");
    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
  }
};

