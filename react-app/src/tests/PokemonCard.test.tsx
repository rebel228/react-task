import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchResults from "../components/PokemonSearch/SearchResults/SearchResults";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { PokemonSearchContext } from "../components/PokemonSearch/Context/Context";
import { threePokemons } from "./PokemonDataMocks";
import { PokemonDataResponse } from "../types";
import { http, HttpResponse } from "msw";
import { pokemonDetailsLoader } from "../components/PokemonSearch/PokemonDetails/PokemonDetails";
import { DEFAULT_PATH } from "../constants";
import PokemonDatails from "../components/PokemonSearch/PokemonDetails/PokemonDetails";

http.get("/pokemon", () => {
  return HttpResponse.json({
    name: "Bulbasaur",
    sprites: { front_default: "" },
    height: "12",
    weight: "12",
    stats: { hp: "60", attack: "20", defense: "30" },
    abilities: { ability: { name: "test" } },
  });
});

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
    expect(
      (await screen.findAllByText("Abilities").then((data) => data)).length,
    ).toBe(1);
  });
});
