import axios, { AxiosResponse } from "axios";
import { PokemonClient } from "pokenode-ts";

interface Pokemon {
    name: string,
    img: HTMLImageElement
}

const api = new PokemonClient();

async function resolveChainPromises(pokemons: any): Promise<Pokemon[]> {
  const promises: Promise<AxiosResponse<any, any>>[] = [];
  for (let pokemon of pokemons) {
    promises.push(axios.get(pokemon.url));
  }
  const response = await Promise.all(promises);
  const pokemons_1: Pokemon[] = [];
  for (let pokemon_1 of response) {
    const img = new Image();
    img.src = pokemon_1.data.sprites.back_default;
    pokemons_1.push({
      name: pokemon_1.data.name,
      img: img,
    });
  }
  return pokemons_1;
}

async function fetchPokemons(limit: number): Promise<Pokemon[]> {
    const res = await api.listPokemons(0, limit);
    const pokemons = res.results;
    return resolveChainPromises(pokemons);
}

export { fetchPokemons };
export type { Pokemon };