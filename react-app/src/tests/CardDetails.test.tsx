import { describe, expect, it } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { customRender, threePokemons } from "./PokemonDataMocks";

describe("Testing pokemon cards / pokemon details behaviour", () => {
  it("Check if correct detais are displayed", async () => {
    customRender(threePokemons);
    const card = screen.getByText("Bulbasaur");
    fireEvent(card, new MouseEvent("click", { bubbles: true }));
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
