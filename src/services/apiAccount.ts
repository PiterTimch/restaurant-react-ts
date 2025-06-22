import {createApi} from "@reduxjs/toolkit/query/react";
import {createBaseQuery} from "../utilities/createBaseQuery.ts";
import type {ILogin, IUserInfo} from "./types.ts";
import {jwtDecode} from "jwt-decode";

export const apiAccount = createApi({
    reducerPath: 'api/account',
    baseQuery: createBaseQuery('Account'),
    tagTypes: ['CurrentUser'],
    endpoints: (builder) => ({
        login: builder.mutation<void, ILogin>({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials
            }),
            transformResponse: (response: { token: string }) => {
                localStorage.setItem("token", response.token);
            },
            invalidatesTags: ['CurrentUser'],
        }),
        logout: builder.mutation<void, void>({
            queryFn: () => {
                localStorage.removeItem("token");
                return { data: undefined };
            },
            invalidatesTags: ['CurrentUser'],
        }),
        getCurrentUser: builder.query<IUserInfo | null, void>({
            queryFn: () => {
                const token = localStorage.getItem("token");
                if (!token) return { data: null };

                try {
                    const user = jwtDecode<IUserInfo>(token);
                    return { data: user };
                } catch {
                    return { data: null };
                }
            },
            providesTags: ['CurrentUser'],
        })
    })
});

export const {
    useLoginMutation,
    useGetCurrentUserQuery,
    useLogoutMutation
} = apiAccount;