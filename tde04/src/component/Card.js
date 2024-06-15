import { useState } from "react";
import "./Card.css";

const Card = ({ title, text, image }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className={`card ${isClicked ? "clicked" : ""}`} onClick={handleClick}>
      <div className="card-image">
        <img src={image} alt={title} />
      </div>
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-text">{text}</p>
      </div>
    </div>
  );
};

export default Card;
