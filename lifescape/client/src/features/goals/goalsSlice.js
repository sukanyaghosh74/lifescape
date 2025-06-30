import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  goals: [],
  status: 'idle',
  error: null,
};

export const fetchGoals = createAsyncThunk('goals/fetchGoals', async (_, thunkAPI) => {
  const token = localStorage.getItem('token');
  const response = await axios.get('/api/goals', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

export const addGoal = createAsyncThunk('goals/addGoal', async (goal, thunkAPI) => {
  const token = localStorage.getItem('token');
  const response = await axios.post('/api/goals', goal, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

export const updateGoal = createAsyncThunk('goals/updateGoal', async ({ id, updates }, thunkAPI) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`/api/goals/${id}`, updates, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

export const deleteGoal = createAsyncThunk('goals/deleteGoal', async (id, thunkAPI) => {
  const token = localStorage.getItem('token');
  await axios.delete(`/api/goals/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return id;
});

const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.goals = action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(fetchGoals.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addGoal.fulfilled, (state, action) => {
        state.goals.push(action.payload);
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(addGoal.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateGoal.fulfilled, (state, action) => {
        const idx = state.goals.findIndex(g => g._id === action.payload._id);
        if (idx !== -1) state.goals[idx] = action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(updateGoal.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.goals = state.goals.filter(g => g._id !== action.payload);
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default goalsSlice.reducer; 