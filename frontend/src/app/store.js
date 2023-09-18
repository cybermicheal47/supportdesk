import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/Authslice'
  


export const store = configureStore({
  reducer: {
  auth : authReducer,
  },
});
