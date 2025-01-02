import {type Handle} from "@sveltejs/kit";
import {jwtDecode} from "jwt-decode";
import {sequence} from "@sveltejs/kit/hooks";

// Middleware pour vérifier si l'utilisateur est connecté
export const auth: Handle = async ({ event, resolve }) => {
    const token = event.cookies.get('token');

    if (!token) {
        return resolve(event);
    }

    try {
        const decoded = jwtDecode<{
            sub: string,
            email: string,
            roles: string[]
        }>(token);

        event.locals.user = {
            username: decoded.sub,
            email: decoded.email,
            roles: decoded.roles
        }

    } catch {
        event.cookies.delete('token', { path: '/' });
    }

    return resolve(event);
};

export const handle = sequence(auth);
