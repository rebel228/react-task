import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SearchResults, {
  pokemonsLoader,
} from "./components/PokemonSearch/SearchResults/SearchResults";
import App from "./App";

export const DEFAULT_PATH = "/react-task/react-routing";

const router = createBrowserRouter([
  {
    path: DEFAULT_PATH,
    element: <App />,
    loader: pokemonsLoader,
    children: [
      {
        path: `${DEFAULT_PATH}/pokemons/`,
        element: <SearchResults />,
        loader: pokemonsLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
