import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './Slices/taskSlice';

export default configureStore({
  reducer: {
    tasks: taskReducer,
  },
});
