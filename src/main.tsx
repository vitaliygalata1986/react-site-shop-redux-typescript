import { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, defer, RouterProvider } from 'react-router-dom';
import { Layout } from './layout/Menu/Layout';
import { Error as ErrorPage } from './pages/Error/Error';
import { Product } from './pages/Product/Product';
import './index.css';
import axios from 'axios';
import { PREFIX } from './api/api';
import AuthLayout from './layout/Auth/AuthLayout';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import RequireAuth from './api/RequireAuth';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Cart } from './pages/Cart/Cart';

const Menu = lazy(() => import('./pages/Menu/Menu')); // теперь в Menu хранится lazy компонент Menu - он будет загружаться не сразу

const router = createBrowserRouter([
  // массив объектов, который описывает наши роуты
  {
    path: '/',
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
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
          // defer - позволяет обернуть набор данных, которые сами по себе получаются асинхронными
          return defer({
            // получим в data некоторый набор данных

            data: axios
              .get(`${PREFIX}/products/${params.id}`)
              .then((data) => data)
              .catch((error) => {
                throw new Error(error);
              }),
            /*
            data: new Promise((resolve, reject) => {
              setTimeout(() => {
                axios
                  .get(`${PREFIX}/productss/${params.id}`)
                  .then((data) => resolve(data))
                  .catch((e) => reject(e));
              }, 2000);
            }),
            */
          });

          /*
          await new Promise<void>((resolve) => {
            setTimeout(() => {
              resolve();
            }, 2000);
          });
          const { data } = await axios.get(`${PREFIX}/products/${params.id}`);
          return data;
          */
        },
      },
      {
        path: 'cart',
        element: <Cart />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
