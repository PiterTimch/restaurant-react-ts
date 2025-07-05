import {configureStore} from "@reduxjs/toolkit";
import {apiCategory} from "../services/apiCategory.ts";
import {apiAccount} from "../services/apiAccount.ts";
import  authReducer from "../store/authSlice.ts";
import {type TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {apiProduct} from "../services/apiProduct.ts";
import {apiUser} from "../services/apiUser.ts";
import userSearchReducer from '../store/userSearchSlice.ts';

export const store = configureStore({
    reducer: {
        [apiCategory.reducerPath]: apiCategory.reducer,
        [apiAccount.reducerPath]: apiAccount.reducer,
        [apiProduct.reducerPath]: apiProduct.reducer,
        [apiUser.reducerPath]: apiUser.reducer,
        auth: authReducer,
        userSearch: userSearchReducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(apiCategory.middleware)
            .concat(apiAccount.middleware)
            .concat(apiProduct.middleware)
            .concat(apiUser.middleware)

})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector