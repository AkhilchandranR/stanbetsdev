import { configureStore } from '@reduxjs/toolkit'
import chatReducer from '../States/slices/chatSlice';
import userReducer from './slices/userSlice';

export default configureStore({
  reducer: {
      chat: chatReducer,
      user: userReducer,
  },
})