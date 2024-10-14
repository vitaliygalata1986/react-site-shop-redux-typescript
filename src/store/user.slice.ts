import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadState } from './storage';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../api/api';
import { LoginResponse } from '../interfaces/auth.interface';
import { Profile } from '../interfaces/user.interface';
import { RootOptions } from 'react-dom/client';
import { RootState } from '@reduxjs/toolkit/query';

export const JWT_PERSISTENT_STATE = 'userData';

export interface UserPersistentState {
  jwt: string | null;
}

export interface UserState {
  jwt: string | null;
  loginErrorMessage?: string; // изначально ошибка будет undefined
  registerErrorMessage?: string; // изначально ошибка будет undefined
  profile?: Profile;
}

// console.log(loadState(JWT_PERSISTENT_STATE)); // {jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6I…IzNX0.9m0P_jp_1fsaqSHUrY5qQhP9qH7Zvm3d_lMJFsNuKoo'}
// console.log(loadState(JWT_PERSISTENT_STATE).jwt); // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTcyODQyMjMwN30.MCmk3UuqeFpiZoZHQcO_s_68dfZiVYcZ8tpMtleXdQc

const initialState: UserState = {
  jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null, // если ключа нет, то будет null
};
// console.log(initialState.jwt);

export const login = createAsyncThunk(
  'user/login',
  async (params: { email: string; password: string }) => {
    try {
      const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
        email: params.email,
        password: params.password,
      });
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw e.response?.data.message;
      }
    }
  }
);

export const register = createAsyncThunk(
  'user/register',
  async (params: { email: string; password: string; name: string }) => {
    try {
      const { data } = await axios.post<LoginResponse>(
        `${PREFIX}/auth/register`,
        {
          email: params.email,
          password: params.password,
          name: params.name,
        }
      );
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw e.response?.data.message;
      }
    }
  }
);

export const getProfile = createAsyncThunk<Profile, void, { state: RootState }>(
  'user/getProfile',
  async (_, thunkApi) => {
    // thunkApi - это Api внтури thunk, позволяющий получить доступ к общему состоянию Redux - дя этого мы типизируем createAsyncThunk, он возвращает профайл createAsyncThunk<Profile> void - аргументы не нужны
    // и передаем состояние - { state: RootState }
    // первый аргумент - без парметров (_,)
    // получим jwt
    const jwt = thunkApi.getState().user.jwt;
    const { data } = await axios.get<Profile>(`${PREFIX}/user/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: (state) => {
      state.jwt = null;
    },
    clearLoginError: (state) => {
      state.loginErrorMessage = undefined;
    },
    clearRegisterError: (state) => {
      state.registerErrorMessage = undefined;
    },
  },
  extraReducers: (builder) => {
    // builder позволяет добавить кейсы для каждой из асинхронной операции
    builder.addCase(login.fulfilled, (state, action) => {
      // action можно не типизировать, так как он приймет сразу правильный вид
      if (!action.payload) {
        // если нет payload
        return;
      }
      state.jwt = action.payload.access_token;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loginErrorMessage = action.error.message;
    });

    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      // action можно не типизировать, так как он приймет сразу правильный вид
      if (!action.payload) {
        // если нет payload
        return;
      }
      state.jwt = action.payload.access_token;
    });

    builder.addCase(register.rejected, (state, action) => {
      state.registerErrorMessage = action.error.message;
    });
  },
});

export default userSlice.reducer;

export const { logOut, clearLoginError, clearRegisterError } =
  userSlice.actions;
