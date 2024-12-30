<script lang="ts">
    let { onConfirm, onCancel } = $props<{
        onConfirm: () => void;
        onCancel: () => void;
    }>();
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 class="text-xl font-bold mb-4">Confirmer la suppression</h2>
        <p class="mb-6">Êtes-vous sûr de vouloir supprimer ce jeu ? Cette action est irréversible.</p>
        <div class="flex justify-end space-x-4">
            <button
                onclick={onCancel}
                class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
                Annuler
            </button>
            <button
                onclick={onConfirm}
                class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
                Supprimer
            </button>
        </div>
    </div>
</div>