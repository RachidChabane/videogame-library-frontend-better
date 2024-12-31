<script lang="ts">
    import GameEditModal from './GameEditModal.svelte';
    import GameDeleteModal from './GameDeleteModal.svelte';
    import GameSuccessModal from './GameSuccessModal.svelte';
    import type { Game } from '$lib/types/game/game';
    import { page } from '$app/state';
    import {goto} from "$app/navigation";

    let { data } = $props();
    let game = $state<Game>(data.game);
    let error = $state<string>();
    let showDeleteModal = $state(false);
    let showSuccessModal = $state(false);
    let showEditModal = $state(false);
    let successMessage = $state('');

    // TODO : remplacer true par false après avoir correctement implémenté l'authentification
    const canModify = () => {
        return page.data.user?.roles?.includes('ROLE_USER') ?? true
    }

    const handleModify = () => {
        showEditModal = true;
    }

    const handleCloseModal = () => {
        showEditModal = false;
        showDeleteModal = false;
    }

    const handleGameUpdate = (updatedGame: Game) => {
        game = updatedGame; // Update the local game state
        showEditModal = false;
        successMessage = 'Le jeu a été modifié avec succès';
        showSuccessModal = true;
    }

    const handleGameDelete = () => {
        showDeleteModal = false;
        successMessage = 'Le jeu a été supprimé avec succès';
        showSuccessModal = true;
        setTimeout(() => {
            goto('/games');
        }, 2000);
    };
</script>
<div class="container mx-auto min-h-screen p-6 bg-gray-200">
{#if error}
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {error}
    </div>
{:else if game}
    <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex justify-between items-start mb-6">
            <h1 class="text-4xl font-bold text-gray-800">{game.name}</h1>

            {#if canModify()}
                <div class="flex space-x-4">
                    <button
                            onclick={handleModify}
                            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Modifier
                    </button>
                    <button
                            onclick={() => showDeleteModal = true}
                            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Supprimer
                    </button>
                </div>
            {/if}
        </div>

        <div class="grid md:grid-cols-2 gap-6">
            <div>
                <h2 class="text-xl font-semibold mb-4">Détails</h2>
                <ul class="space-y-3">
                    <li><span class="font-medium">Studio:</span> {game.studioName}</li>
                    <li><span class="font-medium">Genre:</span> {game.genre}</li>
                    <li><span class="font-medium">Année de sortie:</span> {game.releaseYear}</li>
                </ul>
            </div>

            <div>
                <h2 class="text-xl font-semibold mb-4">Plateformes</h2>
                <div class="flex flex-wrap gap-2">
                    {#each game.platforms as platform}
                            <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded">
                                {platform}
                            </span>
                    {/each}
                </div>
            </div>
        </div>
    </div>
{:else}
    <div class="flex justify-center items-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
{/if}
<!-- Edit Modal -->
{#if showEditModal && game}
    <GameEditModal
            {game}
            onClose={handleCloseModal}
            onUpdate={handleGameUpdate}
    />
{/if}
</div>
{#if showDeleteModal && game}
    <GameDeleteModal
            {game}
            onClose={handleCloseModal}
            onSuccess={handleGameDelete}
    />
{/if}

{#if showSuccessModal}
    <GameSuccessModal
            message={successMessage}
    />
{/if}