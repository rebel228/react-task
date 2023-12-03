import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UndcontrolledForm from './components/UncontrolledForm/UncontrolledForm.tsx';
import { Provider } from 'react-redux';
import { setupStore } from './store/store.ts';

const DEFAULT_PATH = '/';

const store = setupStore();

const router = createBrowserRouter([
  {
    path: DEFAULT_PATH,
    element: <App />,
    children: [
      {
        path: `/formone`,
        element: <UndcontrolledForm />,
      },
      {
        path: `/formtwo`,
        element: <div />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
