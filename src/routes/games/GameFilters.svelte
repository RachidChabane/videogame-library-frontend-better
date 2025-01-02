<script lang="ts">
    import type { GameFilterParams } from '$lib/types/game/game';

    let { studioOptions, genreOptions, yearOptions, onFilterChange } = $props<{
        studioOptions: string[];
        genreOptions: string[];
        yearOptions: number[];
        onFilterChange: (key: keyof GameFilterParams, value: any) => void;
    }>();

    let nameDebounceTimeout: ReturnType<typeof setTimeout>;

    const handleNameInput = (e: Event) => {
        const value = (e.target as HTMLInputElement).value;
        clearTimeout(nameDebounceTimeout);
        nameDebounceTimeout = setTimeout(() => {
            onFilterChange('name', value);
        }, 300);
    }
</script>

<div class="bg-white p-6 rounded-lg shadow-md space-y-4">
    <h2 class="text-xl font-semibold text-gray-700 mb-4">Filtrer par</h2>

    <div class="space-y-4">
        <input
            type="text"
            placeholder="Nom"
            class="w-full border p-2 rounded focus:ring-2 focus:ring-blue-200"
            oninput={handleNameInput}
        />

        <select
            class="w-full border p-2 rounded focus:ring-2 focus:ring-blue-200"
            onchange={(e) => onFilterChange('studioName', e.currentTarget.value)}
        >
            <option value="">Tous les studios</option>
            {#each studioOptions as studio}
                <option value={studio}>{studio}</option>
            {/each}
        </select>

        <select
            class="w-full border p-2 rounded focus:ring-2 focus:ring-blue-200"
            onchange={(e) => onFilterChange('releaseYear', parseInt(e.currentTarget.value) || undefined)}
        >
            <option value="">Toutes les années</option>
            {#each yearOptions as year}
                <option value={year}>{year}</option>
            {/each}
        </select>

        <select
            class="w-full border p-2 rounded focus:ring-2 focus:ring-blue-200"
            onchange={(e) => onFilterChange('genre', e.currentTarget.value)}
        >
            <option value="">Tous les genres</option>
            {#each genreOptions as genre}
                <option value={genre}>{genre}</option>
            {/each}
        </select>
    </div>
</div>