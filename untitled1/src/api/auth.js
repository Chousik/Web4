// src/api/auth.js
export async function loginUser(username, password) {
    await fetcher('http://localhost:8080/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        credentials: 'include',
    });
    // If no exception is thrown, login is successful
}

/**
 * POST /api/auth/register
 * Registers a new user.
 * Server returns a cookie (auth_token) upon success.
 */
export async function registerUser(username, password) {
    await fetcher('http://localhost:8080/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        credentials: 'include',
    });
    // If no exception is thrown, registration is successful
}

/**
 * "Logout" (there is no server-side method).
 * Attempts to delete the auth_token cookie on the frontend.
 * If the cookie is HttpOnly, you need a server-side logout endpoint.
 */
export function logoutUser() {
    // Attempt to delete the cookie (won't work if HttpOnly)
    document.cookie =
        'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict;';
    // Optionally, notify the backend to invalidate the token if necessary
}

/**
 * Checks if the auth_token cookie is present.
 * This function works only if the cookie is not HttpOnly.
 * If the cookie is HttpOnly, use checkAuthStatus instead.
 * @returns {boolean} True if auth_token exists, false otherwise.
 */
export function hasAuthToken() {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    for (let cookie of cookies) {
        if (cookie.startsWith('auth_token=')) {
            const token = cookie.substring('auth_token='.length);
            return token.length > 0;
        }
    }
    return false;
}

/**
 * Checks the authentication status by calling the server-side endpoint.
 * This is necessary if the auth_token cookie is HttpOnly.
 * @returns {Promise<boolean>} True if authenticated, false otherwise.
 */
export async function checkAuthStatus() {
    try {
        const response = await fetcher('http://localhost:8080/api/auth/status', {
            method: 'GET',
            credentials: 'include',
        });
        return response.isAuthenticated; // Adjust based on your API response
    } catch (error) {
        console.error('Error checking auth status:', error);
        return false;
    }
}

/**
 * Universal fetcher for SWR and other data fetching needs.
 * Note the 'credentials: "include"' option to use cookies.
 */
export const fetcher = async (url, options = {}) => {
    const res = await fetch(url, {
        credentials: 'include', // <== important!
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });
    if (!res.ok) {
        const errorBody = await res.text();
        const error = new Error(errorBody);
        error.status = res.status;
        throw error;
    }
    return res.json();
};
