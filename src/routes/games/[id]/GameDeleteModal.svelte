<script lang="ts">
    import { enhance } from '$app/forms';
    import type { Game } from '$lib/types/game/game';

    let { game, onClose, onSuccess } = $props<{
        game: Game;
        onClose: () => void;
        onSuccess: () => void;
    }>();

    const handleDelete = () => {
        return async ({ result }: { result: { type: string } }) => {
            if (result.type === 'success') {
                onSuccess();
            }
        };
    };
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 class="text-2xl font-bold mb-4">Supprimer le jeu</h2>

        <p class="mb-6 text-gray-600">
            Êtes-vous sûr de vouloir supprimer {game.name} ? Cette action est irréversible.
        </p>

        <form
                method="POST"
                action="?/delete"
                use:enhance={handleDelete}
        >
            <div class="flex justify-end space-x-3">
                <button
                        type="button"
                        onclick={onClose}
                        class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                    Annuler
                </button>
                <button
                        type="submit"
                        class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                    Supprimer
                </button>
            </div>
        </form>
    </div>
</div>