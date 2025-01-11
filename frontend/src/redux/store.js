import { configureStore } from '@reduxjs/toolkit';
import userAuthReducer from './slices/userAuthSlice.js'

const store = configureStore({
  reducer: {
   userAuth: userAuthReducer,
  }
});

export default store;