import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Article, ArticleCreateDTO, ArticleUpdateDTO } from '../../dto/article';
import { RootState } from '../store';

export const articleApi = createApi({
  reducerPath: 'articleApi',
  tagTypes: ['Articles'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const {
        auth: { token },
      } = getState() as RootState;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getById: builder.query<Article, string>({
      query: (id) => `article/${id}`,
    }),
    getList: builder.query<Article[], void>({
      query: () => `article`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: 'Articles' as const,
                id: _id,
              })),
              { type: 'Articles', id: 'LIST' },
            ]
          : [{ type: 'Articles', id: 'LIST' }],
    }),
    update: builder.mutation<
      void,
      Pick<ArticleUpdateDTO, '_id'> & Partial<ArticleUpdateDTO>
    >({
      query: ({ _id, ...body }) => {
        return {
          url: `article/${_id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: (result, error, { _id }) => [
        { type: 'Articles', id: _id },
      ],
    }),
    create: builder.mutation<void, Partial<ArticleCreateDTO>>({
      query: (body) => ({
        url: `article`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetByIdQuery,
  useGetListQuery,
  useUpdateMutation,
  useCreateMutation,
} = articleApi;
