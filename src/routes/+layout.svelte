<script lang="ts">
	import '../app.css';
    import Navbar from "./Navbar.svelte";
	let { children } = $props();
</script>

<div class="min-h-screen bg-gray-100">
    <Navbar />
    <main class="pt-4">
        {@render children()}
    </main>
</div>