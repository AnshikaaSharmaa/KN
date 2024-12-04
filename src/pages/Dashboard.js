import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, CircularProgress, Snackbar, Alert, Container, Paper } from '@mui/material';
import { fetchTasks } from '../services/api';  // Adjust the import as needed
import Task from '../components/Task';  // Importing Task component
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

  // Load tasks function
  const loadTasks = async () => {
    try {
      setLoading(true);
      const fetchedTasks = await fetchTasks();
      console.log('Fetched tasks:', fetchedTasks); // Log fetched tasks to check their structure
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setSnackbar({ open: true, message: 'Failed to load tasks.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Handle task completion
  const handleCompleteTask = (taskID) => {
    console.log('Completed task with id:', taskID);
    // Update the task status or perform any other logic for marking task as complete
    setTasks((prevTasks) => prevTasks.map((task) =>
      task.id === taskID ? { ...task, completed: true } : task
    ));
  };

  // Handle task deletion
  const handleDeleteTask = (taskID) => {
    console.log('Deleting task with id:', taskID);  // Log taskID before deletion
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskID)); // Remove specific task
  };

  // Fetch tasks on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <Container maxWidth="lg">
      <div className="dashboard-container">
        <Paper elevation={2} className="dashboard-paper">
          <div className="dashboard-header">
            <Typography variant="h4" className="dashboard-title">
              Task Dashboard
            </Typography>
          </div>

          <Grid container spacing={3} className="dashboard-grid">
            {/* Task List */}
            <Grid item xs={12}>
              <Card className="task-card">
                <CardContent>
                  <Typography variant="h6" className="card-title">
                    Your Tasks
                  </Typography>
                  {loading ? (
                    <div className="loading-spinner">
                      <CircularProgress />
                    </div>
                  ) : (
                    <>
                      {tasks.length === 0 ? (
                        <Typography variant="body1" color="textSecondary">
                          No tasks yet!
                        </Typography>
                      ) : (
                        tasks.map((task) => (
                          <Task 
                            key={task.id} 
                            task={task} 
                            onComplete={handleCompleteTask}  
                            onDelete={handleDeleteTask} 
                          />
                        ))
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>

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
      </div>
    </Container>
  );
};

export default Dashboard;
