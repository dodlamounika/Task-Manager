import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    toggleStatus: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.status = task.status === 'pending' ? 'completed' : 'pending';
      }
    },
    editTask: (state, action) => {
      const { id, key, value } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) 
        task[key]= value;
    },
  },
});

export const { setEditingId, addTask, deleteTask, toggleStatus, editTask } = taskSlice.actions;

export default taskSlice.reducer;
