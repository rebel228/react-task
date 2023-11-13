import { describe, expect, it } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PokemonsSearch from "../components/PokemonSearch/pokemonsSearch";
import { customRender, threePokemons } from "./PokemonDataMocks";
import { createMemoryRouter } from "react-router-dom";
import { DEFAULT_PATH } from "../constants";
import PokemonDatails, {
  pokemonDetailsLoader,
} from "../components/PokemonSearch/PokemonDetails/PokemonDetails";
import SearchResults from "../components/PokemonSearch/SearchResults/SearchResults";
import { PokemonDataResponse } from "../types";

const pokemonsLoaderMock = (): { fetchedPokemons: PokemonDataResponse } => {
  const fetchedPokemons = threePokemons;
  return { fetchedPokemons };
};

const PokemonSearchRouter = createMemoryRouter([
  {
    path: DEFAULT_PATH,
    element: <PokemonsSearch />,
    loader: pokemonsLoaderMock,
    children: [
      {
        path: `${DEFAULT_PATH}/`,
        element: <SearchResults />,
        children: [
          {
            path: `${DEFAULT_PATH}/details/:id`,
            element: <PokemonDatails />,
            loader: pokemonDetailsLoader,
          },
        ],
      },
    ],
  },
]);

describe("Testing local storage", () => {
  it("clicking the Search button saves the value to the local storage", () => {
    customRender(threePokemons, PokemonSearchRouter);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    const search = screen.getByRole("button", { name: "Search" });
    input.value = "Test Value";
    fireEvent.click(search);
    expect(localStorage.getItem("search")).toEqual("Test Value");
    input.value = "New Value";
    fireEvent.click(search);
    expect(localStorage.getItem("search")).toEqual("New Value");
  });
});
