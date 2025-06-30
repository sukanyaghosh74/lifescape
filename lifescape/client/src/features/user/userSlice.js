import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  status: 'idle',
  error: null,
};

export const login = createAsyncThunk('user/login', async (credentials, thunkAPI) => {
  const response = await axios.post('/api/auth/login', credentials);
  localStorage.setItem('token', response.data.token);
  return response.data;
});

export const register = createAsyncThunk('user/register', async (data, thunkAPI) => {
  const response = await axios.post('/api/auth/register', data);
  return response.data;
});

export const fetchProfile = createAsyncThunk('user/fetchProfile', async (_, thunkAPI) => {
  const token = localStorage.getItem('token');
  const response = await axios.get('/api/users/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer; 