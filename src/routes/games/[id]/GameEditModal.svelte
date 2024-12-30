<script lang="ts">
    import { enhance } from '$app/forms';
    import type { Game } from '$lib/types/game/game';

    let { game, onClose } = $props<{
        game: Game;
        onClose: () => void;
    }>();
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg p-6 max-w-2xl w-full">
        <h2 class="text-2xl font-bold mb-4">Modifier le jeu</h2>

        <form
                method="POST"
                action="?/update"
                use:enhance={() => {
                return async ({ result }) => {
                    if (result.type === 'success') {
                        onClose();
                    }
                };
            }}
        >
            <div class="space-y-4">
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700">Nom</label>
                    <input
                            type="text"
                            id="name"
                            name="name"
                            value={game.name}
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                    />
                </div>

                <div>
                    <label for="genre" class="block text-sm font-medium text-gray-700">Genre</label>
                    <input
                            type="text"
                            id="genre"
                            name="genre"
                            value={game.genre}
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                    />
                </div>

                <div>
                    <label for="releaseYear" class="block text-sm font-medium text-gray-700">Année de sortie</label>
                    <input
                            type="number"
                            id="releaseYear"
                            name="releaseYear"
                            value={game.releaseYear}
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                    />
                </div>
                <div>
                    <label for="platforms" class="block text-sm font-medium text-gray-700 mb-1">Plateformes</label>
                    <div id="platforms" class="flex flex-wrap gap-2" role="group" aria-label="Plateformes">
                        {#each game.platforms as platform}
                            <span class="px-3 py-1 bg-gray-100 text-gray-600 rounded">
                                {platform}
                            </span>
                        {/each}
                    </div>
                </div>
            </div>

            <div class="mt-6 flex justify-end space-x-3">
                <button
                        type="button"
                        onclick={onClose}
                        class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                    Annuler
                </button>
                <button
                        type="submit"
                        class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                    Sauvegarder
                </button>
            </div>
        </form>
    </div>
</div>