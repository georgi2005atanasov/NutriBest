import { getAuthToken } from '../../frontend/nutri-best-project/src/utils/auth';
import { HOST } from '../utils/util';

export async function register(userData) {
    const response = await fetch(`${HOST}/Identity/Register`, {
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
    const response = await fetch(`${HOST}/Identity/Login`, {
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

export async function resetPassword(newPassword, confirmPassword, token, email) {
    const response = await fetch(`${HOST}/Identity/ResetPassword`, {
        method: 'PUT',
        body: JSON.stringify({
            newPassword, 
            confirmPassword,
            token,
            email
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    
    return await response.json();
}

export async function allRoles() {
    const token = getAuthToken();

    const response = await fetch(`${HOST}/Identity/Roles`, {
        method: "GET", 
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return await response.json();
}