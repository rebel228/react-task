import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { NamedAPIResourceList, Pokemon, PokemonSpecies } from 'pokenode-ts';

interface ListPokemonsQueryParams {
  limit: string;
  offset: string;
}

export const pokemonAPI = createApi({
  reducerPath: 'pokemonAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2' }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    listPokemons: build.query<NamedAPIResourceList, ListPokemonsQueryParams>({
      query: ({ limit, offset }) => ({
        url: '/pokemon',
        params: {
          limit,
          offset,
        },
      }),
    }),
    getPokemonByName: build.query<Pokemon, string>({
      query: (name) => ({
        url: `/pokemon/${name}`,
      }),
    }),
    getSpeciesByName: build.query<PokemonSpecies, string>({
      query: (name) => ({ url: `/pokemon-species/${name}` }),
    }),
  }),
});
