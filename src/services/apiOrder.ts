import {createApi} from "@reduxjs/toolkit/query/react";
import {createBaseQuery} from "../utilities/createBaseQuery.ts";
import type {
    ICity,
    IDeliveryInfoCreate,
    IOrder,
    IOrderCreateRequest,
    IOrderCreateResponse,
    IPaymentType,
    IPostDepartment
} from "./types.ts";
export const apiOrder = createApi({
    reducerPath: 'api/order',
    baseQuery: createBaseQuery('Order'),
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        getAllOrders: builder.query<IOrder[], void>({
            query: () => 'list',
            providesTags: ['Orders'],
        }),
        getAllCities: builder.query<ICity[], void>({
            query: () => 'cities',
        }),
        getAllPostDepartments: builder.query<IPostDepartment[], void>({
            query: () => 'post-departments',
        }),
        getAllPaymentTypes: builder.query<IPaymentType[], void>({
            query: () => 'payment-types',
        }),
        getById: builder.query<IOrder, number>({
            query: (id) => `get/${id}`,
        }),
        createOrder: builder.mutation<IOrderCreateResponse, IOrderCreateRequest>({
            query: (obj) => ({
                url: 'create',
                method: 'POST',
                body: obj,
            }),
            invalidatesTags: ['Orders'],
        }),
        addDeliveryToOrder: builder.mutation<void, IDeliveryInfoCreate>({
            query: (obj) => ({
                url: 'add-delivery-info',
                method: 'POST',
                body: obj,
            }),
            invalidatesTags: ['Orders'],
        })
    }),
});


export const {
    useGetAllOrdersQuery,
    useGetByIdQuery,
    useCreateOrderMutation,
    useGetAllCitiesQuery,
    useGetAllPaymentTypesQuery,
    useGetAllPostDepartmentsQuery,
    useAddDeliveryToOrderMutation
} = apiOrder;