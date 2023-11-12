import { beforeAll, describe, expect, it } from "vitest";
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
import { setupServer } from "msw/node";

const server = setupServer();

const router = createMemoryRouter([
  {
    path: DEFAULT_PATH,
    element: <SearchResults />,
    children: [
      {
        path: `${DEFAULT_PATH}/details/:id`,
        element: <PokemonDatails />,
        loader: pokemonDetailsLoader,
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
  beforeAll(() => server.listen());
  it("Ensure that the card renders the relevant pokemon name", async () => {
    customRender(threePokemons);
    expect(screen.getByText("Bulbasaur")).toBeTruthy();
    expect(screen.getByText("Ivysaur")).toBeTruthy();
    expect(screen.getByText("Charmander")).toBeTruthy();
  });
  it("", async () => {
    customRender(threePokemons);
    const card = screen.getByText("Bulbasaur");
    fireEvent(card, new MouseEvent("click", { bubbles: true }));
    expect((await screen.findAllByText("66").then((data) => data)).length).toBe(
      1,
    );
  });
});
