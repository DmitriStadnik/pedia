import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CategoryDTO } from '../../dto/category';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    getById: builder.query<CategoryDTO, string>({
      query: (id) => `category/${id}`,
    }),
    getList: builder.query<CategoryDTO[], void>({
      query: () => `category`,
    }),
  }),
});

export const { useGetByIdQuery, useGetListQuery } = categoryApi;
