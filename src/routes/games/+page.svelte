<script lang="ts">
    import GameTable from './GameTable.svelte';
    import GameFilters from './GameFilters.svelte';
    import GameSort from './GameSort.svelte';
    import GamePagination from './GamePagination.svelte';
    import type { GameFilterParams, Game } from '$lib/types/game/game';
    import { goto } from '$app/navigation';
    import { page } from '$app/state';

    const studioOptions = [...new Set(page.data.games.content.map((g: Game) => g.studioName))] as string[];
    const genreOptions = [...new Set(page.data.games.content.map((g: Game) => g.genre))] as string[];
    const yearOptions = [...new Set(page.data.games.content.map((g: Game) => g.releaseYear))] as number[];

    const handleFilterChange = (key: keyof GameFilterParams, value: any) => {
        const params = new URLSearchParams(page.url.searchParams);

        if (value) {
            params.set(key, value.toString());
        } else {
            params.delete(key);
        }

        params.delete('page');

        goto(`/games?${params.toString()}`);
    }

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(page.url.searchParams);
        params.set('page', newPage.toString());
        goto(`/games?${params.toString()}`);
    }
</script>

<div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Bibliothèque de jeux</h1>

    <div class="grid md:grid-cols-[250px_1fr] gap-6">
        <!-- Filters sidebar -->
        <div class="space-y-6">
            <GameFilters
                    {studioOptions}
                    {genreOptions}
                    {yearOptions}
                    onFilterChange={handleFilterChange}
            />

            <GameSort
                    onFilterChange={handleFilterChange}
            />
        </div>

        <!-- Games grid/table -->
        <div class="space-y-6">
            <GameTable games={page.data.games.content} />

            <GamePagination
                    currentPage={page.data.games.page.number + 1}
                    totalPages={page.data.games.page.totalPages}
                    onPageChange={handlePageChange}
            />
        </div>
    </div>
</div>