import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SplashScreen from './components/SplashScreen/SplashScreen';
import Dashboard from './pages/Dashboard';
import AddTask from './pages/AddTasks';
import CalendarPage from './pages/CalendarPage';
import LoginPage from './pages/Login'; // Import your LoginPage
import Signup from './pages/Signup';
import './App.css';

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleSplashLoaded = () => {
    setIsSplashVisible(false);
  };

  // Simulate authentication check (replace with AWS Cognito/auth logic)
  useEffect(() => {
    const checkAuth = async () => {
      const userIsAuthenticated = false; // Simulated check
      setIsAuthenticated(userIsAuthenticated);
    };
    checkAuth();
  }, []);

  // Handle login (this can be passed as a prop to LoginPage)
  const handleLogin = () => {
    setIsAuthenticated(true); // Update authentication state
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false); // Clear authentication state
  };

  return (
    <Router>
      <div className="App">
        {isSplashVisible ? (
          <SplashScreen onLoaded={handleSplashLoaded} />
        ) : (
          <>
            {/* AppBar Header */}
            <AppBar position="static" sx={{ backgroundColor: '#1c5f5c' }}>
              <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" className="App-title">
                  KeyNotes
                </Typography>
                {isAuthenticated && (
                  <button
                    onClick={handleLogout}
                    style={{ marginLeft: 'auto', color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    Logout
                  </button>
                )}
              </Toolbar>
            </AppBar>

            {/* Drawer for Navigation */}
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
              <List>
                {isAuthenticated ? (
                  <>
                    <ListItem button component={Link} to="/" onClick={toggleDrawer(false)}>
                      <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem button component={Link} to="/add-task" onClick={toggleDrawer(false)}>
                      <ListItemText primary="Add Task" />
                    </ListItem>
                    <ListItem button component={Link} to="/calendar" onClick={toggleDrawer(false)}>
                      <ListItemText primary="Calendar" />
                    </ListItem>
                  </>
                ) : (
                  <>
                    <ListItem button component={Link} to="/login" onClick={toggleDrawer(false)}>
                      <ListItemText primary="Login" />
                    </ListItem>
                    <ListItem button component={Link} to="/signup" onClick={toggleDrawer(false)}>
                      <ListItemText primary="Signup" />
                    </ListItem>
                  </>
                )}
              </List>
            </Drawer>

            {/* Main Content */}
            <Container maxWidth="md" style={{ marginTop: '24px' }} className="slytherin-background">
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                <Route path="/signup" element={<Signup onSignup={handleLogin} />} />
                
                {/* Protected Routes */}
                {isAuthenticated ? (
                  <>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/add-task" element={<AddTask />} />
                    <Route path="/calendar" element={<CalendarPage />} />
                  </>
                ) : (
                  <Route path="*" element={<Navigate to="/login" replace />} />
                )}
              </Routes>
            </Container>

            {/* Footer */}
            <footer className="App-footer">
              <Typography variant="body2">© 2024 KeyNotes. All rights reserved.</Typography>
            </footer>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
