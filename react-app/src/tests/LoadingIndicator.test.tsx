import { describe, expect, it } from "vitest";
import { fireEvent, screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { threePokemons } from "./PokemonDataMocks";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { DEFAULT_PATH } from "../constants";
import PokemonDatails, {
  pokemonDetailsLoader,
} from "../components/PokemonSearch/PokemonDetails/PokemonDetails";
import { PokemonDataResponse } from "../types";
import App from "../App";
import PokemonsSearch from "../components/PokemonSearch/pokemonsSearch";

const pokemonsLoaderMock = (): { fetchedPokemons: PokemonDataResponse } => {
  const fetchedPokemons = threePokemons;
  return { fetchedPokemons };
};

const pokemonAppRouter = createMemoryRouter([
  {
    path: DEFAULT_PATH,
    element: <App />,
    children: [
      {
        path: DEFAULT_PATH,
        element: <PokemonsSearch />,
        loader: pokemonsLoaderMock,
        children: [
          {
            path: `${DEFAULT_PATH}/details/:id`,
            element: <PokemonDatails />,
            loader: pokemonDetailsLoader,
          },
        ],
      },
    ],
  },
]);

describe("Testing loading Indicator", () => {
  it("While data is fetching, loader is displayed", async () => {
    const component = render(<RouterProvider router={pokemonAppRouter} />);
    const { container } = component;
    const card = await screen.findByText("Ivysaur");
    fireEvent.click(card);
    expect(container.getElementsByClassName("loader-wrapper").length).toBe(1);
  });
});
