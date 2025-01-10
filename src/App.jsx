import React, { useState } from "react";
import GameBoard from "./GameBoard";
import SetupScreen from "./SetupScreen";
import "./styles.css";

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCards, setGameCards] = useState([]);

  const handleGameStart = (cards) => {
    setGameCards(cards);
    setGameStarted(true);
  };

  return (
    <div>
      {!gameStarted ? (
        <SetupScreen onStart={handleGameStart} />
      ) : (
        <>
          <div className="header">
            <h1>Lucky Money 2024 🎊</h1>
            <p>Bạn được chọn ngẫu nhiên 1 thẻ chứa mệnh giá tiền ở mặt sau</p>
          </div>
          <GameBoard initialCards={gameCards} />
        </>
      )}
    </div>
  );
}
