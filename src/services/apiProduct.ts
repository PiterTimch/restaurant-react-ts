import {createApi} from "@reduxjs/toolkit/query/react";
import type {IProductItem} from "./types.ts";
import {createBaseQuery} from "../utilities/createBaseQuery.ts";


export const apiProduct = createApi({
    reducerPath: 'api/products',
    baseQuery: createBaseQuery('Products'),
    tagTypes: ['Product', 'Products'],
    endpoints: (builder) => ({
        getAllProducts: builder.query<IProductItem[], void>({
            query: () => 'list',
            providesTags: ['Products'],
        }),
        getProductBySlug: builder.query<IProductItem, string>({
            query: (slug) => `${slug}`,
            providesTags: ['Product'],
        }),
        getProductById: builder.query<IProductItem, number>({
            query: (slug) => `${slug}`,
            providesTags: ['Product'],
        }),
        // createProduct: builder.mutation<ICategoryItem, ICategoryCreate>({
        //     query: (newCategory) => {
        //         try {
        //             const formData = serialize(newCategory);
        //             return {
        //                 url: 'create',
        //                 method: 'POST',
        //                 body: formData,
        //             };
        //         } catch {
        //             throw new Error('Error create category');
        //         }
        //     },
        //     invalidatesTags: ['Products'],
        // })
    }),
});


export const {
    useGetAllProductsQuery,
    useGetProductByIdQuery,
    useGetProductBySlugQuery
} = apiProduct;