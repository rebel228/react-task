import { PokemonDataResponse } from "../types";
import { vi } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchResults from "../components/PokemonSearch/SearchResults/SearchResults";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { PokemonSearchContext } from "../components/PokemonSearch/Context/Context";
import { DEFAULT_PATH } from "../constants";
import PokemonDatails, {
  pokemonDetailsLoader,
} from "../components/PokemonSearch/PokemonDetails/PokemonDetails";

export const mockLoader = vi.fn(pokemonDetailsLoader);

export const routerMockSearchRes = createMemoryRouter([
  {
    path: DEFAULT_PATH,
    element: <SearchResults />,
    children: [
      {
        path: `${DEFAULT_PATH}/details/:id`,
        element: <PokemonDatails />,
        loader: mockLoader,
      },
    ],
  },
]);

export const customRender = (
  pokemons: PokemonDataResponse,
  router = routerMockSearchRes,
) => {
  return render(
    <PokemonSearchContext.Provider
      value={{
        pokemons: pokemons,
        setPokemons: () => {},
        searchValue: "",
        setSearchValue: () => {},
      }}
    >
      <RouterProvider router={router} />
    </PokemonSearchContext.Provider>,
  );
};

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
