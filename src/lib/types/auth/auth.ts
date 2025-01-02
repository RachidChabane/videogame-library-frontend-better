export type LoginRequest = {
    username: string;
    password: string;
}

export type RegisterRequest = {
    username: string;
    email: string;
    password: string;
}

export type AuthResponse = {
    token: string;
}