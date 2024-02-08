import React from "react";

const Card = ({ id, name, flipped, matched, clicked }) => {
  return (
    <div
      onClick={() => (flipped ? undefined : clicked(name, id))}
      className={
        "card" + (flipped ? " flipped" : "") + (matched ? " matched" : "")
      }
    >
      <div className="back">
        <img
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
          alt="Text"
          src={"images/test.jpeg"}
        />
      </div>
      <div className="front">
        <img alt={name} src={"images/" + name + ".webp"} />
      </div>
    </div>
  );
};

export default Card;
