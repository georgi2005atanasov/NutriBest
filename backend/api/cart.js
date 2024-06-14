import { HOST } from "../utils/util";

export async function addToCart(productId, count, flavour, grams) {
    const response = await fetch(`${HOST}/Cart/Add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            productId,
            count,
            flavour,
            grams
        }),
        credentials: "include"
    });

    return response;
}

export async function getCart() {
    const response = await fetch(`${HOST}/Cart/Get`, {
        method: "GET",
        credentials: "include"
    });

    return await response.json();
}

export async function cleanCart() {
    const response = await fetch(`${HOST}/Cart/Clean`, {
        method: "DELETE",
        credentials: "include"
    });

    return response;
}

export async function removeFromCart(productId, count, flavour, grams) {
    const response = await fetch(`${HOST}/Cart/Remove`, {
        method: "DELETE",
        body: JSON.stringify({
            productId,
            count,
            flavour,
            grams
        }),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    return response;
}

export async function setProductInCart(productId, count, flavour, grams) {
    const response = await fetch(`${HOST}/Cart/Set`, {
        method: "POST",
        body: JSON.stringify({
            productId,
            count,
            flavour,
            grams
        }),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    return response;
}

export async function applyPromoCode(code) {
    const response = await fetch(`${HOST}/Cart/ApplyPromoCode`, {
        method: "POST",
        body: JSON.stringify({
            code
        }),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    return response;
}

export async function removePromoCode(code) {
    const response = await fetch(`${HOST}/Cart/RemovePromoCode`, {
        method: "DELETE",
        body: JSON.stringify({
            code
        }),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    return response;
}