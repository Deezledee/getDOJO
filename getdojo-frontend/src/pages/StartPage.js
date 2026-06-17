import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import { Box, Button, Stack, Typography } from '@mui/material';
import backgroundImage from '../images/background-logo.gif';

function StartPage() {
  return (
    <Box
      className='startPage'
      sx={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'grid',
        placeItems: 'center',
        px: 2,
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'scale(1.03)',
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(2, 6, 23, 0.52) 0%, rgba(15, 23, 42, 0.6) 45%, rgba(30, 41, 59, 0.68) 100%)',
        }}
      />

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          maxWidth: 760,
          px: 2,
          py: { xs: 3, md: 4 },
          borderRadius: 3,
          background: 'rgba(255,255,255,0.8)',
          border: '1px solid rgba(255,255,255,0.75)',
          backdropFilter: 'blur(6px)',
        }}
      >
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
          <Button
            component={Link}
            to="/login"
            variant="outlined"
            size="large"
            sx={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
          >
            Login
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default StartPage;
