import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = localStorage.getItem('jwt');

    if (token) {
        options.headers = {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        };
    }

    const response = await fetch(url, {
        ...options,
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '서버 에러가 발생했습니다');
    }

    if (response.headers.get('Content-Type')?.includes('application/json')) {
        return await response.json();
    } else {
        return response.text();
    }
}
