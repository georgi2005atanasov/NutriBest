import { HOST } from "../utils/util"

export async function allPaymentMethods() {
    const response = await fetch(`${HOST}/PaymentMethods`);
    return await response.json();
}