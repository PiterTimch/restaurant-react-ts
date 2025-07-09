import {apiCart} from "../services/apiCart.ts";
import type {ICreateUpdateCartItem} from "../services/types.ts";
import {createUpdateCartLocal} from "../store/cartSlice.ts";
import type {AppDispatch, RootState} from "../store";

export const createUpdateCart = (item: ICreateUpdateCartItem) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const user = state.auth.user;

    if (user) {
        dispatch(apiCart.endpoints.createUpdateCart.initiate(item));
    } else {
        dispatch(createUpdateCartLocal(item));
    }
};