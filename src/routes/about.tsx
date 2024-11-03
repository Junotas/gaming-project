import { useState } from 'react';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';
import { createFileRoute } from '@tanstack/react-router';
import { Button, Typography } from '@mui/material';

export const Route = createFileRoute('/about')({
  component: () => {
    const [message, setMessage] = useState("We're just getting started!");

    const toggleMessage = () => {
      setMessage((prevMessage) =>
        prevMessage === "We're just getting started!"
          ? "Stay tuned for more cool stuff!"
          : "We're just getting started!"
      );
    };

    return (
      <div className="flex flex-col justify-center items-center min-h-screen" style={{ backgroundColor: '#f3e5f5' }}>
        <Typography variant="h1" sx={{ fontWeight: 'extrabold', color: 'primary.main', mb: 4 }}>
          About Us
        </Typography>

        <div className="flex justify-center space-x-12 mb-8">
          <img src={viteLogo} className="h-32 animate-spin-slow" alt="Vite logo" />
          <img src={reactLogo} className="h-32 animate-pulse" alt="React logo" />
        </div>

        <Typography variant="body1" align="center" sx={{ color: 'primary.main', mb: 4, maxWidth: 'md' }}>
          We’re two logos just hanging out, waiting for you to build something cool with us!
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={toggleMessage}
          sx={{ fontWeight: 'bold', mb: 2 }}
        >
          Click for a Surprise!
        </Button>

        <Typography variant="h6" sx={{ color: 'primary.main', mt: 2 }}>
          {message}
        </Typography>
      </div>
    );
  },
});
