import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchResults from "../components/PokemonSearch/SearchResults/SearchResults";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { PokemonSearchContext } from "../components/PokemonSearch/Context/Context";
import { threePokemons } from "./PokemonDataMocks";
import { PokemonDataResponse } from "../types";
import { DEFAULT_PATH } from "../constants";
import PokemonDatails, {
  pokemonDetailsLoader,
} from "../components/PokemonSearch/PokemonDetails/PokemonDetails";

const mockLoader = vi.fn(pokemonDetailsLoader);

const router = createMemoryRouter([
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

const customRender = (pokemons: PokemonDataResponse) => {
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

describe("Testing card behaviour", () => {
  it("Ensure that the card renders the relevant pokemon name", async () => {
    customRender(threePokemons);
    expect(screen.getByText("Bulbasaur")).toBeTruthy();
    expect(screen.getByText("Ivysaur")).toBeTruthy();
    expect(screen.getByText("Charmander")).toBeTruthy();
  });
  it("Check is clicking on the card opened details", async () => {
    customRender(threePokemons);
    const card = screen.getByText("Bulbasaur");
    fireEvent(card, new MouseEvent("click", { bubbles: true }));
    expect(
      (await screen.findAllByText("Abilities").then((data) => data)).length,
    ).toBe(1);
  });
  it("Expected an API call to be made", async () => {
    expect(mockLoader).toHaveBeenCalled();
  });
});
