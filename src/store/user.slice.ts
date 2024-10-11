import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadState } from './storage';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../api/api';
import { LoginResponse } from '../interfaces/auth.interface';

export const JWT_PERSISTENT_STATE = 'userData';

export interface UserPersistentState {
  jwt: string | null;
}

export interface UserState {
  jwt: string | null;
  loginErrorMessage?: string; // изначально ошибка будет undefined
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
  },
});

export default userSlice.reducer;

export const { logOut, clearLoginError } = userSlice.actions;
