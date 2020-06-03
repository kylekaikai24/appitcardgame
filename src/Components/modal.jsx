import React from "react";

import "../Asset/css/modal.css";

const modal = (props) => {
  const { count, setVictory, reGame, setFormData, value } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    setVictory(false);
    reGame();
  };
  return (
    <div className="overlay">
      <div className="modal-body">
        <p className="congrat-msg">congratulations!</p>
        <p className="modal-score">your score is {count}</p>
        <form>
          <input
            type="text"
            placeholder="input your name to check your ranking"
            className="modal-name-input"
            value={value.playerName}
            onChange={(e) => {
              setFormData({ ...value, playerName: e.target.value });
            }}
          />
          <input
            type="submit"
            value="Submit"
            onClick={handleSubmit}
            className="modal-submit"
          />
        </form>
      </div>
    </div>
  );
};

export default modal;
