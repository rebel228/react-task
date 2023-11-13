import { describe, expect, it } from "vitest";
import getPokemonDataByName from "../components/Api/getPokemonByName";

describe("Testing Api", () => {
  it("calling with a pokemin name", async () => {
    const response = await getPokemonDataByName("");
    expect(response.data.length).toBe(20);
  });
});
