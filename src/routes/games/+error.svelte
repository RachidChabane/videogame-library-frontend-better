<script lang="ts">
    import { page } from '$app/state';
    import BaseError from '../errors/BaseError.svelte';
</script>

<BaseError
        status={page.status}
        message={page.status === 404 ? "Le jeu demandé n'a pas été trouvé" : page.error?.message ?? "Une erreur est survenue"}
        color="orange"
/>