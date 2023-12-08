import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SearchResults, {
  pokemonsLoader,
} from "./components/PokemonSearch/SearchResults/SearchResults";
import App from "./App";
import PokemonDatails, {
  pokemonDetailsLoader,
} from "./components/PokemonSearch/PokemonDetails/PokemonDetails";

export const DEFAULT_PATH = "/";

const router = createBrowserRouter([
  {
    path: DEFAULT_PATH,
    element: <App />,
    children: [
      {
        path: `${DEFAULT_PATH}/`,
        element: <SearchResults />,
        loader: pokemonsLoader,
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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
