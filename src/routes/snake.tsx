import { useEffect, useState, useCallback } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useTheme } from "@mui/material/styles";

const GRID_SIZE = 10;
const INITIAL_SNAKE_POSITION = [{ x: 2, y: 2 }];
const INITIAL_FOOD_POSITION = { x: 5, y: 5 };

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

const SnakeGame = () => {
  const theme = useTheme();
  const [snake, setSnake] = useState(INITIAL_SNAKE_POSITION);
  const [food, setFood] = useState(INITIAL_FOOD_POSITION);
  const [direction, setDirection] = useState<Direction | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!isGameStarted) setIsGameStarted(true); // Start the game on first key press
    switch (event.key) {
      case "w":
        if (direction !== "DOWN") setDirection("UP");
        break;
      case "s":
        if (direction !== "UP") setDirection("DOWN");
        break;
      case "a":
        if (direction !== "RIGHT") setDirection("LEFT");
        break;
      case "d":
        if (direction !== "LEFT") setDirection("RIGHT");
        break;
    }
  }, [direction, isGameStarted]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  const generateFoodPosition = useCallback((): { x: number; y: number } => {
    let newFoodPosition: { x: number; y: number };
  
    do {
      newFoodPosition = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (
      snake.some(
        (segment) =>
          segment.x === newFoodPosition.x && segment.y === newFoodPosition.y
      )
    );
  
    return newFoodPosition;
  }, [snake]);

  useEffect(() => {
    if (!isGameStarted || isGameOver || !direction) return;
    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        const head = { ...newSnake[0] };
        switch (direction) {
          case "UP":
            head.y = (head.y - 1 + GRID_SIZE) % GRID_SIZE;
            break;
          case "DOWN":
            head.y = (head.y + 1) % GRID_SIZE;
            break;
          case "LEFT":
            head.x = (head.x - 1 + GRID_SIZE) % GRID_SIZE;
            break;
          case "RIGHT":
            head.x = (head.x + 1) % GRID_SIZE;
            break;
        }
        // Check collision with itself
        if (
          newSnake.some(
            (segment) => segment.x === head.x && segment.y === head.y
          )
        ) {
          setIsGameOver(true);
          return prevSnake;
        }
        newSnake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
          setFood(generateFoodPosition());
        } else {
          newSnake.pop(); // Move the snake without growing
        }
        return newSnake;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [direction, food, isGameOver, isGameStarted, generateFoodPosition]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE_POSITION);
    setFood(generateFoodPosition());
    setDirection(null);
    setIsGameStarted(false);
    setIsGameOver(false);
  };

  return (
    <div
      className="flex flex-col items-center min-h-screen"
      style={{
        background: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <h1 className="text-2xl font-bold mb-4">Snake Game</h1>
      <div
        className="relative grid gap-1"
        style={{
          background: theme.palette.background.paper,
          gridTemplateColumns: `repeat(${GRID_SIZE}, 20px)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 20px)`,
        }}
      >
        {[...Array(GRID_SIZE)].map((_, rowIndex) =>
          [...Array(GRID_SIZE)].map((_, colIndex) => {
            const isSnake = snake.some(
              (segment) => segment.x === colIndex && segment.y === rowIndex
            );
            const isFood = food.x === colIndex && food.y === rowIndex;
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`w-5 h-5 ${
                  isSnake
                    ? "bg-green-500"
                    : isFood
                    ? "bg-red-500"
                    : "bg-gray-800"
                }`}
              />
            );
          })
        )}
      </div>
      {isGameOver && (
        <p className="mt-4" style={{ color: theme.palette.error.main }}>
          Game Over! Press Restart to play again.
        </p>
      )}
      <button
        onClick={resetGame}
        className="mt-4 px-4 py-2 font-bold rounded"
        style={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.text.primary,
        }}
      >
        Restart Game
      </button>

      <div
        className="absolute bottom-16 right-4 p-3 rounded shadow-md"
        style={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.secondary,
        }}
      >
        <h2
          className="text-lg font-bold"
          style={{ color: theme.palette.primary.main }}
        >
          Game Controls
        </h2>
        <p>Game starts with W, A, S, D keys</p>
        <p>W - Move Up</p>
        <p>S - Move Down</p>
        <p>A - Move Left</p>
        <p>D - Move Right</p>
        <p>Wrap-around at edges!</p>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/snake")({
  component: SnakeGame,
});
