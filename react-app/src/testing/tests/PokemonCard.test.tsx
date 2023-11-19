import { describe, expect, it } from "vitest";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { customRender } from "../__mocks__/PokemonDataMocks";

describe("Testing pokemon cards", () => {
  it("Ensure that the card renders the relevant pokemon name", async () => {
    // customRender();
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
  it("Check if clicking on the card opened details", async () => {
    customRender();
    const card = screen.getByText("Bulbasaur");
    fireEvent.click(card);
    await waitFor(async () => {
      expect(screen.queryByText("Abilities")).toBeTruthy();
    });
  });
  // it("Expected an API call to be made", async () => {
  //   expect(mockLoader).toHaveBeenCalled();
  // });
});
