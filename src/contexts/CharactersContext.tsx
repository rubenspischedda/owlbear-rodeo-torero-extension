import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import { Character } from '../models/character';

interface CharactersState {
    characters: Record<string, Character>;
    setCharacters: React.Dispatch<React.SetStateAction<Record<string, Character>>>;
    deleteCharacter: (id: string) => void;
}

const defaultCharactersState: CharactersState = {
    characters: {},
    setCharacters: () => { },
    deleteCharacter: (id: string) => { console.log('deleteCharacter not implemented', id); return () => { } },
}

export type PlayersStats = Record<string, Stats>;

export type Stats = {
    abilities: StatsWithValue;
    skills: StatsWithValue;
}
export type StatsWithValue = Record<string, { proficiency?: boolean, value: number }>;

export const CharactersContext = createContext(defaultCharactersState);

export const CharactersProvider: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
    const [characters, setCharacters] = useState<Record<string, Character>>({})

    const deleteCharacter = (id: string) => {
        setCharacters((characters) => {
            const newCharacters = { ...characters };
            delete newCharacters[id];
            localStorage.setItem('characters', JSON.stringify(newCharacters));
            return newCharacters;
        });

    };

    useEffect(() => {
        const storedCharacters = localStorage.getItem('characters');
        if (storedCharacters !== null) {
            setCharacters(JSON.parse(storedCharacters));
        }
    }, []);

    useEffect(() => {
        if (JSON.stringify(characters) === localStorage.getItem('characters') || Object.values(characters).length === 0) return;
        localStorage.setItem('characters', JSON.stringify(characters));
    }, [characters]);

    setInterval(() => {
        const storedCharacters = localStorage.getItem('characters');
        if (storedCharacters !== null && JSON.stringify(characters) !== storedCharacters) {
            setCharacters(JSON.parse(storedCharacters));
        }
    }, 5000)

    return (<CharactersContext.Provider value={{ characters, setCharacters, deleteCharacter }}>{children}</CharactersContext.Provider>)
};
