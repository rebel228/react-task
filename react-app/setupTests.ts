import { cleanup } from "@testing-library/react";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll } from "vitest";
import { http, HttpResponse } from "msw";

const server = setupServer(
  http.get("https://pokeapi.co/api/v2/pokemon/1", () => {
    return HttpResponse.json({
      name: "Bulbasaur",
      species: { name: "bulbasaur" },
      sprites: { front_default: "" },
      height: "12",
      weight: "12",
      stats: [
        { base_stat: "66", stat: { name: "hp" } },
        { base_stat: "25", stat: { name: "attack" } },
        { base_stat: "35", stat: { name: "defence" } },
      ],
      abilities: [{ ability: { name: "test" } }],
    });
  }),
);
beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());
