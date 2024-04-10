import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../Slices/taskSlice';
import { v4 as uuidv4 } from 'uuid';
const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const handleSubmit = e => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
    dispatch(addTask({ title, description, status: 'pending',id:uuidv4(),createdDate:new Date().toLocaleString('en-GB') }));
    setTitle('');
    setDescription('');
    setErrors({});
    }
  };
  const validateForm = () => {
    const errors = {};
    if (!title.trim()) {
      errors.title = 'title is required';
    }
    if (!description.trim()) {
      errors.description = 'description is required';
    } 
    return errors;
  };
  return (
    <form className='form-container' onSubmit={handleSubmit}>
      <h1>Add Tasks Form</h1>
      <input
      className='form-field'
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      {errors?.title && <span className='error-field'>{errors?.title}</span>}
      <textarea
        className='form-field'
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      ></textarea>
      {errors?.description && <span className='error-field'>{errors?.description}</span>}
      <div><button type="submit" className='form-field-button'>Add Task</button></div>
    </form>
  );
};

export default TaskForm;
