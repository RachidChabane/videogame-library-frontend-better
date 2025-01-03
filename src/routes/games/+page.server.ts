import type {PageServerLoad} from "../../../.svelte-kit/types/src/routes/games/[id]/$types";
import {getAllGames, getAllGenres, getAllReleaseYears, getAllStudios} from "$lib/server/game/gameService";
import {error} from "@sveltejs/kit";

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

    const studios = await getAllStudios();
    const genres = await getAllGenres();
    const years = await getAllReleaseYears();

    return {
        studios: studios,
        genres: genres,
        years: years,
        games: games
    };
}) satisfies PageServerLoad;