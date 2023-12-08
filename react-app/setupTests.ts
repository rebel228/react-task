import { cleanup } from "@testing-library/react";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll } from "vitest";
import { delay, http, HttpResponse } from "msw";

const pokemonData = (name: string) => {
  return {
    name: name,
    species: { name: name },
    sprites: { front_default: "" },
    height: "12",
    weight: "12",
    stats: [
      { base_stat: "66", stat: { name: "hp" } },
      { base_stat: "25", stat: { name: "attack" } },
      { base_stat: "35", stat: { name: "defence" } },
    ],
    abilities: [{ ability: { name: "test" } }],
  };
};

const server = setupServer(
  http.get("https://pokeapi.co/api/v2/pokemon/1", () => {
    return HttpResponse.json(pokemonData("bulbasaur"));
  }),
  http.get("https://pokeapi.co/api/v2/pokemon/2", async () => {
    await delay();
    return HttpResponse.json(pokemonData("ivysaur"));
  }),
);
beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());
