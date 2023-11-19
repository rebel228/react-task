import { describe, expect, it } from "vitest";
import { pokemonAPI } from "../../services/PokemonService";
import { setupStore } from "../../store/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { renderHook, waitFor } from "@testing-library/react";

const store = setupStore();
function Wrapper(props: { children: ReactNode }) {
  return <Provider store={store}>{props.children}</Provider>;
}

describe("Testing Api", () => {
  it("expect to get 3 pokemons from the list", async () => {
    const { result } = renderHook(
      () => {
        return pokemonAPI.useListPokemonsQuery({
          limit: "10",
          offset: "0",
        });
      },
      { wrapper: Wrapper },
    );
    await waitFor(() => {
      expect(result.current.data?.results.length).toBe(3);
    });
  });
  it("expect to get bulbasaur as first pokemon", async () => {
    const { result } = renderHook(
      () => {
        return pokemonAPI.useGetPokemonByNameQuery("1");
      },
      { wrapper: Wrapper },
    );
    await waitFor(() => {
      expect(result.current.data?.name).toBe("bulbasaur");
    });
  });
  it("expect to get correct description from species", async () => {
    const { result } = renderHook(
      () => {
        return pokemonAPI.useGetSpeciesByNameQuery("2");
      },
      { wrapper: Wrapper },
    );
    await waitFor(() => {
      expect(result.current.data?.flavor_text_entries[0].flavor_text).toBe(
        "Test description two",
      );
    });
  });
});
