import queryString from "query-string";
import React, { useState } from "react";
import Confetti from "react-confetti";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Card from "./Card";
import GameOver from "./GameOver";
import { sendNotification } from "./telegram";

const GameBoard = () => {
  const parsed = queryString.parse(window.location.search);
  const [open, setOpen] = useState(false);

  const [count, setCount] = useState(0);
  const cards = [
    "5k",
    "5k",
    "10k",
    "10k",
    "10k",
    "20k",
    "20k",
    "20k",
    "20k",
    "50k",
    "50k",
    "50k",
    "50k",
    "100k",
    "100k",
    "200k",
  ];

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

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
    shuffle(cards).map((name, index) => {
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
    if (count == 1) {
      return;
    }
    setCount(1);
    let currentCard = {
      name,
      index,
    };
    setSelectedCard(currentCard);

    //update card is flipped
    let updateCards = cardList.map((card) => {
      if (card.id === index) {
        card.flipped = true;
      }
      return card;
    });
    // let updateFlipped = flippedCards;
    // updateFlipped.push(currentCard);
    // setFlippedCards(updateFlipped);
    setCardList(updateCards);
    onOpenModal();
    await sendNotification(
      `${parsed?.user ? parsed.user : "Unknow user"} win ${name}`
    );
    //if 2 cards are flipped, check if they are a match
    // if (flippedCards.length === 2) {
    //   setTimeout(() => {
    //     check();
    //   }, 750);
    // }
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
      shuffle(cards).map((name, index) => {
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

  ///////////// DISPLAY /////////////

  return (
    <div className="game-board">
      {!gameOver &&
        cardList.map((card, index) => (
          <Card
            key={index}
            id={index}
            name={card.name}
            flipped={card.flipped}
            matched={card.matched}
            clicked={
              count == 0
                ? flippedCards.length === 2
                  ? () => {}
                  : handleClick
                : () => {}
            }
          />
        ))}
      {gameOver && <GameOver restartGame={restartGame} />}
      <Modal open={open} onClose={onCloseModal} center>
        <h2
          style={{
            textAlign: "center",
          }}
        >
          Bạn nhận được
        </h2>
        <div className="front">
          <img
            style={{
              width: "400px",
              height: "200px",
            }}
            alt={selectedCard.name}
            src={"images/" + selectedCard.name + ".webp"}
          />
        </div>
        {open && (
          <Confetti
            width={window?.width || 500}
            height={window?.height || 500}
          />
        )}
      </Modal>
    </div>
  );
};

export default GameBoard;
