import { configureStore } from '@reduxjs/toolkit';
import userSlice, { JWT_PERSISTENT_STATE } from './user.slice';
import { saveState } from './storage';
import cartSlice from './cart.slice';

export const store = configureStore({
  // сконфигурирем store
  // подключаем все доступные редюсеры
  reducer: {
    user: userSlice,
    cart: cartSlice,
  },
});

store.subscribe(() => {
  // получим состояние jwt и его сохраним
  // console.log(store.getState().user.jwt);
  // console.log(store.getState().user.jwt); // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTcyODQyMTMyMn0.ykCOjbvfvX6EXmX6fLtT7CLGFA9_Of3z_1SHQQEAa8w
  saveState({ jwt: store.getState().user.jwt }, JWT_PERSISTENT_STATE); // JWT_PERSISTENT_STATE -> userData
});

export type RootState = ReturnType<typeof store.getState>; // нам нужно то, что оно возвращает - используем утилитарный тип - ReturnType - возвращает состояние

// тип того, что мы можем диспетчить
export type AppDispath = typeof store.dispatch; // в AppDispath будут лежать все наши диспетчи, которые мы в дальнейшем объявим в редюсерах
