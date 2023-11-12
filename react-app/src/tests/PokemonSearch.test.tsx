import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchResults from "../components/PokemonSearch/SearchResults/SearchResults";
import { MemoryRouter } from "react-router-dom";
import { PokemonSearchContext } from "../components/PokemonSearch/Context/Context";
import { threePokemons } from "./PokemonDataMocks";

describe("Testing card list results", () => {
  it("Verify that the component renders three cards", () => {
    const component = render(
      <MemoryRouter initialEntries={["/"]}>
        <PokemonSearchContext.Provider
          value={{
            pokemons: threePokemons,
            setPokemons: () => {},
            searchValue: "",
            setSearchValue: () => {},
          }}
        >
          <SearchResults />
        </PokemonSearchContext.Provider>
      </MemoryRouter>,
    );
    const { container } = component;
    expect(container.getElementsByClassName("pokemon").length).toBe(3);
  });
});
