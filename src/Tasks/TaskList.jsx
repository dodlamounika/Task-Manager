import React, { useEffect, useState } from 'react';
import { useSelector , useDispatch} from 'react-redux';
import { deleteTask, editTask,toggleStatus } from '../Slices/taskSlice';
import { selectSortedTasks, selectSortedByDateTasks } from '../Selectors';
const TaskList = () => {
  const tasks = useSelector(state => state.tasks.tasks);
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState(null);
  const [tasksData, setTasksData] = useState(tasks);
  const sortedListData= useSelector(selectSortedTasks); 
  const sortedListByDateData= useSelector(selectSortedByDateTasks);

    useEffect(() => {
    // Load tasks from local storage when component mounts
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasksData(JSON.parse(savedTasks));
    }
  }, []);
  useEffect(()=>{
    setTasksData(tasks);
     // Save tasks to local storage when tasks state changes
     localStorage.setItem('tasks', JSON.stringify(tasks));
  },[tasks]);

  const handleEdit = (id) => {
    setEditingId(id);
  };
  const handleSave = (e,id,key) => {
   setEditingId(null);
  };
  const handleDelete = (id) =>{
    dispatch(deleteTask(id));
  }
  const handleInputChange = (e, id, key) => {
    dispatch(editTask({ id, key, value: e.target.value }));
  };
  const handleToggle = (id) => {
    dispatch(toggleStatus(id));
  };
  const handleSort=()=>{ 
    setTasksData(sortedListData);
  }
  const handleSortByDate = () => {
    setTasksData(sortedListByDateData);
  }
  return (
    <>
    <h1 className='task-header'>List of Tasks</h1>
    {!tasksData?.length ? <span className='task-header'>No tasks to display</span>:
    <table>
      <thead>
        <tr>         
          <th>Title</th>
          <th>Description</th>
          <th>Status<button onClick={handleSort}>Sort</button></th>
          <th>Created Date<button onClick={handleSortByDate}>Sort</button></th>
          <th/>
        </tr>
      </thead>
      <tbody>
        
        {tasksData?.map(item => (
          <tr key={item.id} className={item.status==="pending"?"form-status-color-pending":"form-status-color-completed"}>
            <td>
              {editingId === item.id ? (
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleInputChange(e, item.id, 'title')}
                />
              ) : (
                item.title
              )}
            </td>
            <td>
              {editingId === item.id ? (
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => handleInputChange(e, item.id, 'description')}
                />
              ) : (
                item.description
              )}
            </td>
            <td>
              {editingId === item.id ? (
                <>
                <span>{item.status}</span>
                <button onClick={()=>handleToggle(item.id)}>Toggle</button>
                </>
              ) : (
                item.status
              )}
            </td>
            <td>             
                <span>{item.createdDate}</span>                
            </td>
            <td>
              {editingId === item.id ? (
                <button onClick={() => handleSave(item.id)}>Save</button>
              ) : (
                <>
                <button onClick={() => handleEdit(item.id)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
                </>
              )}
            </td>           
          </tr>
        ))}
      </tbody>
    </table>
}
    </>
  );
};
export default TaskList;