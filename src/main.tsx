import { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './layout/Menu/Layout';
import { Error as ErrorPage } from './pages/Error/Error';
import { Product } from './pages/Product/Product';
import './index.css';
import axios from 'axios';
import { PREFIX } from './api/api';

const Menu = lazy(() => import('./pages/Menu/Menu')); // теперь в Menu хранится lazy компонент Menu - он будет загружаться не сразу

const router = createBrowserRouter([
  // массив объектов, который описывает наши роуты
  {
    path: '/',
    element: <Layout />,
    children: [
      // здесь будут дочерние роуты
      {
        path: '/',
        element: (
          <Suspense fallback={<>Загрузка...</>}>
            <Menu />
          </Suspense>
        ),
      },
      {
        path: '/product/:id',
        element: <Product />,
        errorElement: <>Ошибка</>,
        loader: async ({ params }) => {
          // loader - функция, которая говорит - как нам загрузить данные, перед тем как отобразить продукт. params - чтобы получить id
          // иммитация зажержки, а только потом будем запрашивать данные
          // throw new Error('error');
          await new Promise<void>((resolve) => {
            setTimeout(() => {
              resolve();
            }, 2000);
          });

          const { data } = await axios.get(`${PREFIX}/products/${params.id}`);
          return data;
        },
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
