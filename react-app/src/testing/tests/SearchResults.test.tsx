import { describe, expect, it } from "vitest";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { customRender } from "../__mocks__/PokemonDataMocks";

describe("Testing card list results", () => {
  it("Verify that the component renders three cards", async () => {
    const component = customRender();
    const { container } = component;
    await waitFor(() => {
      expect(container.getElementsByClassName("pokemon").length).toBe(3);
    });
  });
  it("Verify that the 'Nothing found' message is present", async () => {
    customRender();
    const input = screen.getByRole("textbox") as HTMLInputElement;
    const search = screen.getByRole("button", { name: "Search" });
    input.value = "wrongsearch";
    fireEvent.click(search);
    await waitFor(() => {
      expect(screen.queryByText("Nothing found")).toBeTruthy();
    });
  });
});
