import type {ICartItem, ICreateUpdateCartItem} from "../services/types.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "./index.ts";

interface CartState {
    localCart: ICartItem[];
}

const initialState: CartState = {
    localCart: JSON.parse(localStorage.getItem('cart') || '[]')
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        createUpdateCartLocal: (state, action: PayloadAction<ICreateUpdateCartItem>) => {
            const newItem = action.payload;

            const index = state.localCart.findIndex(cartItem => cartItem.productId === newItem.productId);

            if (index >= 0) {
                state.localCart[index].quantity += newItem.quantity;

                if (state.localCart[index].quantity <= 0) {
                    state.localCart.splice(index, 1);
                }
            } else {
                state.localCart.push({
                    id: 0,
                    productId: newItem.productId,
                    quantity: newItem.quantity,
                    categoryId: 0,
                    name: 'Unknown',
                    categoryName: 'Unknown',
                    sizeName: '',
                    price: 0,
                    imageName: '',
                });
            }

            localStorage.setItem('cart', JSON.stringify(state.localCart));
        },

        clearLocalCart: (state) => {
            state.localCart = [];
            localStorage.removeItem('cart');
        },
    },
});

export const {
    createUpdateCartLocal,
    clearLocalCart,
} = cartSlice.actions;

export const selectLocalCart = (state: RootState) => state.cart.localCart;

export default cartSlice.reducer;