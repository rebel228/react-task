import { cleanup } from "@testing-library/react";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll } from "vitest";
import { http, HttpResponse, delay } from "msw";
import { NamedAPIResourceList } from "pokenode-ts";

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

const pokemonSpecies = (id: string) => {
  return {
    flavor_text_entries: [
      {
        flavor_text: `Test description ${id}`,
        language: {
          name: "en",
          url: "",
        },
      },
    ],
  };
};

const pokemonList: NamedAPIResourceList = {
  next: "test",
  previous: null,
  count: 322,
  results: [
    { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
    { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
    { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" },
  ],
};

const server = setupServer(
  http.get("https://pokeapi.co/api/v2/pokemon", async () => {
    console.log("list");
    return HttpResponse.json(pokemonList);
  }),
  http.get("https://pokeapi.co/api/v2/pokemon/1", () => {
    console.log("1");
    return HttpResponse.json(pokemonData("bulbasaur"));
  }),
  http.get("https://pokeapi.co/api/v2/pokemon/2", async () => {
    console.log("2");
    return HttpResponse.json(pokemonData("ivysaur"));
  }),
  http.get("https://pokeapi.co/api/v2/pokemon/3", async () => {
    console.log("3");
    return HttpResponse.json(pokemonData("venusaur"));
  }),
  http.get("https://pokeapi.co/api/v2/pokemon/4", async () => {
    console.log("4 slow");
    await delay();
    return HttpResponse.json(pokemonData("Charmander"));
  }),
  http.get("https://pokeapi.co/api/v2/pokemon-species/1", async () => {
    console.log("s1");
    return HttpResponse.json(pokemonSpecies("one"));
  }),
  http.get("https://pokeapi.co/api/v2/pokemon-species/2", async () => {
    console.log("s2");
    return HttpResponse.json(pokemonSpecies("two"));
  }),
  http.get("https://pokeapi.co/api/v2/pokemon-species/3", async () => {
    console.log("s3");
    return HttpResponse.json(pokemonSpecies("three"));
  }),
);
beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());
