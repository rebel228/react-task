import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UndcontrolledForm from './components/UncontrolledForm/UncontrolledForm.tsx';

const DEFAULT_PATH = '/';

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
    <RouterProvider router={router} />
  </React.StrictMode>
);
