import { apiRequest, type RequestOptions } from './api';

const tokenCookieName = 'purecare_token';

function setToken(token: string) {
    document.cookie = `${tokenCookieName}=${encodeURIComponent(token)}; path=/; SameSite=Lax`;
}

export function getToken(): string | null {
    // Keep the JWT in a cookie so every authenticated API operation can reuse it.
    const token = document.cookie
        .split('; ')
        .find((cookie) => cookie.startsWith(`${tokenCookieName}=`))
        ?.split('=')[1];

    return token ? decodeURIComponent(token) : null;
}

export async function authenticate(email: string, password: string): Promise<void> {
    const response = await apiRequest<{ data: { token: string } }>('/auth/login', {
        method: 'POST',
        body: { email, password },
    });

    const token = response.data.token;

    if (!token)
        throw new Error('Authentication token was not returned.');

    setToken(token);
}

export function authenticatedRequest<T>(endpoint: string, options: RequestOptions = {}) {
    const token = getToken();

    if (!token) {
        throw new Error('Authentication is required for this request.');
    }

    return apiRequest<T>(endpoint, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        },
    });
}
