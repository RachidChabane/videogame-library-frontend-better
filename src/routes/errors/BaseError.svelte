<script lang="ts">
    export let status: number;
    export let message: string;
    export let color = "red";
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 class="text-4xl font-bold text-{color}-600 mb-4">{status}</h1>
        <p class="text-gray-600 mb-6">{message}</p>
        <a
                href="/"
                class="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
            Retour à l'accueil
        </a>
    </div>
</div>