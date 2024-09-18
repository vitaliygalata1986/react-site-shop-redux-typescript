import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './layout/Menu/Layout';
import { Menu } from './pages/Menu/Menu';
import { Error } from './pages/Error/Error';
import { Product } from './pages/Product/Product';
import './index.css';

const router = createBrowserRouter([
  // массив объектов, который описывает наши роуты
  {
    path: '/',
    element: <Layout />,
    children: [
      // здесь будут дочерние роуты
      {
        path: '/',
        element: <Menu />,
      },
      {
        path: '/product/:id',
        element: <Product />,
      },
      {
        path: '*',
        element: <Error />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
