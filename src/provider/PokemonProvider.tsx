import { QueryObserverSuccessResult, useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchPokemons } from "../api/PokemonAPI";
import { pokemonContext } from '../hooks/PokemonHook';

const isFetchedWithSuccess = <TData, TError = unknown>(
  query: UseQueryResult<TData, TError>
): query is QueryObserverSuccessResult<TData, TError> => {
  return !query.isError && !query.isLoading && query.data !== undefined;
};

function PokemonProvider(props: any) {
    const pokemonData = useQuery(['pokemon'], () => fetchPokemons(props.limit ? props.limit : 10));

    if (isFetchedWithSuccess(pokemonData)) {
        return (
            <pokemonContext.Provider value={pokemonData.data}>
                <div> {props.children} </div>
            </pokemonContext.Provider>
        );
    } else {
        return <div className="text-white text-center mt-10 text-2xl">loading...</div>;
    }
}

export default PokemonProvider;