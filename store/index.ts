import { PayloadAction, configureStore, createSlice, nanoid } from '@reduxjs/toolkit';
import { shallowEqual, useSelector } from 'react-redux';
import type { CartItem, Cart, Product } from '@/api/types';

const initialCartState: Cart = {};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addProductToCart: (state, { payload }: PayloadAction<Product>) => {
      const cartItemId = nanoid();

      state[cartItemId] = {
        name: payload.name,
        id: cartItemId,
        slug: payload.slug,
        image: payload.images[0],
        price: payload.price,
      };

      localStorage.setItem('kdal', JSON.stringify(Object.values(state)));
    },
    addItemToCart: (state, { payload }: PayloadAction<CartItem>) => {
      state[payload.id] = payload;
    },
    removeItemFromCart: (state, { payload }: PayloadAction<CartItem['id']>) => {
      delete state[payload];

      localStorage.setItem('kdal', JSON.stringify(Object.values(state)));
    },
  },
});

export const createStore = () =>
  configureStore({
    reducer: {
      cart: cartSlice.reducer,
    },
  });

export type StoreType = ReturnType<typeof createStore>;
export type RootState = ReturnType<StoreType['getState']>;
export type AppDispatch = StoreType['dispatch'];

export const { addProductToCart, addItemToCart, removeItemFromCart } = cartSlice.actions;

export const useCartItems = () =>
  useSelector((state: RootState) => Object.values(state.cart), shallowEqual);
export const useCartCount = () =>
  useSelector((state: RootState) => Object.values(state.cart).length);
export const useCartTotal = () =>
  useSelector((state: RootState) =>
    Object.values(state.cart).reduce(
      (acc, { price }: CartItem) => acc + price,
      0
    )
  );
