import React from "react";
import GameBoard from "./GameBoard";
import "./styles.css";

export default function App() {
  return (
    <>
      <div className="header">
        <h1>Lucky Money 🎊</h1>
        <p>Bạn được chọn ngẫu nhiên 1 thẻ chứa mệnh giá tiền ở mặt sau</p>
        <p style={{ textAlign: "center", fontSize: "20px" }}>
          Số lượng: 3 tờ 5k, 4 tờ 10k, 4 tờ 20k, 3 tờ 50k, 3 tờ 100k và 1 tờ 200k
        </p>
      </div>
      <GameBoard />
    </>
  );
}
