import React from "react";

import "../Asset/css/modal.css";

const modal = (props) => {
  const { count, reGame, setFormData, value, showErrorMsg } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
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
              console.log(value);
            }}
          />
          <p className="remind-msg">
            *1-10 English or Chinese characters without symbol and space
          </p>
          {showErrorMsg && <p className="error-msg">Invalid name</p>}
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
