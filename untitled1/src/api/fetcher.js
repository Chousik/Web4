export const fetcher = async (url, options = {}) => {
    const res = await fetch(url, {
        credentials: 'include',
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
