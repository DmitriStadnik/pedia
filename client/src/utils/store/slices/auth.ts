import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type AuthState = {
  token: string | null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null } as AuthState,
  reducers: {
    setToken: (
      state,
      { payload: { token } }: PayloadAction<{ token: string }>
    ) => {
      state.token = token;
    },
  },
});

export const { setToken } = authSlice.actions;

export default authSlice.reducer;

export const getToken = (state: RootState) => state.auth.token;
