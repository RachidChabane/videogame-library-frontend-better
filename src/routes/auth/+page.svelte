<script lang="ts">
    import LoginForm from "./LoginForm.svelte";
    import RegisterForm from "./RegisterForm.svelte";

    let showLogin = $state(true);
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div class="flex justify-center space-x-4 mb-8">
            <button
                    class="px-4 py-2 {showLogin ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}"
                    onclick={() => showLogin = true}
            >
                Connexion
            </button>
            <button
                    class="px-4 py-2 {!showLogin ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}"
                    onclick={() => showLogin = false}
            >
                Inscription
            </button>
        </div>

        {#if showLogin}
            <LoginForm />
        {:else}
            <RegisterForm />
        {/if}
    </div>
</div>