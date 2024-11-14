import { createFileRoute } from '@tanstack/react-router';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { Typography, Paper, useTheme } from '@mui/material';

export const Route = createFileRoute('/')({
  component: function Component() {
    const theme = useTheme();
    return (
      <div className="flex flex-col justify-center items-center min-h-screen" style={{ background: theme.palette.background.default, color: theme.palette.text.primary }}>
        <Paper elevation={4} className="w-full max-w-lg p-8 text-center" sx={{ bgcolor: theme.palette.background.paper, color: theme.palette.text.primary, borderRadius: 2, boxShadow: 3 }}>
          <div className="flex flex-col items-center space-y-4">
            <SportsEsportsIcon sx={{ fontSize: 80, color: theme.palette.primary.main }} />
            <Typography variant="h2" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>Welcome to the GameZone</Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>Welcome to my gaming website, where you can find all of my game projects.</Typography>
          </div>
        </Paper>
      </div>
    );
  },
});
