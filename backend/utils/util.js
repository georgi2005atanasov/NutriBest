import { json } from 'react-router-dom';

export function checkAuthErrors(result) {
    if (result.status === 401 || result.status === 403) {
        throw json({ message: "Invalid credentials!" });
    }

    if (!result.ok) {
        throw json({ message: "Could not register due to server errors." });
    }
}