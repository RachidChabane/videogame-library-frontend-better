import { fail, redirect } from '@sveltejs/kit';
import { login, register } from '$lib/server/auth/authService';
import { goto } from '$app/navigation';


export const actions = {
    login: async ({ cookies, request }) => {
        const data = await request.formData();
        const username = data.get('username')?.toString();
        const password = data.get('password')?.toString();

        if (!username || !password) {
            return fail(400, { error: 'Missing username or password' });
        }

        try {
            const response = await login({ username, password });
            
            cookies.set('token', response.token, {
                httpOnly: true,
                path: '/',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 // 24 hours
            });
            redirect(302, '/games');
        } catch (error) {
            return fail(401, { 
                error: error instanceof Error ? error.message : 'Invalid credentials',
                username 
            });
        }
    },

    register: async ({ cookies, request }) => {
        const data = await request.formData();
        const username = data.get('username');
        const email = data.get('email');
        const password = data.get('password');
        const confirmPassword = data.get('confirmPassword');

        if (!username || !email || !password || !confirmPassword) {
            return fail(400, { error: 'All fields are required' });
        }

        if (password !== confirmPassword) {
            return fail(400, { error: 'Passwords do not match' });
        }

        try {
            const response = await register({
                username: username.toString(),
                email: email.toString(),
                password: password.toString()
            });

            cookies.set('token', response.token, {
                httpOnly: true,
                path: '/',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24
            });
            console.log("should now redirect to games");
            redirect(302, '/games');
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'Registration failed';
            return fail(400, { error: errorMessage });
        }
    },

    logout: async ({ cookies }) => {
        cookies.delete('token', { path: '/' });
        redirect(302, '/auth');
    }
};