import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Article, ArticleUpdateDTO } from '../../dto/article';

export const articleApi = createApi({
  reducerPath: 'articleApi',
  tagTypes: ['Articles'],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
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
      query: ({ _id, ...patch }) => ({
        url: `article/${_id}`,
        method: 'PUT',
        body: patch,
      }),
      async onQueryStarted({ _id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          articleApi.util.updateQueryData('getList', undefined, (draft) => {
            Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { _id }) => [
        { type: 'Articles', id: _id },
      ],
    }),
  }),
});

export const {
  useGetByIdQuery,
  useGetListQuery,
  useUpdateMutation,
} = articleApi;
