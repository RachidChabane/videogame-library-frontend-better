import type {Game, GameCreated, GameUpdated, GameFilterParams, GamePages} from '$lib/types/game/game';
import {API_URL} from '$lib/server/api/api';

const BASE_URL = `${API_URL}/api/games`;
const STUDIO_URL = `${API_URL}/api/studios`;
const PLATFORM_URL = `${API_URL}/api/platforms`;

// Games
export const getAllGames = async (params: GameFilterParams): Promise<GamePages> => {
    const searchParams = new URLSearchParams();
    if (params.name) searchParams.set('name', params.name);
    if (params.genre) searchParams.set('genre', params.genre);
    if (params.releaseYear) searchParams.set('releaseYear', params.releaseYear.toString());
    if (params.studioName) searchParams.set('studioName', params.studioName);
    if (params.platforms) params.platforms.forEach(p => searchParams.append('platforms', p));
    if (params.sort) searchParams.set('sort', params.sort);
    if (params.page !== undefined) searchParams.set('page', params.page.toString());

    const response = await fetch(`${BASE_URL}?${searchParams}`);
    return response.json();
};

export const getGameById = async (id: number): Promise<Game> => {
    const response = await fetch(`${BASE_URL}/${id}`);
    return response.json();
};

export const createGame = async (game: GameCreated): Promise<Game> => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(game)
    });
    return response.json();
};

export const updateGame = async (id: number, game: GameUpdated): Promise<Game> => {
    console.log("Got here: trying to fetch");
    console.log(`${BASE_URL}/${id}`);
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(game)
    });

    if (!response.ok) {
        throw new Error(`Failed to update game: ${response.status} ${response.statusText}`);
    }

    const text = await response.text();
    if (!text) {
        throw new Error('Empty response from server');
    }

    try {
        return JSON.parse(text);
    } catch (e) {
        throw new Error(`Invalid JSON response: ${text}`);
    }
};

export const deleteGame = async (id: number): Promise<void> => {
    await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
};

// Années et genres
export const getAllReleaseYears = async (): Promise<number[]> => {
    const response = await fetch(`${BASE_URL}/years`);
    return response.json();
};

export const getAllGenres = async (): Promise<string[]> => {
    const response = await fetch(`${BASE_URL}/genres`);
    return response.json();
};

// Studios
export const getAllStudios = async () => {
    const response = await fetch(STUDIO_URL);
    return response.json();
};

export const createStudio = async (studio: { name: string }) => {
    const response = await fetch(STUDIO_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studio)
    });
    return response.json();
};

// Platformes
export const getAllPlatforms = async () => {
    const response = await fetch(PLATFORM_URL);
    return response.json();
};

export const createPlatform = async (platform: { name: string }) => {
    const response = await fetch(PLATFORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(platform)
    });
    return response.json();
};