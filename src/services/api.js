// src/services/api.js

const API_URL = 'https://kxqp2nl4lh.execute-api.us-east-1.amazonaws.com'; // Replace with your API Gateway URL

// Create task
export const createTask = async (taskData) => {
  try {
    const response = await fetch(`${API_URL}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) throw new Error('Failed to create task');
    return await response.json(); // Return the created task
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

// Read tasks (excluding completed tasks)
export const fetchTasks = async () => {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'GET',
    });
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return await response.json(); // Return the list of tasks
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

// Update task
export const updateTask = async (id, updatedData) => {
  try {
    const response = await fetch(`${API_URL}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, ...updatedData }),
    });
    if (!response.ok) throw new Error('Failed to update task');
    return await response.json(); // Return the updated task
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

// Delete task
export const deleteTask = async (id) => {
  try {
    const response = await fetch(`${API_URL}/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) throw new Error('Failed to delete task');
    return await response.json(); // Return success message
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
