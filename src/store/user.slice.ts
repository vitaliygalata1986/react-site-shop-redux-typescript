import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  jwt: string | null;
}

const initialState: UserState = {
  jwt: null,
};

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
