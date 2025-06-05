import React from "react";
import "./App.css";
import TicTacToeDuel from "./TicTacToeDuel";

// PUBLIC_INTERFACE
function App() {
  /** 
   * Main app container using 90s retro theme applied via CSS classes.
   */
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <div className="logo">
              <span className="logo-symbol">🎮</span> TicTacToe Duel
            </div>
            {/* No extra buttons */}
          </div>
        </div>
      </nav>
      <main>
        <div
          className="container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "calc(100vh - 80px)",
            background: "transparent",
            boxShadow: "none",
            borderRadius: 0,
            border: "none"
          }}
        >
          <TicTacToeDuel />
        </div>
      </main>
    </div>
  );
}

export default App;