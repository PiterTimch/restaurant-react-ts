// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState, useCallback } from "react";
// import type { AppDispatch, RootState } from "../store";
// import type { ICart, ICartItem, IRemoveCartItem } from "../services/types.ts";
// import { createUpdateCart, getCart, removeCartItem } from "../thunks/cartThunks.ts";
//
// export const useCartItems = () => {
//     const dispatch = useDispatch<AppDispatch>();
//     const user = useSelector((state: RootState) => state.auth.user);
//     const localCart = useSelector((state: RootState) => state.cart.localCart);
//
//     const [data, setData] = useState<ICart>({ items: [], totalPrice: 0 });
//     const [isLoading, setIsLoading] = useState(true);
//     const [isError, setIsError] = useState(false);
//
//     const refetch = useCallback(async () => {
//         try {
//             const res = await dispatch(getCart());
//
//             if (user) {
//                 setData(res as ICart);
//             } else {
//                 setData(res as ICart);
//             }
//
//             setIsError(false);
//         } catch {
//             setIsError(true);
//         }
//     }, [dispatch, user]);
//
//     useEffect(() => {
//         const fetch = async () => {
//             setIsLoading(true);
//             await refetch();
//             setIsLoading(false);
//         };
//
//         fetch();
//     }, [refetch, localCart]);
//
//     return { data, isLoading, isError, refetch };
// };
//
// export const useCartCreateUpdate = (
//     refetch?: () => Promise<void>
// ): [(item: ICartItem) => Promise<void>] => {
//     const dispatch = useDispatch<AppDispatch>();
//
//     const createUpdateItem = async (item: ICartItem) => {
//         await dispatch(createUpdateCart(item));
//         if (refetch) await refetch();
//     };
//
//     return [createUpdateItem];
// };
//
// export const useCartRemoveItem = (
//     refetch?: () => Promise<void>
// ): [(item: IRemoveCartItem) => Promise<void>] => {
//     const dispatch = useDispatch<AppDispatch>();
//
//     const removeItem = async (item: IRemoveCartItem) => {
//         await dispatch(removeCartItem(item));
//         if (refetch) await refetch();
//     };
//
//     return [removeItem];
// };
