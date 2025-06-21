import {createApi} from "@reduxjs/toolkit/query/react";
import type {ICategoryCreate, ICategoryDelete, ICategoryEdit, ICategoryItem} from "./types.ts";
import {createBaseQuery} from "../utilities/createBaseQuery.ts";
import {serialize} from "object-to-formdata";


export const apiCategory = createApi({
    reducerPath: 'api',
    baseQuery: createBaseQuery('Categories'),
    tagTypes: ['Category'],
    endpoints: (builder) => ({
        getAllCategories: builder.query<ICategoryItem[], void>({
            query: () => 'list',
            providesTags: ['Category'],
        }),
        getCategoryBySlug: builder.query<ICategoryItem, string>({
            query: (slug) => `${slug}`
        }),
        createCategory: builder.mutation<ICategoryItem, ICategoryCreate>({
            query: (newCategory) => {
                try {
                    const formData = serialize(newCategory);
                    return {
                        url: 'create',
                        method: 'POST',
                        body: formData,
                    };
                } catch {
                    throw new Error('Error create category');
                }
            },
            invalidatesTags: ['Category'],
        }),
        editCategory: builder.mutation<ICategoryItem, ICategoryEdit>({
            query: (newCategory) => {
                try {
                    const formData = serialize(newCategory);
                    return {
                        url: 'update',
                        method: 'PUT',
                        body: formData,
                    };
                } catch {
                    throw new Error('Error edit category');
                }
            },
            invalidatesTags: ['Category'],
        }),
        deleteCategory: builder.mutation<void, ICategoryDelete>({
            query: (deleteCategory) => {
                try {
                    return {
                        url: 'delete',
                        method: 'DELETE',
                        body: deleteCategory
                    };
                } catch {
                    throw new Error('Error delete category');
                }
            },
            invalidatesTags: ['Category'],
        }),
    }),
});


export const {useGetAllCategoriesQuery, useCreateCategoryMutation, useDeleteCategoryMutation, useEditCategoryMutation, useGetCategoryBySlugQuery} = apiCategory;