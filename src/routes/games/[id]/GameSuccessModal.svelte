<script lang="ts">
    let { message, duration = 2000, autoHide = true } = $props<{
        message: string;
        duration?: number;
        autoHide?: boolean;
    }>();

    let visible = $state(true);

    $effect(() => {
        if (autoHide) {
            const timer = setTimeout(() => {
                visible = false;
            }, duration);

            return () => clearTimeout(timer);
        }
    });
</script>

{#if visible}
<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <div class="text-center">
            <div class="mb-4 text-green-500">
                <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>
            <h2 class="text-xl font-bold mb-4">Succès</h2>
            <p class="mb-6">{message}</p>
        </div>
    </div>
</div>
{/if}