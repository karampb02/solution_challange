// API client utilities for fetching data from route handlers
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export interface Candidate {
    id: string;
    name: string;
    avatar: string;
    title: string;
    location: string;
    matchScore: number;
    cultureScore: number;
    skills: string[];
    highlight: string;
    availability: string;
    source: string;
    experience: string;
}

export interface Signal {
    id: string;
    type: string;
    title: string;
    description: string;
    timestamp: string;
    urgency: string;
    status: string;
    matchCount?: number;
    source: string;
}

export interface Activity {
    id: string;
    type: string;
    title: string;
    description: string;
    timestamp: string;
}

export interface InterviewPrep {
    id: string;
    candidateId: string;
    candidateName: string;
    role: string;
    time: string;
    matchedProject: string;
    questions: string[];
    insights: string[];
}

export interface CultureDimension {
    id: string;
    label: string;
    teamScore: number;
    description: string;
}

interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        total: number;
        limit: number;
        skip: number;
        pages: number;
    };
}

interface CollectionResponse<T> {
    data: T[];
}

export interface FetchOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: unknown;
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
    return apiFetch<PaginatedResponse<Candidate>>(
        `/candidates?limit=${limit}&skip=${skip}`
    );
}

export async function getCandidate(id: string) {
    return apiFetch(`/candidates/${id}`);
}

export async function createCandidate(data: any) {
    return apiFetch<Candidate>("/candidates", { method: "POST", body: data });
}

export async function updateCandidate(id: string, data: any) {
    return apiFetch<Candidate>(`/candidates/${id}`, { method: "PUT", body: data });
}

export async function deleteCandidate(id: string) {
    return apiFetch<{ success: boolean }>(`/candidates/${id}`, {
        method: "DELETE",
    });
}

// Signals API
export async function getSignals(limit = 10, skip = 0, filters: any = {}) {
    const params = new URLSearchParams({
        limit: limit.toString(),
        skip: skip.toString(),
        ...filters,
    });
    return apiFetch<PaginatedResponse<Signal>>(`/signals?${params.toString()}`);
}

export async function createSignal(data: any) {
    return apiFetch<Signal>("/signals", { method: "POST", body: data });
}

// Culture API
export async function getCultureDimensions() {
    return apiFetch<CollectionResponse<CultureDimension>>("/culture");
}

export async function createCultureDimension(data: any) {
    return apiFetch<CultureDimension>("/culture", { method: "POST", body: data });
}

// Activity API
export async function getActivities(limit = 20, skip = 0) {
    return apiFetch<PaginatedResponse<Activity>>(
        `/activity?limit=${limit}&skip=${skip}`
    );
}

export async function createActivity(data: any) {
    return apiFetch<Activity>("/activity", { method: "POST", body: data });
}

// Interviews API
export async function getInterviews(limit = 10, skip = 0) {
    return apiFetch<PaginatedResponse<InterviewPrep>>(
        `/interviews?limit=${limit}&skip=${skip}`
    );
}

export async function createInterview(data: any) {
    return apiFetch<InterviewPrep>("/interviews", { method: "POST", body: data });
}
