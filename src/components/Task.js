import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import '../styles/Task.css';  // Adjust this path according to your folder structure


const Task = ({ task, onComplete, onDelete }) => {
  const { id, title, description, priority, completed } = task;

  // Determine the task priority color based on the priority value
  const priorityColor = {
    high: '#EBBD9E',     // High priority color
    medium: '#C1C1E2',   // Medium priority color
    low: '#E2CDD9',      // Low priority color
  };

  return (
    <Card className="task-card" style={{ borderLeft: `5px solid ${priorityColor[priority]}` }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">{description}</Typography>
        <div>
          <Button 
            onClick={() => onComplete(id)} 
            variant="outlined" 
            color="primary" 
            disabled={completed}
          >
            {completed ? 'Completed' : 'Complete'}
          </Button>
          <Button 
            onClick={() => onDelete(id)} 
            variant="outlined" 
            color="secondary"
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Task;
