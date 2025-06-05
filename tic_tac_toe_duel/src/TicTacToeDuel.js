import React, { useState } from "react";

// PUBLIC_INTERFACE
function TicTacToeDuel() {
  /**
   * This is the main container for the TicTacToe Duel game.
   * It handles game state, win/draw logic, status, and rendering the grid and controls.
   * Color theme: primary (#ffffff), secondary (#000000), accent (#2196f3).
   */

  // "X" always goes first on reset
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState("Player X's turn");
  const [isGameOver, setIsGameOver] = useState(false);

  // Winning line indices for grid highlights (optional)
  const [winningLine, setWinningLine] = useState(null);

  // Utility to check for a win/draw and update status
  function evaluateGame(boardState) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // cols
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (
        boardState[a] &&
        boardState[a] === boardState[b] &&
        boardState[a] === boardState[c]
      ) {
        return { winner: boardState[a], line };
      }
    }
    // Draw if no nulls and no winner
    if (boardState.every((cell) => cell !== null)) {
      return { draw: true };
    }
    return null;
  }

  // Handle a square click
  function handleClick(i) {
    if (board[i] || isGameOver) return;

    const newBoard = [...board];
    newBoard[i] = xIsNext ? "X" : "O";
    setBoard(newBoard);

    const outcome = evaluateGame(newBoard);
    if (outcome?.winner) {
      setStatus(`Player ${outcome.winner} wins!`);
      setIsGameOver(true);
      setWinningLine(outcome.line);
    } else if (outcome?.draw) {
      setStatus("It's a draw!");
      setIsGameOver(true);
      setWinningLine(null);
    } else {
      setXIsNext((prev) => !prev);
      setStatus(`Player ${xIsNext ? "O" : "X"}'s turn`);
      setWinningLine(null);
    }
  }

  // Reset the game
  function handleReset() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setStatus("Player X's turn");
    setIsGameOver(false);
    setWinningLine(null);
  }

  // Render one square
  function renderSquare(i) {
    // If part of a winning line, highlight with accent
    const isWinning = winningLine?.includes(i);
    return (
      <button
        key={i}
        className="ttt-square"
        onClick={() => handleClick(i)}
        style={{
          color: board[i] === "X" ? "#2196f3" : "#000",
          background: "#fff",
          border: isWinning
            ? "2px solid #2196f3"
            : "1.5px solid #e0e0e0",
          fontWeight: isWinning ? "700" : "500",
        }}
        aria-label={`cell ${i + 1}`}
      >
        {board[i]}
      </button>
    );
  }

  // Render the full grid (3x3)
  function renderGrid() {
    return (
      <div className="ttt-grid">
        {[0, 1, 2].map((row) => (
          <div className="ttt-row" key={row}>
            {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="ttt-container">
      <div className="ttt-status">{status}</div>
      {renderGrid()}
      <button
        className="ttt-reset-btn"
        onClick={handleReset}
        style={{
          marginTop: 24,
        }}
        aria-label="reset game"
      >
        Reset
      </button>
    </div>
  );
}

export default TicTacToeDuel;
