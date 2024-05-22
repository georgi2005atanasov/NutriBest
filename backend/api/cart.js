export async function addToCart(productId, count) {
    const response = await fetch(`https://localhost:7056/cart/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            productId,
            count
        }),
        credentials: "include"
    });

    return response;
}

export async function getCart() {
    const response = await fetch(`https://localhost:7056/cart/get`, {
        method: "GET",
        credentials: "include"
    });

    return await response.json();
}

export async function cleanCart() {
    const response = await fetch(`https://localhost:7056/cart/clean`, {
        method: "DELETE",
        credentials: "include"
    });

    return response;
}

export async function removeFromCart(productId, count) {
    const response = await fetch(`https://localhost:7056/cart/remove`, {
        method: "DELETE",
        body: JSON.stringify({
            productId,
            count
        }),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    return response;
}

export async function setProductInCart(productId, count) {
    const response = await fetch(`https://localhost:7056/cart/set`, {
        method: "POST",
        body: JSON.stringify({
            productId,
            count
        }),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    return response;
}