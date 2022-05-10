import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Config, ConfigUpdateDTO } from '../../dto/config';
import { RootState } from '../store';

export const configApi = createApi({
  reducerPath: 'configApi',
  tagTypes: ['Config'],
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
    get: builder.query<Config, void>({
      query: () => `admin/config`,
      providesTags: [{ type: 'Config' }],
    }),
    update: builder.mutation<void, Partial<ConfigUpdateDTO>>({
      query: (body) => {
        return {
          url: `admin/config`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: [{ type: 'Config' }],
    }),
  }),
});

export const { useGetQuery, useUpdateMutation } = configApi;
