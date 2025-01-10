import React from "react";

const Card = ({ id, name, flipped, matched, clicked }) => {
  return (
    <div
      onClick={() => (!flipped && !matched ? clicked(name, id) : undefined)}
      className={`card${flipped ? " flipped" : ""}${matched ? " matched" : ""}`}
    >
      <div className="back">
        <img
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            borderRadius: "10px",
            transition: "transform 0.3s ease"
          }}
          alt="Card Back"
          src={"images/test.jpeg"}
        />
      </div>
      <div className="front">
        <img 
          alt={name} 
          src={`images/${name}.webp`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            transition: "transform 0.3s ease",
            background: "transparent"
          }}
        />
      </div>
    </div>
  );
};

export default Card;
