import {createApi} from "@reduxjs/toolkit/query/react";
import {createBaseQuery} from "../utilities/createBaseQuery.ts";
import type {ILogin, IRegister} from "./types.ts";
//import {jwtDecode} from "jwt-decode";
import {serialize} from "object-to-formdata";

export  interface  IForgotPasswordRequest {
    email: string;
}

export  interface IValidateTokenRequest {
    token: string;
    email: string;
}

export  interface IResetPasswordRequest {
    newPassword: string;
    token: string;
    email: string;
}

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
        loginByGoogle: builder.mutation<{token: string}, string>({
            query: (token) => ({
                url: 'google-login',
                method: 'POST',
                body: {token}
            })
        }),
        forgotPassword: builder.mutation<void, IForgotPasswordRequest>({
            query: (data) => ({
                url: 'forgot-password',
                method: 'POST',
                body: data
            })
        }),
        validateResetToken: builder.query<{isValid: boolean}, IValidateTokenRequest>({
            query: (data) => ({
                url: 'validate-reset-token',
                method: 'POST',
                body: data
            })
        }),
        resetPassword: builder.mutation<void, IResetPasswordRequest>({
            query: (data) => ({
                url: 'reset-password',
                method: 'POST',
                body: data
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
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useValidateResetTokenQuery,
    useRegisterMutation,
    useLoginByGoogleMutation
} = apiAccount;