import { describe, expect, it } from "vitest";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { customRender, routerMock } from "../__mocks__/PokemonDataMocks";

describe("Testing page change", () => {
  it("check if changing the page updates the URL", async () => {
    customRender();
    await waitFor(() => {
      const next = screen.getByRole("button", { name: ">" });
      fireEvent.click(next);
      const queryParams = new URLSearchParams(routerMock.state.location.search);
      expect(queryParams.get("page")).toBe("2");
    });
  });
});

describe("Testing 404 page", () => {
  it("check if 404 page is displayed", async () => {
    customRender();
    routerMock.state.location.pathname = "/badroute";
    waitFor(() => {
      expect(screen.queryByText("404 Not Found")).toBeTruthy();
    });
  });
});
