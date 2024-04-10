
  import './TaskStyles.css'
  import './Table.css'
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import TaskList from './Tasks/TaskList';
import TaskForm from './Tasks/TaskForm';

const App = () => {
  return (
    <Provider store={store}>
        <TaskForm />
        <TaskList />
    </Provider>
  );
};

export default App;
