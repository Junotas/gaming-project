import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import './index.css';

const queryClient = new QueryClient();
const router = createRouter({ routeTree });

// Updated theme to reflect purple and blue gradient tones
const theme = createTheme({
  palette: {
    primary: {
      main: '#6a1b9a', // Purple
      light: '#9c4dcc', // Lighter shade for hover effects
      dark: '#38006b', // Darker shade if needed
    },
    secondary: {
      main: '#1976d2', // Blue 
      light: '#63a4ff', // Lighter shade for secondary hover
      dark: '#004ba0', // Darker shade for additional contrast
    },
    background: {
      default: 'linear-gradient(to bottom right, #6a1b9a, #1976d2)', // Background gradient
    },
    text: {
      primary: '#ffffff', // White text for contrast on gradient
      secondary: '#000000', // Black text for use on white backgrounds
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
