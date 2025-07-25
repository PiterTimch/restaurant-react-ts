import {createApi} from "@reduxjs/toolkit/query/react";
import type {IIngredient, IProductCreate, IProductItem, IProductSize} from "./types.ts";
import {createBaseQuery} from "../utilities/createBaseQuery.ts";
import {serialize} from "object-to-formdata";


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
            query: (id) => `${id}`,
            providesTags: ['Product'],
        }),
        getAllSizes: builder.query<IProductSize[], void>({
            query: () => 'sizes'
        }),
        getAllIngredients: builder.query<IIngredient[], void>({
            query: () => 'ingredients'
        }),
        createProduct: builder.mutation<IProductItem, IProductCreate>({
            query: (newCategory) => {
                try {
                    const formData = serialize(newCategory);
                    return {
                        url: 'create',
                        method: 'POST',
                        body: formData,
                    };
                } catch {
                    throw new Error('Error Create category');
                }
            },
            invalidatesTags: ['Products'],
        })
    }),
});


export const {
    useGetAllProductsQuery,
    useGetProductByIdQuery,
    useGetAllIngredientsQuery,
    useGetAllSizesQuery,
    useGetProductBySlugQuery,
    useCreateProductMutation
} = apiProduct;