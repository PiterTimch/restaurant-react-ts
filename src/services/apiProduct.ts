import {createApi} from "@reduxjs/toolkit/query/react";
import type {
    IIngredient, IIngredientCreate,
    IProductCreate,
    IProductItem,
    IProductSearchParams,
    IProductSize,
    ISearchResult
} from "./types.ts";
import {createBaseQuery} from "../utilities/createBaseQuery.ts";
import {serialize} from "object-to-formdata";

const createQueryString = (params: Record<string, any>) => {
    const searchParams = new URLSearchParams();

    for (const key in params) {
        const value = params[key];
        if (Array.isArray(value)) {
            value.forEach(v => searchParams.append(key, String(v)));
        } else if (value !== undefined && value !== null) {
            searchParams.append(key, String(value));
        }
    }
    return searchParams.toString();
};


export const apiProduct = createApi({
    reducerPath: 'api/products',
    baseQuery: createBaseQuery('Products'),
    tagTypes: ['Product', 'Products', 'Ingredients'],
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
            query: () => 'ingredients',
            providesTags: ['Ingredients']
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
        }),
        createIngredient: builder.mutation<void, IIngredientCreate>({
            query: (newIngredient) => {
                try {
                    const formData = serialize(newIngredient);
                    return {
                        url: 'ingredients',
                        method: 'POST',
                        body: formData,
                    };
                } catch {
                    throw new Error('Error Create ingredient');
                }
            },
            invalidatesTags: ['Ingredients']
        }),
        searchProduct: builder.query<ISearchResult<IProductItem>, IProductSearchParams>({
            query: (params) => {
                const queryString = createQueryString(params);
                return {
                    url: `search?${queryString}`,
                    method: 'GET',
                };
            },
            providesTags: ['Products']
        }),
    }),
});


export const {
    useGetAllProductsQuery,
    useGetProductByIdQuery,
    useGetAllIngredientsQuery,
    useGetAllSizesQuery,
    useGetProductBySlugQuery,
    useCreateProductMutation,
    useSearchProductQuery,
    useCreateIngredientMutation
} = apiProduct;