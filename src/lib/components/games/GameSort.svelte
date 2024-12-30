<script lang="ts">
    import type { GameFilterParams } from '$lib/types/game/game';
    
    let { onFilterChange } = $props<{
        onFilterChange: (key: keyof GameFilterParams, value: any) => void;
    }>();
</script>

<div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-semibold text-gray-700 mb-4">Trier par</h2>
    
    <select
        class="w-full border p-2 rounded focus:ring-2 focus:ring-blue-200"
        onchange={(e) => onFilterChange('sort', e.currentTarget.value)}
    >
        <option value="name,asc">Nom (A-Z)</option>
        <option value="name,desc">Nom (Z-A)</option>
        <option value="studioName,asc">Studio (A-Z)</option>
        <option value="studioName,desc">Studio (Z-A)</option>
        <option value="releaseYear,asc">Année (Plus ancien)</option>
        <option value="releaseYear,desc">Année (Plus récent)</option>
        <option value="genre,asc">Genre (A-Z)</option>
        <option value="genre,desc">Genre (Z-A)</option>
    </select>
</div>