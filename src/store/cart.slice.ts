import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// нам нужно хранить в корзине id товара и количество
export interface CartItem {
  id: number;
  count: number;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<number>) => {
      // нам нужно только число
      // если такой товар есть, то увеличим его quantity на 1
      const existed = state.items.find((i) => i.id === action.payload); // existed может быть, а может не быть
      if (!existed) {
        // если товара нет в корзине, то добавим в стейт
        state.items.push({ id: action.payload, count: 1 });
        return;
      }
      // если товар есть в корзине - увеличим его count на 1
      state.items.map((i) => {
        if (i.id === action.payload) {
          i.count += 1;
        }
        return i; // остальные товары просто вернем
      });
    },
  },
});

export default cartSlice.reducer;

export const { add } = cartSlice.actions;
