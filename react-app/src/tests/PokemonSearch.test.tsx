import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchResults from "../components/PokemonSearch/SearchResults/SearchResults";
import { MemoryRouter } from "react-router-dom";
import { PokemonSearchContext } from "../components/PokemonSearch/Context/Context";
import { noPokemons, threePokemons } from "./PokemonDataMocks";
import { PokemonDataResponse } from "../types";

const customRender = (pokemons: PokemonDataResponse) => {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <PokemonSearchContext.Provider
        value={{
          pokemons: pokemons,
          setPokemons: () => {},
          searchValue: "",
          setSearchValue: () => {},
        }}
      >
        <SearchResults />
      </PokemonSearchContext.Provider>
    </MemoryRouter>,
  );
};

describe("Testing card list results", () => {
  it("Verify that the component renders three cards", () => {
    const component = customRender(threePokemons);
    const { container } = component;
    expect(container.getElementsByClassName("pokemon").length).toBe(3);
  });
  it("Verify that the component renders three cards", () => {
    customRender(noPokemons);
    expect(screen.queryByText("Nothing found")).toBeTruthy();
  });
});
