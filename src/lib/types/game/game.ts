export type Game = {
    id: number;
    name: string;
    genre: string;
    studioName: string;
    releaseYear: number;
    platforms: string[];
}

export type GameCreated = {
    name: string;
    genre: string;
    releaseYear: number;
    studioName: string;
    platforms: string[];
}

export type GameUpdated = {
    name: string;
    genre: string;
    releaseYear: number;
}

export type GameFilterParams = {
    name?: string;
    genre?: string;
    releaseYear?: number;
    studioName?: string;
    platforms?: string[];
    sort?: string;
    page?: number;
    size?: number;
}

export type SortState = {
    field: string;
    direction: 'asc' | 'desc';
}