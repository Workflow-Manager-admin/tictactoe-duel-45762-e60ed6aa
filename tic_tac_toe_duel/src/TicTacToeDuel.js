import React, { useState } from "react";

// PUBLIC_INTERFACE
function TicTacToeDuel() {
  /**
   * 90s Retro style: vibrant neon color assignment for player X/O, thick borders,
   * drop shadow, pixel-game font, grid overlay, classic arcade styling.
   */

  // Always X starts game, then two-player local.
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState("Player X's turn");
  const [isGameOver, setIsGameOver] = useState(false);
  const [winningLine, setWinningLine] = useState(null);

  // Neon palette for X/O
  const NEON_X = "#ff38b4";
  const NEON_O = "#39ff14";
  const WIN_BG = "#ffe12e";
  const DRAW_BG = "#a259f7";

  function evaluateGame(boardState) {
    const lines = [
      [0, 1, 2],[3, 4, 5],[6, 7, 8], // rows
      [0, 3, 6],[1, 4, 7],[2, 5, 8], // columns
      [0, 4, 8],[2, 4, 6] // diagonals
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c])
        return { winner: boardState[a], line };
    }
    if (boardState.every(cell => cell !== null)) return { draw: true };
    return null;
  }

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

  function handleReset() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setStatus("Player X's turn");
    setIsGameOver(false);
    setWinningLine(null);
  }

  function renderSquare(i) {
    const isWinning = winningLine?.includes(i);
    const value = board[i];
    let neonColor = value === "X" ? NEON_X : (value === "O" ? NEON_O : "#ffe12e");
    let squareClass = "ttt-square";
    if (isWinning) squareClass += " ttt-square-win";
    if (isGameOver && !winningLine && value) squareClass += " ttt-square-draw";

    return (
      <button
        key={i}
        className={squareClass}
        /* Only coloring by class, not inline */
        style={{
          color: value ? neonColor : "#ffe12e",
          filter: isWinning ? "drop-shadow(0 0 9px #ffe12e) drop-shadow(0 0 13px #ff38b4)" : undefined,
          background: isWinning
            ? WIN_BG
            : (isGameOver && !winningLine && value
                ? DRAW_BG
                : undefined),
        }}
        onClick={() => handleClick(i)}
        disabled={isGameOver || !!value}
        aria-label={`cell ${i + 1}`}
      >
        {value}
      </button>
    );
  }

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
        className="ttt-reset-btn btn-large"
        onClick={handleReset}
        aria-label="reset game"
      >
        RESET
      </button>
    </div>
  );
}

export default TicTacToeDuel;
