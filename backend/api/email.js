import { getAuthToken } from "../../frontend/nutri-best-project/src/utils/auth";

export async function sendConfirmOrderMessage(email,
    customerName,
    orderId,
    confirmationUrl) {
    const response = await fetch(`https://localhost:7056/Email/SendConfirmOrderEmail`, {
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
    const response = await fetch(`https://localhost:7056/Email/ForgottenPassword`, {
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

    const response = await fetch(`https://localhost:7056/Email/SendPromoCode`, {
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
    const response = await fetch(`https://localhost:7056/Email/SendOrderToAdmin`, {
        method: "POST",
        body: JSON.stringify({
            to: email,
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