export async function sendConfirmOrderMessage(email,
    customerName,
    orderId,
    confirmationUrl) {
    const response = await fetch(`https://localhost:7056/email/SendConfirmOrderEmail`, {
        method: "POST",
        body: JSON.stringify({
            to: email,
            subject: `Order Confirmation #000000${orderId}`,
            customerName,
            orderId,
            confirmationUrl,
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    return response;
}

export async function sendForgottenPasswordMessage(email) {
    const response = await fetch(`https://localhost:7056/email/ForgottenPassword`, {
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