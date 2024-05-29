export async function allPaymentMethods() {
    const response = await fetch("https://localhost:7056/paymentMethods");
    return await response.json();
}