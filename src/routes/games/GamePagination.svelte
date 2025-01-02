<script lang="ts">
    let { currentPage, totalPages, onPageChange } = $props<{
        currentPage: number;
        totalPages: number;
        onPageChange: (page: number) => void;
    }>();
</script>

<div class="flex items-center justify-between">
    <button
        class="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 hover:bg-blue-600"
        disabled={currentPage <= 1}
        onclick={() => onPageChange(currentPage - 1)}
    >
        Précédent
    </button>
    <span class="mx-4 font-semibold">
        Page {currentPage} / {totalPages === 0 ? 1 : totalPages}
    </span>
    <button
        class="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 hover:bg-blue-600"
        disabled={currentPage >= totalPages}
        onclick={() => onPageChange(currentPage + 1)}
    >
        Suivant
    </button>
</div>