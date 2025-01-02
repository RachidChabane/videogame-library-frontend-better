import type { AuthResponse, LoginRequest, RegisterRequest } from '$lib/types/auth/auth';
import { error } from '@sveltejs/kit';
import {API_URL} from '$lib/server/api/api';

const BASE_URL = `${API_URL}/api/auth`;

export const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
    }

    return data;
}

export const register = async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        throw error(response.status, 'Registration failed');
    }
    console.log(response.json());
    return response.json();
}
