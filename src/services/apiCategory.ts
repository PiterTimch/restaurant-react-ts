import {createApi} from "@reduxjs/toolkit/query/react";
import type {ICategoryCreate, ICategoryItem} from "./types.ts";
import {createBaseQuery} from "../utilities/createBaseQuery.ts";
import {serialize} from "object-to-formdata";


export const apiCategory = createApi({
    reducerPath: 'api',
    baseQuery: createBaseQuery('Categories'),
    endpoints: (builder) => ({
        getAllCategories: builder.query<ICategoryItem[], void>({
            query: () => 'list'
        }),
        createCategory: builder.mutation<ICategoryItem, ICategoryCreate>({
            query: (newCategory) =>{
                try {
                    const formData = serialize(newCategory);
                    return{
                        url: 'create',
                        method: 'POST',
                        body: formData
                    }
                }
                catch {
                    throw new Error('Error create category');
                }
            }
        })
    })
});

export const {useGetAllCategoriesQuery, useCreateCategoryMutation} = apiCategory;