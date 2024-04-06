import { checkAuthErrors } from '../utils/util';

export async function register(userData) {
    const response = await fetch('https://localhost:7056/identity/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })

    if (response.ok === false) {
        return await response.json();
    }

    return await response.text();
}

export async function login(userData) {
    const response = await fetch('https://localhost:7056/identity/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })

    if (response.ok) {
        return await response.text();
    }
    
    return await response.json();
}