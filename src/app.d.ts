// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type {User} from "$lib/types/user/user";

declare global {
	namespace App {
		// interface Error {}
		interface Locals { user : User, formData : Record<string, unknown> }
		interface Roles { 'ROLE_USER' }
		interface PageData {}
		interface PageState {}
		// interface Platform {}
	}
}

export { Locals, Roles, PageData, PageState };
