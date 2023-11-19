import { describe, expect, it, vi } from "vitest";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { customRender } from "../__mocks__/PokemonDataMocks";
import { pokemonAPI } from "../../services/PokemonService";

describe("Testing pokemon cards", () => {
  it("Ensure that the card renders the relevant pokemon name", async () => {
    const component = customRender();
    const { container } = component;
    await waitFor(() => {
      expect(container.getElementsByClassName("pokemon").length).toBe(3);
    });
    await waitFor(() => {
      expect(screen.getByText("Bulbasaur")).toBeTruthy();
      expect(screen.getByText("Ivysaur")).toBeTruthy();
      expect(screen.getByText("Venusaur")).toBeTruthy();
    });
  });
  it("Expected an API call to be made", async () => {
    const mockApiCAll = vi.spyOn(pokemonAPI, "useGetPokemonByNameQuery");
    customRender();
    const card = screen.getByText("Bulbasaur");
    fireEvent.click(card);
    await waitFor(() => {
      expect(mockApiCAll).toHaveBeenCalledTimes(7);
    });
  });
  it("Check if clicking on the card opened details", async () => {
    customRender();
    await waitFor(async () => {
      expect(screen.queryByText("Abilities")).toBeTruthy();
    });
  });
});
