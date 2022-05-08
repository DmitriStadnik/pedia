import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  Category,
  CategoryCreateDTO,
  CategoryUpdateDTO,
} from '../../dto/category';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  tagTypes: ['Categories'],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    getById: builder.query<Category, string>({
      query: (id) => `category/${id}`,
    }),
    getList: builder.query<Category[], void>({
      query: () => `category`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: 'Categories' as const,
                id: _id,
              })),
              { type: 'Categories', id: 'LIST' },
            ]
          : [{ type: 'Categories', id: 'LIST' }],
    }),
    update: builder.mutation<
      void,
      Pick<CategoryUpdateDTO, '_id'> & Partial<CategoryUpdateDTO>
    >({
      query: ({ _id, ...body }) => ({
        url: `category/${_id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { _id }) => [
        { type: 'Categories', id: _id },
      ],
    }),
    create: builder.mutation<void, Partial<CategoryCreateDTO>>({
      query: (body) => ({
        url: `category`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Categories', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetByIdQuery,
  useGetListQuery,
  useUpdateMutation,
  useCreateMutation,
} = categoryApi;
