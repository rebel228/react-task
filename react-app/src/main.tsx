import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import PokemonDatails from "./components/PokemonSearch/PokemonDetails/PokemonDetails";
import { DEFAULT_PATH } from "./constants";
import { Provider } from "react-redux";
import { setupStore } from "./store/store";

const store = setupStore();

const router = createBrowserRouter([
  {
    path: DEFAULT_PATH,
    element: <App />,
    children: [
      {
        path: `${DEFAULT_PATH}/details/:id`,
        element: <PokemonDatails />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
