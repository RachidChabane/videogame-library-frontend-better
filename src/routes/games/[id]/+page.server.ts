import {error, fail} from '@sveltejs/kit';
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
    updateGame: async ({ params, request }) => {
        console.log('🚀 updateGame action started', { params });

        try {
            const gameId = parseInt(params.id);
            console.log('📝 Parsed gameId:', gameId);

            if (isNaN(gameId)) {
                return fail(400, { error: 'Invalid game ID' });
            }

            // Read form data ONCE and store it
            const formData = await request.formData();

            // Convert form data to an object for easier handling
            const data = {
                name: formData.get('name')?.toString(),
                genre: formData.get('genre')?.toString(),
                releaseYear: parseInt(formData.get('releaseYear')?.toString() || '')
            };

            console.log('📬 Form data:', data);

            if (!data.name || !data.genre || !data.releaseYear) {
                return fail(400, {
                    error: 'Missing required fields',
                    data
                });
            }

            const updatedGame = await updateGame(gameId, {
                name: data.name,
                genre: data.genre,
                releaseYear: data.releaseYear
            });

            return { success: true, game: updatedGame };

        } catch (error) {
            console.error('❌ Failed to update game:', error);
            return fail(500, {
                error: 'Failed to update game',
                message: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    },

    deleteGame: async ({ params }) => {
        try {
            const gameId = parseInt(params.id);
            if (isNaN(gameId)) {
                return fail(400, { error: 'Invalid game ID' });
            }

            await deleteGame(gameId);
            return { success: true };
        } catch (error) {
            return fail(500, {
                error: 'Failed to delete game',
                message: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
};