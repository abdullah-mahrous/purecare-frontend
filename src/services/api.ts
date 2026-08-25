const apiUrl = import.meta.env.VITE_API_URL;

type RequestOptions = Omit<RequestInit, 'body'> & { body?: unknown };

export async function apiRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    if (!apiUrl)
        throw new Error('VITE_API_URL is not configured');

    const response = await fetch(`${apiUrl.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`, {
        ...options,
        headers: options.body instanceof FormData
            ? options.headers
            : { 'Content-Type': 'application/json', ...options.headers },
        body: options.body instanceof FormData || options.body === undefined
            ? options.body
            : JSON.stringify(options.body),
    });

    if (!response.ok)
        throw new Error(`API request failed with status ${response.status}`);

    const contentType = response.headers.get('content-type');
    return contentType?.includes('application/json') ? response.json() as Promise<T> : undefined as T;
}