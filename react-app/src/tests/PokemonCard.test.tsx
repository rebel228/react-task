import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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

describe("Testing pokemon cards / pokemon details behaviour", () => {
  it("Ensure that the card renders the relevant pokemon name", async () => {
    customRender(threePokemons);
    expect(screen.getByText("Bulbasaur")).toBeTruthy();
    expect(screen.getByText("Ivysaur")).toBeTruthy();
    expect(screen.getByText("Charmander")).toBeTruthy();
  });
  it("Check if clicking on the card opened details", async () => {
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
  it("Check if correct detais are displayed", async () => {
    customRender(threePokemons);
    expect(
      (await screen.findAllByText("12 Hg").then((data) => data)).length,
    ).toBe(1);
    expect(
      (await screen.findAllByText("12 dm").then((data) => data)).length,
    ).toBe(1);
  });
  it("Check if clicking on the cross closes the details", async () => {
    const component = customRender(threePokemons);
    const { container } = component;
    const close = container.getElementsByClassName("close-btn")[0];
    fireEvent(close, new MouseEvent("click", { bubbles: true }));
    expect(screen.queryByText("Abilities")).toBe(null);
  });
});

describe("Testing URL and routing", () => {
  it("check if changing the page updates the URL", async () => {
    customRender(threePokemons);
    const location = router.state.location;
    const queryParams = new URLSearchParams(location.search);
    const prev = screen.getByRole("button", { name: "<" });
    fireEvent.click(prev);
    const newQueryParams = new URLSearchParams(location.search);
    waitFor(() => {
      console.log(location);
      expect(newQueryParams.get("offset")).toBeTruthy();
      expect(
        queryParams.get("offset") !== newQueryParams.get("offset"),
      ).toBeTruthy();
    });
  });
  it("check if 404 page is displayed", async () => {
    customRender(threePokemons);
    router.state.location.pathname = "/badroute";
    waitFor(() => {
      expect(screen.queryByText("404 Not Found")).toBeTruthy();
    });
  });
});
