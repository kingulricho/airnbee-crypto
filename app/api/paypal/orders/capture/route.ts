import { NextResponse } from "next/server";
const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET,ENVIRONNEMENT } = process.env;
let base = "https://sandbox.paypal.com" ;

export async function POST(request: Request){
    const {orderId} = await request.json();
    const accessToken = await capture();

    if (ENVIRONNEMENT == "PROD") {
    base = "https://api-m.paypal.com" ;
  }

    const url = `${base}/v2/checkout/orders/${orderId}/capture`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          });

          const order = await response.json();
        
       return NextResponse.json(order)
      } catch (error) {
        console.error("Failed to capture order:", error);
        return NextResponse.json({message:"failed to capture order",status:500})
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
