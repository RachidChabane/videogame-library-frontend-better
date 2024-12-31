import type {PageServerLoad} from "../../../.svelte-kit/types/src/routes/games/[id]/$types";
import {getAllGames} from "$lib/server/game/gameService";
import {error} from "@sveltejs/kit";
import type {Game} from "$lib/types/game/game";

export const load = (async ({ url }) => {
    const name = url.searchParams.get('name') || undefined;
    const genre = url.searchParams.get('genre') || undefined;
    const studioName = url.searchParams.get('studioName') || undefined;
    const releaseYear = url.searchParams.get('releaseYear') ?
        parseInt(url.searchParams.get('releaseYear')!) : undefined;
    const sort = url.searchParams.get('sort') || undefined;
    const page = url.searchParams.get('page') ?
        parseInt(url.searchParams.get('page')!) : 0;

    const games = await getAllGames({
        name,
        genre,
        studioName,
        releaseYear,
        sort,
        page
    });

    if (!games) {
        throw error(404, 'Games not found');
    }

    return {
        games: games
    };
}) satisfies PageServerLoad;