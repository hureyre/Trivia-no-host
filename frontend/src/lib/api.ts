// frontend/src/lib/api.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/Trivia-no-host/api/index.php';

export async function apiCall(action: string, params: Record<string, any> = {}, method: 'GET' | 'POST' = 'GET') {
    const url = new URL(API_BASE_URL);
    url.searchParams.append('action', action);

    let options: RequestInit = {
        method: method,
    };

    if (method === 'GET') {
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, String(value));
        });
    } else {
        const formData = new FormData();
        Object.entries(params).forEach(([key, value]) => {
            formData.append(key, String(value));
        });
        options.body = formData;
    }

    const response = await fetch(url.toString(), options);
    if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
    }
    return response.json();
}
