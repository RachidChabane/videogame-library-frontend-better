<script lang="ts">
    import { page } from "$app/state";

    const isAuthenticated = () => {
        //return page.data.user != undefined;
        return false; // tant que l'authent ne fonctionne pas
    }

    const getUsername = () => {
        return page.data.user?.username;
    }
</script>

<nav class="bg-white shadow-lg">
    <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between h-16">
            <div class="flex items-center">
                <a href="/games" class="text-xl font-bold text-gray-800 hover:text-blue-600">
                    Bibliothèque de jeux
                </a>
            </div>

            <div class="flex items-center space-x-4">
                {#if isAuthenticated()}
                    <span class="text-gray-600">
                        Bonjour, {getUsername()}
                    </span>
                    <form action="/auth?/logout" method="POST">
                        <button
                                type="submit"
                                class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                        >
                            Déconnexion
                        </button>
                    </form>
                {:else}
                    <a
                            href="/auth"
                            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Se connecter
                    </a>
                {/if}
            </div>
        </div>
    </div>
</nav>