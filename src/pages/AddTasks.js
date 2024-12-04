import React, { useState } from 'react';
import { Card, CardContent, Typography, Snackbar, Alert, Container } from '@mui/material';
import TaskForm from '../components/TaskForm/TaskForm'; // Import your TaskForm component
import { createTask } from '../services/api'; // Adjust the import if needed
import '../styles/AddTasks.css'; // Import the custom CSS for styling

const AddTask = () => {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

  // Handle task creation
  const handleCreateTask = async (taskData) => {
    if (!taskData.title) {
      setSnackbar({ open: true, message: 'Please enter a task title.', severity: 'error' });
      return;
    }

    try {
      await createTask(taskData); // Send the full task data (title, description, etc.)
      setSnackbar({ open: true, message: 'Task created successfully!', severity: 'success' });
    } catch (error) {
      console.error('Error creating task:', error);
      setSnackbar({ open: true, message: 'Failed to create task.', severity: 'error' });
    }
  };

  return (
    <Container maxWidth="sm" className="add-task-container">
      <Card className="task-card">
        <CardContent>
          <Typography variant="h5" className="task-title">
            Add a New Task
          </Typography>
          {/* Use TaskForm to handle task creation */}
          <TaskForm onSubmit={handleCreateTask} />
        </CardContent>
      </Card>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddTask;
