import { getAuthToken } from "../../frontend/nutri-best-project/src/utils/auth";
import { HOST } from "../utils/util";

export async function sendConfirmOrderMessage(email,
    customerName,
    orderId,
    confirmationUrl) {
    const response = await fetch(`${HOST}/Email/SendConfirmOrderEmail`, {
        method: "POST",
        body: JSON.stringify({
            to: email,
            subject: `Order Confirmation #000000${orderId}`,
            customerName,
            orderId,
            confirmationUrl
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    return response;
}

export async function sendForgottenPasswordMessage(email) {
    const response = await fetch(`${HOST}/Email/ForgottenPassword`, {
        method: "POST",
        body: JSON.stringify({
            to: email,
            subject: "Forgot Password"
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    return response;
}

export async function sendPromoCode(email, description) {
    const token = getAuthToken();

    const response = await fetch(`${HOST}/Email/SendPromoCode`, {
        method: "POST",
        body: JSON.stringify({
            to: email,
            promoCodeDescription: description,
            subject: "Promo Code Award"
        }),
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    return response;
}

export async function sendOrderToAdmin(email,
    customerName,
    customerEmail,
    phoneNumber,
    orderId,
    orderDetailsUrl,
    totalPrice) {
    const response = await fetch(`${HOST}/Email/SendOrderToAdmin`, {
        method: "POST",
        body: JSON.stringify({
            subject: `New Order #000000${orderId}`,
            customerName,
            customerEmail,
            phoneNumber,
            orderId,
            orderDetailsUrl,
            totalPrice: `${totalPrice.toFixed(2)}`
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    return response;
}

export async function sendConfirmedOrderToAdmin(orderId, orderDetailsUrl) {
    const response = await fetch(`${HOST}/Email/SendConfirmedOrderToAdmin`, {
        method: "POST",
        body: JSON.stringify({
            subject: `Order #000000${orderId} Confirmed!`,
            orderId,
            orderDetailsUrl 
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    return response;
}

export async function sendJoinedToNewsletter(email) {
    const response = await fetch(`${HOST}/Email/SendJoinedToNewsletter`, {
        method: "POST",
        body: JSON.stringify({
            subject: "Newsletter Subscription",
            to: email,
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    return response;
}