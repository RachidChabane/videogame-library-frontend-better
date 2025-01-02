import { redirect } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

export const requireAuth = (event: RequestEvent) => {
    if (!event.locals.user) {
        throw redirect(302, '/auth');
    }
    return event.locals.user;
}
