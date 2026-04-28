// API client utilities for fetching data from the backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export interface FetchOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: any;
}

async function apiFetch<T>(
    endpoint: string,
    options: FetchOptions = {}
): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };

    const response = await fetch(url, {
        method: options.method || "GET",
        headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error || `API error: ${response.status}`);
    }

    return response.json();
}

// Candidates API
export async function getCandidates(limit = 10, skip = 0) {
    return apiFetch(`/candidates?limit=${limit}&skip=${skip}`);
}

export async function getCandidate(id: string) {
    return apiFetch(`/candidates/${id}`);
}

export async function createCandidate(data: any) {
    return apiFetch("/candidates", { method: "POST", body: data });
}

export async function updateCandidate(id: string, data: any) {
    return apiFetch(`/candidates/${id}`, { method: "PUT", body: data });
}

export async function deleteCandidate(id: string) {
    return apiFetch(`/candidates/${id}`, { method: "DELETE" });
}

// Signals API
export async function getSignals(limit = 10, skip = 0, filters: any = {}) {
    const params = new URLSearchParams({
        limit: limit.toString(),
        skip: skip.toString(),
        ...filters,
    });
    return apiFetch(`/signals?${params}`);
}

export async function createSignal(data: any) {
    return apiFetch("/signals", { method: "POST", body: data });
}

// Culture API
export async function getCultureDimensions() {
    return apiFetch("/culture");
}

export async function createCultureDimension(data: any) {
    return apiFetch("/culture", { method: "POST", body: data });
}

// Activity API
export async function getActivities(limit = 20, skip = 0) {
    return apiFetch(`/activity?limit=${limit}&skip=${skip}`);
}

export async function createActivity(data: any) {
    return apiFetch("/activity", { method: "POST", body: data });
}

// Interviews API
export async function getInterviews(limit = 10, skip = 0) {
    return apiFetch(`/interviews?limit=${limit}&skip=${skip}`);
}

export async function createInterview(data: any) {
    return apiFetch("/interviews", { method: "POST", body: data });
}
