import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { DEFAULT_PATH } from "../../constants";
import PokemonDatails from "../../components/PokemonSearch/PokemonDetails/PokemonDetails";
import { Provider } from "react-redux";
import { setupStore } from "../../store/store";
import App from "../../App";

const store = setupStore();

export const routerMock = createBrowserRouter([
  {
    path: DEFAULT_PATH,
    element: <App />,
    errorElement: <h3>404 Not Found</h3>,
    children: [
      {
        path: `${DEFAULT_PATH}/details/:id`,
        element: <PokemonDatails />,
      },
    ],
  },
]);

export const customRender = (router = routerMock) => {
  return render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
  );
};
