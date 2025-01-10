import React, { useState } from 'react';
import useSound from 'use-sound';
import bgMusic from './bg.mp3';

const SetupScreen = ({ onStart }) => {
  const [denominations, setDenominations] = useState({
    "5k": 4,
    "10k": 4,
    "20k": 5,
    "50k": 5,
    "100k": 2,
    "200k": 2
  });

  const [play] = useSound(bgMusic, {
    volume: 0.3,
    loop: true // Để nhạc chạy liên tục
  });

  const handleChange = (denom, value) => {
    // Đảm bảo giá trị không âm
    const newValue = Math.max(0, parseInt(value) || 0);
    setDenominations(prev => ({
      ...prev,
      [denom]: newValue
    }));
  };

  const handleSubmit = () => {
    // Tạo mảng cards dựa trên số lượng đã chọn
    const cards = Object.entries(denominations).reduce((acc, [denom, count]) => {
      return [...acc, ...Array(count).fill(denom)];
    }, []);

    if (cards.length === 0) {
      alert("Vui lòng chọn ít nhất 1 tờ tiền!");
      return;
    }

    play(); // Phát nhạc khi bắt đầu game
    onStart(cards);
  };

  const totalCards = Object.values(denominations).reduce((sum, count) => sum + count, 0);

  return (
    <div className="setup-screen">
      <h1>Lucky Money 2024 🎊</h1>
      <p>Chọn số lượng cho từng mệnh giá</p>
      
      <div className="denominations-grid">
        {Object.entries(denominations).map(([denom, count]) => (
          <div key={denom} className="denomination-input">
            <label>
              <img 
                src={`images/${denom}.webp`} 
                alt={denom}
                style={{ width: '100px', height: 'auto', marginBottom: '10px' }}
              />
              <div className="input-group">
                <button 
                  onClick={() => handleChange(denom, count - 1)}
                  className="adjust-btn"
                >
                  -
                </button>
                <input
                  type="number"
                  value={count}
                  onChange={(e) => handleChange(denom, e.target.value)}
                  min="0"
                />
                <button 
                  onClick={() => handleChange(denom, count + 1)}
                  className="adjust-btn"
                >
                  +
                </button>
              </div>
            </label>
          </div>
        ))}
      </div>

      <div className="total-cards">
        Tổng số thẻ: {totalCards}
      </div>

      <button 
        className="start-button"
        onClick={handleSubmit}
      >
        Bắt đầu chơi
      </button>
    </div>
  );
};

export default SetupScreen; 