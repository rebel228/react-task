import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { customRender, noPokemons, threePokemons } from "./PokemonDataMocks";

describe("Testing card list results", () => {
  it("Verify that the component renders three cards", () => {
    const component = customRender(threePokemons);
    const { container } = component;
    expect(container.getElementsByClassName("pokemon").length).toBe(3);
  });
  it("Verify that the 'Nothing found' message is present", () => {
    customRender(noPokemons);
    expect(screen.queryByText("Nothing found")).toBeTruthy();
  });
});
