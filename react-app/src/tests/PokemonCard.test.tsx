import { describe, expect, it } from "vitest";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  customRender,
  mockLoader,
  noPokemons,
  routerMockSearchRes,
  threePokemons,
} from "./PokemonDataMocks";

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
    const location = routerMockSearchRes.state.location;
    const queryParams = new URLSearchParams(location.search);
    const prev = screen.getByRole("button", { name: "<" });
    fireEvent.click(prev);
    const newQueryParams = new URLSearchParams(location.search);
    waitFor(() => {
      expect(newQueryParams.get("offset")).toBeTruthy();
      expect(
        queryParams.get("offset") !== newQueryParams.get("offset"),
      ).toBeTruthy();
    });
  });
  it("check if 404 page is displayed", async () => {
    customRender(threePokemons);
    routerMockSearchRes.state.location.pathname = "/badroute";
    waitFor(() => {
      expect(screen.queryByText("404 Not Found")).toBeTruthy();
    });
  });
});
