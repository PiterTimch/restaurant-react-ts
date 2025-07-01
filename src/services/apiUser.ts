import {createApi} from "@reduxjs/toolkit/query/react";
import {createBaseQuery} from "../utilities/createBaseQuery.ts";
import type {
    IAdminUserItem
} from "./types.ts";

export const apiUser = createApi({
    reducerPath: 'api/user',
    baseQuery: createBaseQuery('Users'),
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        getAllUsers: builder.query<IAdminUserItem[], void>({
            query: () => 'list',
            providesTags: ['Users'],
        })
    }),
});


export const {
    useGetAllUsersQuery
} = apiUser;