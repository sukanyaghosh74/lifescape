import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import goalsReducer from '../features/goals/goalsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    goals: goalsReducer,
  },
});
