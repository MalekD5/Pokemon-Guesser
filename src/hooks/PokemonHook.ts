import { createContext, useContext } from "react";
import { Pokemon } from "../api/PokemonAPI";

export const pokemonContext = createContext<Pokemon[] | undefined>(undefined);

export const usePokemon = (): Pokemon[] => {
    const data = useContext(pokemonContext);
    if (!data)
        throw new Error('Pokemon data is being read outside of PokemonProvider, please wrap your component with <PokemonProvider>');
    return data;
};

