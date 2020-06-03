import React from "react";

import Back from "../Asset/image/cardback.png";

import Planet from "../Asset/svg/planet";

const card = (props) => {
  const { classname, onClick, color } = props;
  return (
    <div className={`card ${classname}`} onClick={onClick}>
      <div className="card-back card-face">
        <img src={Back} alt="background" className="card-back-img" />
      </div>
      <div className="card-front card-face">
        <Planet size={100} color={color} />
      </div>
    </div>
  );
};

export default card;
