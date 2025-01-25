import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GameBoard from "./GameBoard";
import SetupScreen from "./SetupScreen";
import LuckyCard from "./LuckyCard";
import "./styles.css";

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCards, setGameCards] = useState([]);

  const handleGameStart = (cards) => {
    setGameCards(cards);
    setGameStarted(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          !gameStarted ? (
            <SetupScreen onStart={handleGameStart} />
          ) : (
            <>
              <div className="header">
                <h1>Lucky Money 🎊</h1>
                <p>Bạn được chọn ngẫu nhiên 1 thẻ chứa mệnh giá tiền ở mặt sau</p>
              </div>
              <GameBoard initialCards={gameCards} />
            </>
          )
        } />
        <Route path="/user" element={<LuckyCard />} />
      </Routes>
    </BrowserRouter>
  );
}
