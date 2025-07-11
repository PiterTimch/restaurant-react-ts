// import {apiCart} from "../services/apiCart.ts";
// import type {ICart, ICartItem, ICreateUpdateCartItem, IRemoveCartItem} from "../services/types.ts";
// import {createUpdateCartLocal, removeCartItemLocal} from "../store/cartSlice.ts";
// import type {AppDispatch, RootState} from "../store";
//
// export const createUpdateCart = (item: ICartItem) => async (dispatch: AppDispatch, getState: () => RootState) => {
//     const state = getState();
//     const user = state.auth.user;
//
//     const itemForServer: ICreateUpdateCartItem = { productId: item.productId!, quantity: item.quantity! };
//
//     if (user) {
//         return await dispatch(apiCart.endpoints.createUpdateCart.initiate(itemForServer, { track: true })).unwrap();
//     } else {
//         dispatch(createUpdateCartLocal(item));
//         return item;
//     }
// };
//
// export const removeCartItem = (item: IRemoveCartItem) => async (dispatch: AppDispatch, getState: () => RootState) => {
//     const state = getState();
//     const user = state.auth.user;
//
//     if (user) {
//         return await dispatch(apiCart.endpoints.removeCartItem.initiate(item, { track: true })).unwrap();
//     } else {
//         dispatch(removeCartItemLocal(item));
//         return item;
//     }
// };
//
//
// export const getCart = () => async (dispatch: AppDispatch, getState: () => RootState) => {
//     const state = getState();
//     const user = state.auth.user;
//
//     if (user) {
//         if (localStorage.getItem("cart")) {
//             await dispatch(localCartToUser());
//         }
//
//         return await dispatch(apiCart.endpoints.getCartItems.initiate(undefined, { subscribe: true })).unwrap()
//     }
//     else{
//         const items = state.cart.localCart.items;
//
//         if (items) {
//             const totalPrice = items.reduce(
//                 (sum, item) => sum + item.quantity! * item.price!,
//                 0
//             );
//
//             const res : ICart = {
//                 items, totalPrice
//             }
//
//             return res;
//         }
//         return {
//             items: [],
//             totalPrice: 0,
//         };
//     }
// }
//
// export const localCartToUser = () => async (dispatch: AppDispatch, getState: () => RootState) => {
//     const state = getState();
//     const localCart = state.cart.localCart;
//
//     for (const item of localCart.items) {
//         await dispatch(createUpdateCart(item));
//     }
//
//     localStorage.removeItem('cart');
// }