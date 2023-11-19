import { describe, expect, it } from "vitest";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { customRender, routerMock } from "../__mocks__/PokemonDataMocks";

describe("Testing URL changes", () => {
  it("check if changing the page updates the URL", async () => {
    customRender();
    await waitFor(() => {
      const next = screen.getByRole("button", { name: ">" });
      fireEvent.click(next);
      const queryParams = new URLSearchParams(routerMock.state.location.search);
      expect(queryParams.get("page")).toBe("2");
    });
  });
  it("updating amount to 10 should update URL", async () => {
    customRender();
    await waitFor(async () => {
      const queryParams = new URLSearchParams(routerMock.state.location.search);
      const set10 = screen.getByRole("button", { name: "10" });
      fireEvent.click(set10);
      expect(queryParams.get("limit")).toBe("10");
    });
  });
  it("updating amount to 50 should update URL", async () => {
    customRender();
    await waitFor(async () => {
      const queryParams = new URLSearchParams(routerMock.state.location.search);
      const set50 = screen.getByRole("button", { name: "50" });
      fireEvent.click(set50);
      expect(queryParams.get("limit")).toBe("50");
    });
  });
  it("updating amount to 20 should update URL", async () => {
    customRender();
    await waitFor(async () => {
      const queryParams = new URLSearchParams(routerMock.state.location.search);
      const set20 = screen.getByRole("button", { name: "20" });
      fireEvent.click(set20);
      expect(queryParams.get("limit")).toBe("20");
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
