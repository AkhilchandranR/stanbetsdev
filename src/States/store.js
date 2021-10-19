import { configureStore } from '@reduxjs/toolkit'
import chatReducer from '../States/slices/chatSlice';

export default configureStore({
  reducer: {
      chat: chatReducer,
  },
})