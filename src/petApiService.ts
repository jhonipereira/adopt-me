import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const petApi = createApi({
    reducerPath: "petApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://pets-v2.dev-apis.com"}),
    endpoints: (builder:any) => ({
        getPet: builder.query({
            query: (id:any) => ({ url: "pets", params: {id} }),
            transformResponse: (response:any) => response.pets[0],
        }),
        getBreeds: builder.query({
            query: (animal:any) => ({ url: "breeds", params: {animal} }),
            transformResponse: (response:any) => response.breeds,
        }),
        search: builder.query({
            query: ({ animal, location, breed }) => ({
                url: "pets",
                params: { animal, location, breed },
            }),
            transformResponse: (response:any) => response.pets,
        }),
    })
});

export const { useGetPetQuery, useGetBreedsQuery, useSearchQuery } = petApi;