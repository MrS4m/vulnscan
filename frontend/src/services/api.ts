import type { ApiResponse, ScanResultDto, ScanMode } from '../types';

const API_BASE = '/api/v1';

async function request<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || `Request failed with status ${response.status}`);
    }

    return data;
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
