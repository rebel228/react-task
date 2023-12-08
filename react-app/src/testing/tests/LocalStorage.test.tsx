import { describe, expect, it } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { customRender } from "../__mocks__/PokemonDataMocks";

describe("Testing local storage", () => {
  it("clicking the Search button saves the value to the local storage", () => {
    customRender();
    const input = screen.getByRole("textbox") as HTMLInputElement;
    const search = screen.getByRole("button", { name: "Search" });
    input.value = "Test Value";
    fireEvent.click(search);
    expect(localStorage.getItem("search")).toEqual("Test Value");
    input.value = "New Value";
    fireEvent.click(search);
    expect(localStorage.getItem("search")).toEqual("New Value");
  });
  it("component retrieves the value from the local storage upon mounting", () => {
    customRender();
    expect(localStorage.getItem("search")).toEqual("New Value");
  });
});
