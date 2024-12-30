<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { fetchGames } from '$lib/services/games/gameService';
    import { logout } from '$lib/services/auth/authService';
    import { authStore } from '$lib/stores/authStore';
    import type { Game } from '$lib/types/games/game';

    const isActive = (path: string) => {
        return $page.url.pathname.startsWith(path);
    };

    type ClickOutsideAction = {
        destroy: () => void;
    };
    let searchQuery = '';
    let matchingGames: Game[] = [];
    let showDropdown = false;
    let searchDebounceTimeout: ReturnType<typeof setTimeout>;

    async function searchGames(query: string) {
        if (!query.trim()) {
            matchingGames = [];
            return;
        }

        try {
            const response = await fetchGames({ name: query, size: 5 });
            matchingGames = response.content;
            showDropdown = true;
        } catch (error) {
            console.error('Error searching games:', error);
            matchingGames = [];
        }
    }

    function handleInput() {
        clearTimeout(searchDebounceTimeout);
        searchDebounceTimeout = setTimeout(() => {
            searchGames(searchQuery);
        }, 300);
    }

    function selectGame(game: Game) {
        searchQuery = game.name;
        showDropdown = false;
        goto(`/games/${game.id}`);
    }

    function handleClickOutside() {
        showDropdown = false;
    }

    function clickOutside(node: HTMLElement): ClickOutsideAction {
        const handleClick = (event: MouseEvent) => {
            if (node && !node.contains(event.target as Node)) {
                handleClickOutside();
            }
        };

        document.addEventListener('click', handleClick, true);

        return {
            destroy() {
                document.removeEventListener('click', handleClick, true);
            }
        };
    }

    async function handleLogout() {
        logout();
        await goto('/auth/login');
    }
</script>

<nav class="bg-blue-600 shadow-lg">
    <div class="container mx-auto px-6 py-3">
        <div class="flex items-center justify-between">
            <div class="flex space-x-4">
                <a
                    href="/games"
                    class="flex items-center text-white text-xl font-bold hover:text-blue-200 transition-colors"
                >
                    🎮 GameLib
                </a>
                <div class="hidden md:flex items-center space-x-8">
                    <a
                        href="/games"
                        class="text-white hover:text-blue-200 transition-colors py-2 {isActive('/games') ? 'border-b-2 border-white' : ''}"
                    >
                        Jeux
                    </a>
                </div>
            </div>

            <!-- Search Bar -->
            <form class="hidden md:flex items-center relative flex-1 mx-8">
                <div class="relative w-full">
                    <input
                        type="search"
                        placeholder="Rechercher un jeu..."
                        bind:value={searchQuery}
                        oninput={handleInput}
                        class="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    {#if showDropdown && matchingGames.length > 0}
                        <div 
                            class="absolute z-50 w-full bg-white mt-1 rounded-md shadow-lg max-h-60 overflow-y-auto"
                            use:clickOutside
                        >
                            {#each matchingGames as game}
                                <button
                                    type="button"
                                    class="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                                    onclick={() => selectGame(game)}
                                >
                                    <div class="font-medium">{game.name}</div>
                                    <div class="text-sm text-gray-600">{game.studioName} • {game.releaseYear}</div>
                                </button>
                            {/each}
                        </div>
                    {/if}
                </div>
            </form>

            <!-- Right side with auth buttons -->
            <div class="hidden md:flex items-center space-x-4">
                {#if $authStore}
                    <div class="flex items-center space-x-4">
                        <span class="text-white">
                            {$authStore.username}
                        </span>
                        <button
                            onclick={handleLogout}
                            class="px-4 py-2 text-sm font-medium text-blue-600 bg-white rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Déconnexion
                        </button>
                    </div>
                {:else}
                    <a
                        href="/auth/login"
                        class="px-4 py-2 text-sm font-medium text-blue-600 bg-white rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Se connecter
                    </a>
                {/if}
            </div>

            <!-- Mobile Menu Button -->
            <div class="md:hidden">
                <button
                    class="text-white hover:text-blue-200 focus:outline-none"
                    aria-label="Toggle mobile menu"
                    onclick={() => {
                        const mobileMenu = document.getElementById('mobile-menu');
                        mobileMenu?.classList.toggle('hidden');
                    }}
                >
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>
            </div>
        </div>
    </div>

    <!-- Mobile Menu -->
    <div id="mobile-menu" class="hidden md:hidden">
        <!-- Mobile Search -->
        <form class="p-4">
            <div class="flex relative">
                <input
                    type="search"
                    placeholder="Rechercher un jeu..."
                    bind:value={searchQuery}
                    oninput={handleInput}
                    class="flex-1 px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                {#if showDropdown && matchingGames.length > 0}
                    <div 
                        class="absolute z-50 w-full bg-white mt-12 rounded-md shadow-lg max-h-60 overflow-y-auto"
                        use:clickOutside
                    >
                        {#each matchingGames as game}
                            <button
                                type="button"
                                class="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                                onclick={() => selectGame(game)}
                            >
                                <div class="font-medium">{game.name}</div>
                                <div class="text-sm text-gray-600">{game.studioName} • {game.releaseYear}</div>
                            </button>
                        {/each}
                    </div>
                {/if}
            </div>
        </form>
        <div class="px-2 pt-2 pb-3 space-y-1">
            <a
                href="/games"
                class="block px-3 py-2 text-white hover:bg-blue-700 rounded-md {isActive('/games') ? 'bg-blue-700' : ''}"
            >
                Jeux
            </a>
            {#if $authStore}
                <div class="px-3 py-2 text-white">
                    {$authStore.username}
                </div>
                <button
                    onclick={handleLogout}
                    class="block w-full text-left px-3 py-2 text-white hover:bg-blue-700 rounded-md"
                >
                    Déconnexion
                </button>
            {:else}
                <a
                    href="/auth/login"
                    class="block px-3 py-2 text-white hover:bg-blue-700 rounded-md"
                >
                    Se connecter
                </a>
            {/if}
        </div>
    </div>
</nav>