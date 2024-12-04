import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Add authentication logic here (e.g., Firebase, Cognito, etc.)
    console.log('Logging in with:', email, password);
    
    // Assuming login is successful:
    onLogin(); // Update authentication state
    navigate('/'); // Redirect to the dashboard after successful login
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
        <Grid container justifyContent="flex-end" marginTop="1rem">
          <Button onClick={() => navigate('/signup')} variant="text">
            Don't have an account? Sign up
          </Button>
        </Grid>
      </form>
    </Container>
  );
};

export default LoginPage;
