import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// 즉시 실행 함수 => API_BASE_URL을 반환
export const API_BASE_URL = (() => {
    const envApiUrl = import.meta.env.VITE_API_BASE_URL;

    if (envApiUrl) {
        const baseUrl = envApiUrl.endsWith('/') ? envApiUrl.slice(0, -1) : envApiUrl;
        return `${baseUrl}/api`;
    }

    return '/api';
})();

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = localStorage.getItem('jwt');

    // 토큰이 존재하면 항상 헤더에 Authorization을 추가
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
