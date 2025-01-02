<script lang="ts">
    import { page } from '$app/state';
    import BaseError from './errors/BaseError.svelte';
</script>

<BaseError status={page.status} message={page.error?.message || 'Une erreur est survenue'} />