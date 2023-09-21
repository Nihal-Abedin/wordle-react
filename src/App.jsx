import { useEffect, useState } from "react";
import "./App.css";
import Block from "./components/Block/Block";

function App() {
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [solution] = useState("world");
  useEffect(() => {
    const handleKey = (e) => {
      if (isGameOver) {
        return;
      }
      if (e.key.match(/^[a-z]+$/) && currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + e.key);
        return;
      }
      if (e.key === "Enter" && currentGuess.length == 5) {
        if (solution === currentGuess) {
          setIsGameOver(true);
        }
        const nullIndex = guesses.findIndex((val) => val === null);
        const newGuesses = [...guesses];
        newGuesses[nullIndex] = currentGuess;
        setGuesses(newGuesses);
        setCurrentGuess("");
      }
      if (e.key === "Backspace") {
        setCurrentGuess((prev) => prev.slice(0, -1));
      }
    };
    addEventListener("keydown", handleKey);

    return () => {
      removeEventListener("keydown", handleKey);
    };
  }, [currentGuess, guesses, solution]);
  return (
    <div className="wordBlocks">
      {guesses.map((guess, i) => {
        const isCurrentBlock = guesses.findIndex((val) => val === null) === i;
        return (
          <Block
            key={i}
            guessedWord={isCurrentBlock ? currentGuess : guess ?? ""}
            solution={solution}
            isFinal={!isCurrentBlock && guess != null}
          />
        );
      })}
    </div>
  );
}

export default App;
