import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ArticleDTO } from '../../dto/article';

export const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    getById: builder.query<ArticleDTO, string>({
      query: (id) => `article/${id}`,
    }),
    getList: builder.query<ArticleDTO[], void>({
      query: () => `article`,
    }),
  }),
});

export const { useGetByIdQuery, useGetListQuery } = articleApi;
