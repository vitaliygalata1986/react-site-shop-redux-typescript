import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadState, saveState } from './storage';

export const JWT_PERSISTENT_STATE = 'userData';

export interface UserPersistentState {
  jwt: string | null;
}

export interface UserState {
  jwt: string | null;
}

// console.log(loadState(JWT_PERSISTENT_STATE)); // {jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6I…IzNX0.9m0P_jp_1fsaqSHUrY5qQhP9qH7Zvm3d_lMJFsNuKoo'}
// console.log(loadState(JWT_PERSISTENT_STATE).jwt); // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTcyODQyMjMwN30.MCmk3UuqeFpiZoZHQcO_s_68dfZiVYcZ8tpMtleXdQc

const initialState: UserState = {
  jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null, // если ключа нет, то будет null
};
// console.log(initialState.jwt);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // наборы функций, которые должны менять состояние
    addJwt: (state, action: PayloadAction<string>) => {
      // типизируем action
      // state - предыдущее состояние
      state.jwt = action.payload;
    },
    logout: (state) => {
      state.jwt = null;
    },
  },
});

export default userSlice.reducer;

export const { addJwt, logout } = userSlice.actions;
