import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button, Typography, useTheme } from "@mui/material";

interface Card {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const symbols = ["🍎", "🍌", "🍇", "🍉", "🍓", "🍒"];

const MemoryGame = () => {
  const theme = useTheme();
  const [cards, setCards] = useState<Card[]>([]);
  const [firstCard, setFirstCard] = useState<Card | null>(null);
  const [secondCard, setSecondCard] = useState<Card | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [matchesFound, setMatchesFound] = useState(0);

  const initializeGame = () => {
    const shuffledCards = [...symbols, ...symbols]
      .map((content, index) => ({
        id: index,
        content,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setFirstCard(null);
    setSecondCard(null);
    setIsChecking(false);
    setMatchesFound(0);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (card: Card) => {
    if (isChecking || card.isFlipped || card.isMatched) return;

    const flippedCard = { ...card, isFlipped: true };
    const newCards = cards.map((c) => (c.id === card.id ? flippedCard : c));
    setCards(newCards);

    if (!firstCard) {
      setFirstCard(flippedCard);
    } else if (!secondCard) {
      setSecondCard(flippedCard);
      setIsChecking(true);
    }
  };

  useEffect(() => {
    if (firstCard && secondCard) {
      const checkMatchTimeout = setTimeout(() => {
        if (firstCard.content === secondCard.content) {
          const newCards = cards.map((card) => {
            if (card.id === firstCard.id || card.id === secondCard.id) {
              return { ...card, isMatched: true };
            }
            return card;
          });
          setCards(newCards);
          setMatchesFound((prev) => prev + 1);
        } else {
          const newCards = cards.map((card) => {
            if (card.id === firstCard.id || card.id === secondCard.id) {
              return { ...card, isFlipped: false };
            }
            return card;
          });
          setCards(newCards);
        }
        setFirstCard(null);
        setSecondCard(null);
        setIsChecking(false);
      }, 1000);

      return () => clearTimeout(checkMatchTimeout);
    }
  }, [firstCard, secondCard, cards]);

  const resetGame = () => {
    initializeGame();
  };

  return (
    <div
      className="flex flex-col items-center min-h-screen"
      style={{
        background: theme.palette.background.default,
        color: theme.palette.text.primary,
        padding: "20px",
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: "bold", mb: 4 }}>
        Memory Matching Game
      </Typography>
      <div
        className="grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 80px)",
          gap: "10px",
        }}
      >
        {cards.map((card) => (
          <Button
            key={card.id}
            onClick={() => handleCardClick(card)}
            disabled={card.isMatched}
            sx={{
              width: "80px",
              height: "80px",
              fontSize: "32px",
              backgroundColor:
                card.isFlipped || card.isMatched
                  ? theme.palette.primary.light
                  : theme.palette.grey[400],
              color:
                card.isFlipped || card.isMatched
                  ? theme.palette.text.primary
                  : "transparent",
              "&:hover": {
                backgroundColor: theme.palette.primary.main,
              },
            }}
          >
            {card.content}
          </Button>
        ))}
      </div>
      {matchesFound === symbols.length && (
        <Typography variant="h5" sx={{ mt: 4 }}>
          Congratulations! You've matched all pairs!
        </Typography>
      )}
      <Button
        onClick={resetGame}
        variant="contained"
        color="secondary"
        sx={{ mt: 4, fontWeight: "bold" }}
      >
        Restart Game
      </Button>
    </div>
  );
};

export const Route = createFileRoute("/memory")({
  component: MemoryGame,
});
