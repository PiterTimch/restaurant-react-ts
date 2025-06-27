import {createApi} from "@reduxjs/toolkit/query/react";
import {createBaseQuery} from "../utilities/createBaseQuery.ts";
import type {ILogin, IRegister} from "./types.ts";
//import {jwtDecode} from "jwt-decode";
import {serialize} from "object-to-formdata";

export const apiAccount = createApi({
    reducerPath: 'api/account',
    baseQuery: createBaseQuery('Account'),
    endpoints: (builder) => ({
        login: builder.mutation<{token: string}, ILogin>({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials
            })
        }),
        loginByGoogle:builder.mutation<{token: string}, string>({
            query: (token) => ({
                url: 'google-login',
                method: 'POST',
                body: {token}
            })
        }),
        register: builder.mutation<{token: string}, IRegister>({
            query: (credentials) => {
                const formData = serialize(credentials);

                return{
                    url: 'register',
                    method: 'POST',
                    body: formData};
            }
        })
    })
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLoginByGoogleMutation
} = apiAccount;