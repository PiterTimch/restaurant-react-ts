import {createApi} from "@reduxjs/toolkit/query/react";
import type {ICart, ICreateUpdateCartItem, IRemoveCartItem} from "./types.ts";
import {createBaseQuery} from "../utilities/createBaseQuery.ts";
// import {createUpdateCart} from "../store/cartSlice.ts";


export const apiCart = createApi({
    reducerPath: 'api/Cart',
    baseQuery: createBaseQuery('Cart'),
    tagTypes: ['Cart'],
    endpoints: (builder) => ({
        getCartItems: builder.query<ICart, void>({
            query: () => 'getCart',
            // async onQueryStarted(_, {dispatch, queryFulfilled }) {
            //     try {
            //         const result = await queryFulfilled;
            //         console.log("Get user items", result.data)
            //         if(result.data && result.data.items) {
            //             dispatch(createUpdateCart(result.data.items));
            //         }
            //     } catch (error) {
            //         console.log("getCart fail", error);
            //     }
            // },
            providesTags: ['Cart'],
        }),

        createUpdateCart: builder.mutation<void, ICreateUpdateCartItem>({
            query: (item) => {
                try {
                    return {
                        url: 'createUpdate',
                        method: 'POST',
                        body: item,
                    };
                } catch {
                    throw new Error('Error add item to cart');
                }
            },
            invalidatesTags: ['Cart']
        }),
        removeCartItem: builder.mutation<void, IRemoveCartItem>({
            query: (item) => {
                try {
                    return {
                        url: `removeCartItem/${item.id}`,
                        method: 'PUT'
                    };
                } catch {
                    throw new Error('Error remove item from cart');
                }
            },
            invalidatesTags: ['Cart']
        }),
    })
});


export const {
    useGetCartItemsQuery,
    useCreateUpdateCartMutation,
    useRemoveCartItemMutation
} = apiCart;