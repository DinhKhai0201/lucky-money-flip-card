import queryString from "query-string";
import React, { useState } from "react";
import Confetti from "react-confetti";
import Card from "./Card";
import Modal from "./Modal";
import GameOver from "./GameOver";
import { sendNotification } from "./telegram";
import useSound from 'use-sound';
import boopSfx from './clap.mp3';

const GameBoard = ({ initialCards }) => {
  const parsed = queryString.parse(window.location.search);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [play] = useSound(boopSfx, {
    volume: 0.25
  });

  const [count, setCount] = useState(0);
  const [remainingCards, setRemainingCards] = useState(initialCards.length);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCount(0);
    setCardList(cardList.map(card => {
      if (card.id === selectedCard.index) {
        return { ...card, matched: true };
      }
      return card;
    }));
    setRemainingCards(prev => prev - 1);
  };

  ///////////// HELPER FUNCTION /////////////

  const shuffle = (array) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  ///////////// SETUP /////////////

  const [cardList, setCardList] = useState(
    shuffle(initialCards).map((name, index) => {
      return {
        id: index,
        name: name,
        flipped: false,
        matched: false,
      };
    })
  );

  const [selectedCard, setSelectedCard] = useState({});
  const [flippedCards, setFlippedCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  ///////////// GAME LOGIC /////////////

  const handleClick = async (name, index) => {
    if (count === 1 || cardList[index].matched) {
      return;
    }
    
    play();
    setCount(1);
    
    let currentCard = {
      name,
      index,
    };
    setSelectedCard(currentCard);

    setCardList(cardList.map((card) => {
      if (card.id === index) {
        return { ...card, flipped: true };
      }
      return card;
    }));
    
    setIsModalOpen(true);
    await sendNotification(
      `${parsed?.user ? parsed.user : "Unknown user"} win ${name}`
    );
  };

  const check = () => {
    let updateCards = cardList;
    if (
      flippedCards[0].name === flippedCards[1].name &&
      flippedCards[0].index !== flippedCards[1].index
    ) {
      updateCards[flippedCards[0].index].matched = true;
      updateCards[flippedCards[1].index].matched = true;
      isGameOver();
    } else {
      updateCards[flippedCards[0].index].flipped = false;
      updateCards[flippedCards[1].index].flipped = false;
    }
    setCardList(updateCards);
    setFlippedCards([]);
  };

  const isGameOver = () => {
    let done = true;
    cardList.forEach((card) => {
      if (!card.matched) done = false;
    });
    setGameOver(done);
  };

  ///////////// RESTART - REDO SETUP /////////////

  const restartGame = () => {
    setCardList(
      shuffle(initialCards).map((name, index) => {
        return {
          id: index,
          name: name,
          flipped: false,
          matched: false,
        };
      })
    );

    setFlippedCards([]);
    setGameOver(false);
  };

  const resetGame = () => {
    setCardList(
      shuffle(initialCards).map((name, index) => {
        return {
          id: index,
          name: name,
          flipped: false,
          matched: false,
        };
      })
    );
    setCount(0);
    setSelectedCard({});
    setRemainingCards(initialCards.length);
    setIsModalOpen(false);
  };

  ///////////// DISPLAY /////////////

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ fontSize: 'calc(0.8rem + 0.5vw)' }}>
          Còn lại: {remainingCards} thẻ
        </div>
        <button
          onClick={resetGame}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4834d4',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            cursor: 'pointer',
            fontSize: 'calc(0.8rem + 0.5vw)',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(72, 52, 212, 0.3)'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#686de0';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(72, 52, 212, 0.4)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#4834d4';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(72, 52, 212, 0.3)';
          }}
        >
          Chơi lại
        </button>
      </div>

      <div className="game-board">
        {cardList.map((card, index) => (
          <Card
            key={index}
            id={index}
            name={card.name}
            flipped={card.flipped}
            matched={card.matched}
            clicked={!card.matched && count === 0 ? handleClick : () => {}}
          />
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div style={{
          textAlign: "center",
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "15px"
        }}>
          <h2 style={{
            color: "#2d3436",
            fontSize: "calc(1rem + 1vw)",
            fontWeight: "bold",
            margin: 0
          }}>
            🎉 Chúc mừng bạn! 🎉
          </h2>
          <h3 style={{
            color: "#636e72",
            fontSize: "calc(0.8rem + 0.5vw)",
            margin: 0
          }}>
            Bạn nhận được
          </h3>
          <div style={{
            background: "rgba(255,255,255,0.9)",
            borderRadius: "10px",
            padding: "10px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
          }}>
            <img
              style={{
                width: "100%",
                maxWidth: "250px",
                height: "auto",
                objectFit: "contain"
              }}
              alt={selectedCard.name}
              src={`images/${selectedCard.name}.webp`}
            />
          </div>
          <button
            onClick={handleCloseModal}
            style={{
              padding: "10px 25px",
              backgroundColor: "#ff6b6b",
              color: "white",
              border: "none",
              borderRadius: "25px",
              cursor: "pointer",
              fontSize: "calc(0.8rem + 0.5vw)",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(255,107,107,0.3)",
              fontWeight: "bold"
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#ff5252";
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(255,107,107,0.4)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#ff6b6b";
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(255,107,107,0.3)";
            }}
          >
            Chọn tiếp
          </button>
        </div>
        {isModalOpen && (
          <Confetti
            width={window?.innerWidth}
            height={window?.innerHeight}
            numberOfPieces={200}
            recycle={false}
          />
        )}
      </Modal>
    </div>
  );
};

export default GameBoard;
