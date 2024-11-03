// main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import './index.css';

const queryClient = new QueryClient();
const router = createRouter({ routeTree });


const theme = createTheme({
  palette: {
    primary: {
      main: '#6a1b9a', // Purple 
    },
    secondary: {
      main: '#ff4081', // pinkish-red
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
