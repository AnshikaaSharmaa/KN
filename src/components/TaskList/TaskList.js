import React from 'react';
import { Grid, Card, CardContent, Typography, Button, Chip } from '@mui/material';
import { Task } from './Task'; // Ensure the Task component is imported properly

const getImportanceColor = (importance) => {
  switch (importance) {
    case 'high':
      return { backgroundColor: '#EBBD9', color: '#D9534F' }; // High priority color
    case 'medium':
      return { backgroundColor: '#C1C1E2', color: '#5E5E99' }; // Medium priority color
    case 'low':
      return { backgroundColor: '#E2CDD9', color: '#6B4F47' }; // Low priority color
    default:
      return { backgroundColor: '#f0f0f0', color: '#666' }; // Default grey
  }
};

const TaskList = ({ tasks, onCompleteTask, onDeleteTask }) => {
  return (
    <Grid container spacing={3}>
      {tasks.map((task) => (
        <Grid item xs={12} sm={6} md={4} key={task.id}>
          <Card
            className={`task-card ${task.completed ? 'completed' : ''}`}
            sx={{ backgroundColor: task.completed ? '#e0e0e0' : '#ffffff' }}
          >
            <CardContent>
              <Typography variant="h6">{task.title}</Typography>
              <Typography variant="body2">{task.description}</Typography>

              <div style={{ marginTop: '10px' }}>
                <Chip
                  label={task.priority}
                  style={getImportanceColor(task.priority.toLowerCase())} // Apply color here
                />
              </div>

              <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => onCompleteTask(task.id)}
                  disabled={task.completed}
                >
                  {task.completed ? 'Completed' : 'Complete'}
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => onDeleteTask(task.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default TaskList;
