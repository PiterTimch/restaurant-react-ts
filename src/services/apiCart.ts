import {createApi} from "@reduxjs/toolkit/query/react";
import type {ICart, ICreateUpdateCartItem, IRemoveCartItem} from "./types.ts";
import {createBaseQuery} from "../utilities/createBaseQuery.ts";


export const apiCart = createApi({
    reducerPath: 'api/Cart',
    baseQuery: createBaseQuery('Cart'),
    tagTypes: ['Cart'],
    endpoints: (builder) => ({
        getCartItems: builder.query<ICart, void>({
            query: () => 'getCart',
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