import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getGameById, updateGame, deleteGame } from '$lib/server/game/gameService';

export const load: PageServerLoad = (async ({ params }) => {
    const gameId = parseInt(params.id);
    const game = await getGameById(gameId);

    if (!game) {
        throw error(404, 'Game not found');
    }

    return {
        game: game
    };
}) satisfies PageServerLoad;

export const actions = {
    update: async ({ params, locals }) => {
        const gameId = parseInt(params.id);
        try {
            const gameData = {
                name: locals.formData.name as string,
                genre: locals.formData.genre as string,
                releaseYear: locals.formData.releaseYear as number
            };
            const updatedGame = await updateGame(gameId, gameData);
            return { success: true, game: updatedGame };
        } catch (err) {
            return { success: false, error: 'Failed to update game' };
        }
    },

    delete: async ({ params }) => {
        const gameId = parseInt(params.id);

        try {
            await deleteGame(gameId);
            return { success: true };
        } catch (err) {
            return { success: false, error: 'Failed to delete game' };
        }
    }
};