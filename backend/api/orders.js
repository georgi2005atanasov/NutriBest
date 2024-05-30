export async function createGuestOrder(data) {
    const response = await fetch('https://localhost:7056/guestsOrders', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    })

    return await response.json();
}