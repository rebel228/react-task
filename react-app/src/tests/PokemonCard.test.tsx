import { describe, expect, it } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { customRender, mockLoader, threePokemons } from "./PokemonDataMocks";

describe("Testing pokemon cards", () => {
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
});
