import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button, Typography, useTheme } from "@mui/material";

const TicTacToeGame = () => {
  const theme = useTheme();
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);
    setIsXTurn(!isXTurn);
    checkWinner(newBoard);
  };

  const checkWinner = (newBoard: string[]) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        setWinner(newBoard[a]);
        return;
      }
    }
    if (newBoard.every((cell) => cell)) setWinner("Draw");
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setWinner(null);
  };

  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen"
      style={{ background: theme.palette.background.default }}
    >
      <Typography
        variant="h3"
        sx={{ fontWeight: "bold", color: theme.palette.text.primary, mb: 4 }}
      >
        Tic-Tac-Toe
      </Typography>
      <div style={{ minHeight: 40, marginBottom: 16 }}>
        <Typography
          variant="h5"
          sx={{
            color: theme.palette.text.primary,
            visibility: winner ? "visible" : "hidden",
          }}
        >
          {winner === "Draw" ? "It's a draw!" : `Winner: ${winner}`}
        </Typography>
      </div>
      <div className="grid grid-cols-3 gap-1" style={{ maxWidth: 300 }}>
        {board.map((value, index) => (
          <Button
            key={index}
            variant="outlined"
            onClick={() => handleClick(index)}
            sx={{
              fontSize: 32,
              width: 100,
              height: 100,
              color:
                value === "X"
                  ? theme.palette.primary.main
                  : theme.palette.secondary.main,
              backgroundColor: "#ffffff",
              borderColor: theme.palette.primary.dark,
              borderWidth: "2px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                backgroundColor: theme.palette.primary.light,
              },
            }}
          >
            {value}
          </Button>
        ))}
      </div>
      <Button
        variant="contained"
        color="secondary"
        onClick={resetGame}
        sx={{ mt: 4, fontWeight: "bold" }}
      >
        Restart Game
      </Button>
    </div>
  );
};

export const Route = createFileRoute("/TicTacToe")({
  component: TicTacToeGame,
});
