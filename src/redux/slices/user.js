import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  token: JSON.parse(localStorage.getItem('token') ?? null),
  userInfo: JSON.parse(localStorage.getItem('userInfo') ?? null),
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = true;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    setToken: (state, { payload }) => {
      state.token = payload;
    },
    userLogin: (state, { payload }) => {
      state.userInfo = payload;
      state.error = null;
      state.loading = false;
    },
    userLogout: (state) => {
      state.userInfo = null;
      state.loading = false;
      state.error = null;
    },
    userRegister: (state, { payload }) => {
      state.userInfo = payload;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setError,
  setToken,
  userLogin,
  userLogout,
  userRegister,
} = userSlice.actions;
export default userSlice.reducer;
export const userSelector = (state) => state.user;
