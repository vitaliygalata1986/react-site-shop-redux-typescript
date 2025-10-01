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
import Success from './pages/Succes/Success';

const Menu = lazy(() => import('./pages/Menu/Menu'));

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
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
            return defer({
              data: axios
                .get(`${PREFIX}/products/${params.id}`)
                .then((data) => data)
                .catch((error) => {
                  throw new Error(error);
                }),
            });
          },
        },
      ],
    },
    {
      element: (
        <RequireAuth>
          <Layout />
        </RequireAuth>
      ),
      children: [
        {
          path: '/cart',
          element: <Cart />,
        },
        {
          path: '/success',
          element: <Success />,
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
  ],
  {
    basename: '/react-site-shop-redux-typescript/',
  }
);

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

/*
  Публичный и защищённый блоки разделены: один и тот же Layout может переиспользоваться, но гард не мешает гостям смотреть каталог/товары.
  Если пользователь кликает «Корзина» — попадает на защищённый блок → RequireAuth переведёт на логин.
*/