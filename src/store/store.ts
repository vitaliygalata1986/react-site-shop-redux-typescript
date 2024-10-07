import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './user.slice';

export const store = configureStore({
  // сконфигурирем store
  // подключаем все доступные редюсеры
  reducer: {
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>; // нам нужно то, что оно возвращает - используем утилитарный тип - ReturnType - возвращает состояние

// тип того, что мы можем диспетчить
export type AppDispath = typeof store.dispatch; // в AppDispath будут лежать все наши диспетчи, которые мы в дальнейшем объявим в редюсерах
