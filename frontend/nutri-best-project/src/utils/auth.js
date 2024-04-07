export function getTokenDuration() {
    const storedExpirationDate = localStorage.getItem("expiration");

    if (!storedExpirationDate) {
        return 0;
    }

    const date = new Date(storedExpirationDate);
    const now = new Date();
    const duration = date.getTime() - now.getTime();

    return duration;
}

export function setTokenDuration(duration) {
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + duration);
    localStorage.setItem("expiration", expiration.toISOString());
    localStorage.setItem("duration", duration * 60 * 60 * 1000)
}

export function getAuthToken() {
    const token = localStorage.getItem("authToken");

    const duration = getTokenDuration();

    if (duration < 0) {
        return "EXPIRED";
    }

    return token;
}

export function setAuthToken(token) {
    localStorage.setItem("authToken", token);
}