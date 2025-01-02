<script lang="ts">
    import { goto } from '$app/navigation';
    import type { Game } from '$lib/types/game/game';

    let { games } = $props<{
        games: Game[];
    }>();

    const fields = [
        { field: 'name', label: 'Nom' },
        { field: 'studioName', label: 'Studio' }
        /*,
        { field: 'releaseYear', label: 'Année' },
        { field: 'genre', label: 'Genre' },
        { field: 'platforms', label: 'Plateformes' }
        */
    ];

    const navigateToGame = (id: number) => {
        goto(`/games/${id}`);
    }
</script>

<!-- Mobile View -->
<div class="md:hidden">
    {#each games as game}
        <div 
            class="bg-white mb-4 rounded-lg shadow p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            onclick={() => navigateToGame(game.id)}
            onkeypress={(e) => e.key === 'Enter' && navigateToGame(game.id)}
            role="button"
            tabindex="0"
        >
            <h3 class="font-semibold text-lg text-blue-900">{game.name}</h3>
            <div class="mt-2 space-y-1 text-sm text-gray-600">
                <p><span class="font-medium">Studio:</span> {game.studioName}</p>
                <!--
                <p><span class="font-medium">Année:</span> {game.releaseYear}</p>
                <p><span class="font-medium">Genre:</span> {game.genre}</p>
                <p><span class="font-medium">Plateformes:</span> {game.platforms.join(', ')}</p>
                -->
            </div>
        </div>
    {/each}
</div>

<!-- Desktop View -->
<div class="hidden md:block">
    <table class="table-auto w-full border-collapse rounded-lg overflow-hidden shadow mb-6">
        <thead class="bg-blue-50 text-blue-900">
            <tr>
                {#each fields as field}
                    <th class="p-3 border border-blue-100 cursor-pointer hover:bg-blue-100">
                        {field.label}
                    </th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each games as game}
                <tr
                    class="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                    onclick={() => navigateToGame(game.id)}
                    onkeypress={(e) => e.key === 'Enter' && navigateToGame(game.id)}
                    role="link"
                    tabindex="0"
                >
                    <td class="p-3 border border-gray-200">{game.name}</td>
                    <td class="p-3 border border-gray-200">{game.studioName}</td>
                    <!--
                    <td class="p-3 border border-gray-200">{game.releaseYear}</td>
                    <td class="p-3 border border-gray-200">{game.genre}</td>
                    <td class="p-3 border border-gray-200">{game.platforms.join(', ')}</td>
                    -->
                </tr>
            {/each}
        </tbody>
    </table>
</div>