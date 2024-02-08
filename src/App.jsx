import React from "react";
import GameBoard from "./GameBoard";
import "./styles.css";

export default function App() {
  return (
    <>
      <div>
        <p style={{ textAlign: "center", fontSize: "30px" }}>Lucky money</p>
        <p style={{ textAlign: "center", fontSize: "20px" }}>
          Bạn đưọc chọn ngẫu nhiên 1 thẻ chứa mệnh giá tiền ở mặt sau
        </p>
        <p style={{ textAlign: "center", fontSize: "20px" }}>
          Số lượng: 2 tờ 5k, 3 tờ 10k, 3 tờ 20k, 4 tờ 50k , 3 tờ 100k 
          và 1 thẻ chứa phần quà đặc biệt{" "}
        </p>
      </div>
      <GameBoard />
    </>
  );
}
