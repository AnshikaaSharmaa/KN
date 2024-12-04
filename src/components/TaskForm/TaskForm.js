// src/components/TaskForm/TaskForm.js
import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import './TaskForm.css';

const TaskForm = ({ onSubmit, task }) => {
  const [formData, setFormData] = useState(task || {
    title: '',
    description: '',
    dueDate: '',
    importance: 'Low',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ title: '', description: '', dueDate: '', importance: 'Low' });
  };

  // Priority colors map
  const priorityColors = {
    Low: 'blue',
    Medium: 'yellow',
    High: 'red',
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-field">
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-field">
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div className="form-field">
        <TextField
          label="Due Date"
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />
      </div>
      <div className="form-field">
        <FormControl fullWidth>
          <InputLabel id="importance-label">Priority</InputLabel>
          <Select
            labelId="importance-label"
            name="importance"
            value={formData.importance}
            onChange={handleChange}
            className="importance-dropdown"
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Button type="submit" variant="contained" color="primary" className="submit-button" style={{ backgroundColor: priorityColors[formData.importance] }}>
        {task ? 'Update Task' : 'Add Task'}
      </Button>
    </form>
  );
};

export default TaskForm;
