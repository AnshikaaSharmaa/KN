// src/services/api.js

let tasks = []; // Simulating a mock database

// Create task
export const createTask = async (taskData) => {
  taskData.id = Date.now(); // Use timestamp as a mock ID
  taskData.completed = false; // New tasks are not completed by default
  tasks.push(taskData);
  return taskData; // Return the task that was added
};

// Read tasks (excluding completed tasks)
export const fetchTasks = async () => {
  return tasks.filter((task) => !task.completed); // Exclude completed tasks
};

// Update task
export const updateTask = async (id, updatedData) => {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedData };
    return tasks[taskIndex];
  }
  throw new Error('Task not found');
};

// Delete task
export const deleteTask = async (id) => {
  tasks = tasks.filter((task) => task.id !== id);
  return { message: 'Task deleted' }; // Return a success message
};
