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
      key: 3,
      imgUrl: "testurl",
      descr: "teststring",
    },
  ],
};

export const noPokemons: PokemonDataResponse = {
  data: [undefined],
};
