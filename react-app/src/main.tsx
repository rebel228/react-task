import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import PokemonsSearch, {
  pokemonsLoader,
} from "./components/PokemonSearch/pokemonsSearch";
import PokemonDatails, {
  pokemonDetailsLoader,
} from "./components/PokemonSearch/PokemonDetails/PokemonDetails";
import { DEFAULT_PATH } from "./constants";

const router = createBrowserRouter([
  {
    path: DEFAULT_PATH,
    element: <App />,
    children: [
      {
        path: `${DEFAULT_PATH}/`,
        element: <PokemonsSearch />,
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
