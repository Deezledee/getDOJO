import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import { Box, Button, Stack, Typography } from '@mui/material';

function StartPage() {
  return (
    <div className='startPage'>
      <Box sx={{ textAlign: 'center', maxWidth: 760, px: 2 }}>
        <Typography variant="h3" sx={{ fontWeight: 900, color: '#0f172a', mb: 1.5 }}>
          Welcome to getDOJO
        </Typography>
        <Typography variant="h6" sx={{ color: '#475569', fontWeight: 500, mb: 4 }}>
          Build your profile, explore techniques, and train with a clean modern dojo dashboard.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="center">
          <Button component={Link} to="/signup" variant="contained" size="large">
            Sign Up
          </Button>
          <Button component={Link} to="/login" variant="outlined" size="large">
            Login
          </Button>
        </Stack>
      </Box>
    </div>
  );
};

export default StartPage;
