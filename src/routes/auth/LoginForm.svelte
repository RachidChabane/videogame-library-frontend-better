<script lang="ts">
    import { enhance } from '$app/forms';
    import type { ActionResult } from '@sveltejs/kit';
    let error = $state<string>();

    const handleSubmit = () => {
        return async ({ result }: { result: ActionResult }) => {
            if (result.type === 'failure') {
                error = result.data?.error;
            }
        };
    }
</script>

<form method="POST" action="?/login" use:enhance={handleSubmit}>
    <div class="space-y-4">
        <div>
            <label for="username" class="block text-sm font-medium text-gray-700">
                Nom d'utilisateur
            </label>
            <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
        </div>

        <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
                Mot de passe
            </label>
            <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
        </div>

        {#if error}
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
            </div>
        {/if}

        <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
            Se connecter
        </button>
    </div>
</form>