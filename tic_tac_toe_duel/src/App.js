import React from "react";
import "./App.css";
import TicTacToeDuel from "./TicTacToeDuel";

function App() {
  return (
    <div className="app" style={{ background: "var(--primary-bg)", color: "var(--secondary-color)" }}>
      <nav className="navbar" style={{ background: "var(--primary-bg)", color: "var(--secondary-color)", borderBottom: "1.5px solid #e0e0e0" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <div className="logo" style={{ color: "var(--accent-color)", fontWeight: '700' }}>
              <span className="logo-symbol">*</span> TicTacToe Duel
            </div>
            {/* No extra buttons */}
          </div>
        </div>
      </nav>
      <main>
        <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 80px)" }}>
          <TicTacToeDuel />
        </div>
      </main>
    </div>
  );
}

export default App;