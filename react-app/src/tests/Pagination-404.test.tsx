import { describe, expect, it } from "vitest";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  customRender,
  routerMockSearchRes,
  threePokemons,
} from "./PokemonDataMocks";

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
