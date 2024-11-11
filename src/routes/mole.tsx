import { useState, useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Typography, Button, useTheme } from '@mui/material';

const GRID_SIZE = 3;
const MOLE_APPEARANCE_INTERVAL = 1000;
const GAME_DURATION = 30000; // 30 seconds

export const Route = createFileRoute('/mole')({
  component: () => {
    const theme = useTheme();
    const [molePosition, setMolePosition] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [isGameActive, setIsGameActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);

    const startGame = () => {
      setScore(0);
      setTimeLeft(GAME_DURATION);
      setIsGameActive(true);
    };

    const endGame = () => {
      setIsGameActive(false);
      setMolePosition(null);
    };

    const randomizeMolePosition = () => {
      const randomPosition = Math.floor(Math.random() * GRID_SIZE * GRID_SIZE);
      setMolePosition(randomPosition);
    };

    const handleWhack = (position: number) => {
      if (position === molePosition) {
        setScore((prevScore) => prevScore + 1);
        setMolePosition(null);
      }
    };

    useEffect(() => {
      if (!isGameActive) return;
      const moleInterval = setInterval(randomizeMolePosition, MOLE_APPEARANCE_INTERVAL);
      const timerInterval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1000) {
            endGame();
            clearInterval(moleInterval);
            clearInterval(timerInterval);
            return 0;
          }
          return prevTime - 1000;
        });
      }, 1000);
      return () => {
        clearInterval(moleInterval);
        clearInterval(timerInterval);
      };
    }, [isGameActive]);

    return (
      <div
        className="flex flex-col items-center min-h-screen"
        style={{
          background: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
          Whack-a-Mole
        </Typography>
        <Typography variant="h5" sx={{ mb: 4 }}>
          Score: {score}
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }}>
          Time Left: {timeLeft / 1000}s
        </Typography>

        <div
          className="grid gap-4"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${GRID_SIZE}, 100px)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 100px)`,
            gap: '10px',
          }}
        >
          {[...Array(GRID_SIZE * GRID_SIZE)].map((_, index) => (
            <div
              key={index}
              onClick={() => handleWhack(index)}
              style={{
                width: '100px',
                height: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor:
                  index === molePosition
                    ? theme.palette.secondary.main
                    : theme.palette.background.paper,
                border: `2px solid ${theme.palette.primary.main}`,
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
            />
          ))}
        </div>

        {!isGameActive && (
          <Button
            onClick={startGame}
            variant="contained"
            color="primary"
            sx={{ mt: 4, fontWeight: 'bold' }}
          >
            Start Game
          </Button>
        )}

        {isGameActive && timeLeft <= 0 && (
          <Typography
            variant="h6"
            sx={{ color: theme.palette.error.main, mt: 2 }}
          >
            Game Over! Final Score: {score}
          </Typography>
        )}
      </div>
    );
  },
});
