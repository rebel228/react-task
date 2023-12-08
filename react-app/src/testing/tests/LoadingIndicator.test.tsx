import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom";
import { customRender, routerMock } from "../__mocks__/PokemonDataMocks";
import { waitFor } from "@testing-library/dom";

describe("Testing loading Indicator", () => {
  it("While data is fetching, loader is displayed", async () => {
    const component = customRender();
    const { container } = component;
    routerMock.state.location.pathname = "/details/4";
    await waitFor(() => {
      expect(container.getElementsByClassName("loader-wrapper").length).toBe(1);
    });
  });
});
