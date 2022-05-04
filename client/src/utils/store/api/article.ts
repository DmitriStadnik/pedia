import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    getById: builder.query<any, string>({
      query: (id) => `article/${id}`,
    }),
    getList: builder.query<any, void>({
      query: () => `article`,
    }),
  }),
});

export const { useGetByIdQuery, useGetListQuery } = articleApi;
