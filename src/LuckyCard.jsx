import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import useSound from 'use-sound';
import Confetti from 'react-confetti';
import { sendNotification } from "./telegram";
import boopSfx from './clap.mp3';

const LuckyCard = () => {
  const [isShaking, setIsShaking] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [prize, setPrize] = useState(null);
  const [play] = useSound(boopSfx, { volume: 0.25 });
  const location = useLocation();
  const { name } = queryString.parse(location.search);
  const [title, setTitle] = useState(null);

  const prizes = [
    "50k", "50k", "50k", "50k",
    "100k", "100k", "100k",
    "200k", "200k", "200k",
    "500k"
  ];

  useEffect(() => {
    setTitle(`${name ? `Chào ${name}` : 'Chào bạn'}, nhấn vào bao lì xì để mở`);
  }, [name]);

  const handleClick = async () => {
    if (isShaking || isOpened) return;
    
    setIsShaking(true);
    setTitle('Đang mở lì xì...');
    
    setTimeout(async () => {
      setIsShaking(false);
      setIsOpened(true);
      play();
      
      const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
      setPrize(randomPrize);
      
      // Cập nhật title khi trúng thưởng
      setTitle(`🎉 Chúc mừng ${name || 'bạn'} đã nhận được ${randomPrize}! 🎉`);
      
      await sendNotification(`${name || "Unknown user"} nhận được ${randomPrize}`);
    }, 3000);
  };

  return (
    <div className="lucky-card-container" style={{
      background: 'linear-gradient(135deg, #fff3e0 0%, #ffcdd2 100%)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'radial-gradient(#e53935 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        opacity: 0.1,
        pointerEvents: 'none'
      }} />

      <h1 className="welcome-text" style={{
        color: '#c62828',
        fontSize: 'calc(1.5rem + 1vw)',
        textAlign: 'center',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(198, 40, 40, 0.1)',
        position: 'relative',
        padding: '20px',
        maxWidth: '800px'
      }}>
        {title}
      </h1>
      
      {isOpened && (
        <p className="prize-message" style={{
          fontSize: 'calc(1rem + 0.5vw)',
          color: '#c62828',
          marginTop: '20px',
          textAlign: 'center',
          fontWeight: '500',
          animation: 'fadeIn 1s ease',
          padding: '20px 30px',
          background: 'rgba(255, 248, 225, 0.95)',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(198, 40, 40, 0.1)',
          border: '1px solid rgba(198, 40, 40, 0.1)',
          maxWidth: '600px',
          width: '90%',
          transform: 'translateY(-10px)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)'
        }}>
          <span style={{ 
            fontSize: 'calc(1.2rem + 0.5vw)', 
            display: 'block',
            marginBottom: '10px',
            color: '#c62828',
            fontWeight: 'bold'
          }}>
            🎊 Chúc Mừng Năm Mới 🎊
          </span>
          Chúc {name || "bạn"} năm mới an khang thịnh vượng! 🧧
        </p>
      )}
      
      <div 
        className={`lucky-card ${isShaking ? 'shaking' : ''} ${isOpened ? 'opened' : ''}`}
        onClick={handleClick}
        style={{
          position: 'relative',
          marginTop: '20px',
          marginBottom: '20px',
          zIndex: 1
        }}
      >
        {!isOpened ? (
          <img 
            src="images/test.jpeg" 
            alt="Lucky envelope"
            style={{
              width: '300px',
              height: 'auto',
              filter: 'drop-shadow(0 10px 20px rgba(198, 40, 40, 0.2))',
              transition: 'all 0.3s ease',
              animation: isShaking ? 'shake 0.5s infinite' : '',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              if (!isShaking && !isOpened) {
                e.target.style.transform = 'rotate(0deg) scale(1.1)';
                e.target.style.filter = 'drop-shadow(0 15px 25px rgba(198, 40, 40, 0.25))';
              }
            }}
            onMouseOut={(e) => {
              if (!isShaking && !isOpened) {
                e.target.style.transform = 'rotate(-5deg) scale(1)';
                e.target.style.filter = 'drop-shadow(0 10px 20px rgba(198, 40, 40, 0.2))';
              }
            }}
          />
        ) : (
          <img 
            src={`images/${prize}.webp`}
            alt={prize}
            style={{
              width: '300px',
              height: 'auto',
              filter: 'drop-shadow(0 10px 30px rgba(198, 40, 40, 0.15))',
              animation: 'fadeIn 1s ease',
              transform: 'scale(1.1)',
              transition: 'all 0.3s ease'
            }}
          />
        )}
      </div>

      {isOpened && (
        <Confetti
          width={window?.innerWidth}
          height={window?.innerHeight}
          numberOfPieces={200}
          recycle={false}
          colors={['#c62828', '#ffd700', '#d50000', '#ffeb3b', '#ff6d00']}
        />
      )}
    </div>
  );
};

export default LuckyCard; 