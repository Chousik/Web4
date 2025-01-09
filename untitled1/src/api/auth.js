import {fetcher} from "./fetcher";

export async function loginUser(username, password) {
    await fetcher('http://localhost:8080/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        credentials: 'include',
    });
}

export async function registerUser(username, password) {
    await fetcher('http://localhost:8080/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        credentials: 'include',
    });
}

export async function logoutUser() {
    await fetcher('http://localhost:8080/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
    });
}

export async function checkAuthStatus() {
    try {
        const response = await fetcher('http://localhost:8080/api/auth/status', {
            method: 'GET',
            credentials: 'include',
        });
        return response.isAuthenticated;

    } catch (error) {
        console.error('Error checking auth status:', error);
        return false;
    }
}