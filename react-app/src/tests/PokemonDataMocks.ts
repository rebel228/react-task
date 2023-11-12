import { PokemonDataResponse } from "../types";

export const threePokemons: PokemonDataResponse = {
  data: [
    {
      name: "bulbasaur",
      key: 1,
      imgUrl: "testurl",
      descr: "teststring",
    },
    {
      name: "ivysaur",
      key: 2,
      imgUrl: "testurl",
      descr: "teststring",
    },
    {
      name: "charmander",
      key: 4,
      imgUrl: "testurl",
      descr: "teststring",
    },
  ],
  next: "https://pokeapi.co/api/v2/pokemon?offset=50&limit=10",
  prev: "https://pokeapi.co/api/v2/pokemon?offset=30&limit=10",
};

export const noPokemons: PokemonDataResponse = {
  data: [undefined],
};
