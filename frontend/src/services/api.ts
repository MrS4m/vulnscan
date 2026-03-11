import type { ApiResponse, ScanResultDto, ScanMode } from '../types';

const API_BASE = '/api/v1';

async function request<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
    });

    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
        const errorMsg = isJson && data.message ? data.message : (typeof data === 'string' && data ? data : `Request failed with status ${response.status}`);
        throw new Error(errorMsg);
    }

    return data as T;
}

export const api = {
    scanNetwork: (target: string, scanType: ScanMode = 'quick') =>
        request<ApiResponse<ScanResultDto>>(`${API_BASE}/scan/network`, {
            method: 'POST',
            body: JSON.stringify({ target, scanType }),
        }),

    scanWeb: (target: string, scanType: ScanMode = 'quick') =>
        request<ApiResponse<ScanResultDto>>(`${API_BASE}/scan/web`, {
            method: 'POST',
            body: JSON.stringify({ target, scanType }),
        }),

    healthCheck: () => request<{ status: string }>(`${API_BASE}/health`),
};
