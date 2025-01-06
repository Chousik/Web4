import { fetcher } from './fetcher';

/**
 * POST /api/auth/login
 * Логин пользователя с помощью login & password.
 * Сервер вернёт cookie (auth_token) при успехе.
 */
export async function loginUser(username, password) {
    await fetcher('http://localhost:8080/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        credentials: 'include',
    });
    // Если не упало в исключение — считаем, что залогинились
}

/**
 * POST /api/auth/register
 * Регистрация нового пользователя.
 * Сервер так же вернёт cookie (auth_token) при успехе.
 */
export async function registerUser(username, password) {
    await fetcher('http://localhost:8080/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        credentials: 'include',
    });
    // Если не упало — ок.
}

/**
 * "Выход" (формально серверного метода нет).
 * Можно сбросить cookie на фронтенде (если она не HttpOnly).
 * Если же cookie HttpOnly — нужен эндпоинт logout на бэке.
 */
export function logoutUser() {
    // Попытка удалить cookie (не сработает для HttpOnly).
    document.cookie =
        'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}
