import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './layout/Menu/Layout';
import { Menu } from './pages/Menu/Menu';
import { Error } from './pages/Error/Error';
import { Product } from './pages/Product/Product';
import './index.css';
import axios from 'axios';
import { PREFIX } from './api/api';

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
        errorElement: <>Ошибка</>,
        loader: async ({ params }) => {
          // loader - функция, которая говорит - как нам загрузить данные, перед тем как отобразить продукт. params - чтобы получить id
          // иммитация зажержки, а только потом будем запрашивать данные

          await new Promise<void>((resolve) => {
            setTimeout(() => {
              resolve();
            }, 2000);
          });

          const { data } = await axios.get(`${PREFIX}/producsts/${params.id}`);
          return data;
        },
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
