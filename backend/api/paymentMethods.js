export async function allPaymentMethods() {
    const response = await fetch("https://localhost:7056/PaymentMethods");
    return await response.json();
}