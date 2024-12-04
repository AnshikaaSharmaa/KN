// calendarpage.js

import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, LinearProgress, Button } from '@mui/material';
import CalendarView from '../components/CalendarView/CalendarView';
import { fetchTasks, updateTask } from '../services/api';

const CalendarPage = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch tasks on page load
  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true);
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  const handleCompleteTask = async (taskId) => {
    try {
      // Mark the task as completed by updating its status
      await updateTask(taskId, { completed: true });
      // Refresh tasks after marking one as completed
      const updatedTasks = await fetchTasks();
      setTasks(updatedTasks);
    } catch (err) {
      console.error('Error marking task as completed:', err);
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper 
        elevation={3} 
        sx={{ 
          padding: 3,
          marginTop: 4,
          borderRadius: 3,
          background: 'linear-gradient(145deg, #f0f4f8 0%, #e6eaf0 100%)'
        }}
      >
        {isLoading && <LinearProgress />}
        
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: 3 
        }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 600, 
              color: '#2c3e50',
              flexGrow: 1
            }}
          >
            Task Calendar
          </Typography>
        </Box>

        {/* Show message if no tasks are available */}
        {tasks.length === 0 && !isLoading && (
          <Typography variant="h6" color="textSecondary">
            No tasks to display
          </Typography>
        )}

        <CalendarView tasks={tasks} onCompleteTask={handleCompleteTask} />
      </Paper>
    </Container>
  );
};

export default CalendarPage;
