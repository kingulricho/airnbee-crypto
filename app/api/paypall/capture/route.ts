import {
    ApiError,
    CheckoutPaymentIntent,
    Client,
    Environment,
    LogLevel,
    OrdersController,
    PaymentsController,
    PaypalExperienceLandingPage,
    PaypalExperienceUserAction,
    ShippingPreference,
} from "@paypal/paypal-server-sdk";
import { NextResponse } from "next/server";

const {PAYPAL_CLIENT_ID,PAYPAL_CLIENT_SECRET} = process.env;

const client = new Client({
    clientCredentialsAuthCredentials: {
        oAuthClientId: PAYPAL_CLIENT_ID!,
        oAuthClientSecret: PAYPAL_CLIENT_SECRET!,
    },
    timeout: 0,
    environment: Environment.Sandbox,
    logging: {
        logLevel: LogLevel.Info,
        logRequest: { logBody: true },
        logResponse: { logHeaders: true },
    },
});

const ordersController = new OrdersController(client);



export async function POST({params}:{params:{orderId:string}}){
    const {orderId} = params;
    console.log("orderID",orderId)

        const collect = {
        id: orderId,
        prefer: "return=minimal",
    };

        try {
            const { body, ...httpResponse } = await ordersController.captureOrder(
                collect
            );
            // Get more response info...
            // const { statusCode, headers } = httpResponse;
            return NextResponse.json({body})
        } catch (error) {
            
                // const { statusCode, headers } = error;
                console.log(error)
            
        }

}