import { createFileRoute } from '@tanstack/react-router';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

export const Route = createFileRoute('/')({
  component: () => {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-purple-500 to-blue-800 text-white">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 text-center text-black">
          <div className="flex flex-col items-center space-y-4">
            <SportsEsportsIcon sx={{ fontSize: 80, color: '#6a1b9a' }} />
            <h1 className="text-4xl font-bold">Welcome to GameZone</h1>
            <p className="text-lg mt-2">
              Welcome to my gaming website, where you can find all of my game projects.
            </p>
          </div>
        </div>
      </div>
    );
  },
});
