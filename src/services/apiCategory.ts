import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {ICategoryItem} from "./types.ts";
import {API_BASE_URL} from "../constants/api.ts";


export const apiCategory = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: `${API_BASE_URL}/api`}),
    endpoints: (builder) => ({
        getAllCategories: builder.query<ICategoryItem[], void>({
            query: () => 'Categories/list'
        })
    })
})

export const {useGetAllCategoriesQuery} = apiCategory;