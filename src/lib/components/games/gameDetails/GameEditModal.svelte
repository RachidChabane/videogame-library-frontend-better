<script lang="ts">
    import type { Game } from '$lib/types/game/game';
    import { updateGame } from '$lib/services/games/gameService';

    let { game, onClose, onSuccess } = $props<{
        game: Game;
        onClose: () => void;
        onSuccess: () => void;
    }>();

    let editedGame = $state<Partial<Game>>({
        name: game.name,
        genre: game.genre,
        releaseYear: game.releaseYear
    });
    let loading = $state(false);
    let error = $state('');

    async function handleSubmit() {
        loading = true;
        error = '';

        try {
            await updateGame(game.id, editedGame);
            onSuccess();
        } catch (err) {
            error = "Erreur lors de la modification du jeu";
        } finally {
            loading = false;
        }
    }
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold">Modifier {game.name}</h2>
            <button 
                onclick={onClose}
                class="text-gray-500 hover:text-gray-700"
                aria-label="Fermer"
            >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        {#if error}
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
            </div>
        {/if}

        <form onsubmit={handleSubmit} class="space-y-4">
            <!-- Disabled fields -->
            <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
                    Nom
                </label>
                <input
                    id="name"
                    type="text"
                    value={game.name}
                    disabled
                    class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
                />
            </div>

            <div>
                <label for="studioName" class="block text-sm font-medium text-gray-700 mb-1">
                    Studio
                </label>
                <input
                    id="studioName"
                    type="text"
                    value={game.studioName}
                    disabled
                    class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
                />
            </div>

             <!-- Editable fields -->
            <div>
                <label for="genre" class="block text-sm font-medium text-gray-700 mb-1">
                    Genre
                </label>
                <input
                    id="genre"
                    type="text"
                    bind:value={editedGame.genre}
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div>
                <label for="releaseYear" class="block text-sm font-medium text-gray-700 mb-1">
                    Année de sortie
                </label>
                <input
                    id="releaseYear"
                    type="number"
                    bind:value={editedGame.releaseYear}
                    required
                    min="1950"
                    max={new Date().getFullYear()}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <!-- Disabled platforms -->
            <div>
                <label for="platforms" class="block text-sm font-medium text-gray-700 mb-1">
                    Plateformes
                </label>
                <div id="platforms" class="flex flex-wrap gap-2">
                    {#each game.platforms as platform}
                        <span class="px-3 py-1 bg-gray-100 text-gray-600 rounded">
                            {platform}
                        </span>
                    {/each}
                </div>
            </div>

            <div class="flex justify-end space-x-4 mt-6">
                <button
                    type="button"
                    onclick={onClose}
                    class="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                    Annuler
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    class="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                >
                    {loading ? 'Modification...' : 'Enregistrer'}
                </button>
            </div>
        </form>
    </div>
</div>