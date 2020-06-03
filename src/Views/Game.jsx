import React from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import { instance } from "../Util/axiosInstance";

import "../Asset/css/game.css";

import Card from "../Components/card";
import Modal from "../Components/modal";

import Planet from "../Asset/svg/planet";
import Rocket from "../Asset/svg/rocket";

import { useShuffledData } from "../Data/data";

const Game = (props) => {
  const [initData, setInitData] = React.useState();
  const [isBusy, setIsBusy] = React.useState(false);
  const [matched, setMatched] = React.useState([]);
  const [cardToCheck, setCardToCheck] = React.useState({
    id: null,
    needCheck: false,
    index: null,
  });
  const [victory, setVictory] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const [formData, setFormData] = React.useState({
    playerName: "",
    score: count,
  });

  // shuffle data
  const data = useShuffledData();

  // set initial data to shuffled data when component mounted
  React.useEffect(() => {
    setInitData(data);
  }, []);

  // check winning status if matched array length is equal to the data length
  React.useEffect(() => {
    if (initData && matched.length === initData.length) {
      setVictory(true);
    }
  }, [matched]);

  const handleFlip = (index, card) => {
    const newData = [...initData];
    newData[index].isFlip = true;

    setInitData(newData);
    if (cardToCheck.needCheck) {
      checkForCardMatch(card.id, index);
    } else {
      const newData = { ...cardToCheck };
      newData.needCheck = true;
      newData.id = card.id;
      newData.index = index;
      setCardToCheck(newData);
    }
  };

  const checkForCardMatch = async (cardId, index) => {
    if (cardId === cardToCheck.id) {
      await cardMatch(cardId, cardToCheck.id, index);
      setMatched((prevState) => [...prevState, cardId, cardToCheck.id]);
    } else {
      console.log(index, cardToCheck.index);
      cardMismatch(index, cardToCheck.index);
    }
  };

  const cardMatch = (index) => {
    const newData = [...initData];
    newData[index].isMatch = true;
    newData[cardToCheck.index].isMatch = true;
    setCardToCheck({ id: null, needCheck: false, index: null });
    setCount((prevState) => prevState + 5);
  };

  const cardMismatch = (firstCardIndex, secondCardIndex) => {
    setIsBusy(true);
    setTimeout(() => {
      const newData = [...initData];
      newData[firstCardIndex].isFlip = false;
      newData[secondCardIndex].isFlip = false;
      setInitData(newData);
      setCardToCheck({ id: null, needCheck: false, index: null });
      setIsBusy(false);
    }, 1000);
    setCount((prevState) => prevState - 1);
  };

  const saveToDb = async (data) => {
    const options = {
      method: "POST",
      headers: {
        "cache-control": "no-cache",
        "x-apikey": "260c55e44fcc603351421cc1b2c70921bdf32",
      },
      data: data,
      url:
        "https://cors-anywhere.herokuapp.com/https://ccbascappuat-cf19.restdb.io/rest/game-record",
    };
    try {
      const data = await axios(options);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReGame = () => {
    saveToDb(formData);
    setInitData(data);
    setCount(0);
  };

  return (
    <div className="game-broad-wrapper">
      <div className="nav">
        <Planet size={70} color={"white"} />
        <span className="game-count">SCORE: {count}</span>
        <Link to="/scorebroad">
          <span className="to-scorebroad">
            <span className="to-scorebroad-text">scorebroad</span>
            <Rocket size={20} color={"white"} rotate={45} />
          </span>
        </Link>
      </div>
      <div className="game-broad">
        {initData &&
          initData.map((card, i) => (
            <div className="card-container">
              <Card
                classname={card.isFlip ? "visible" : ""}
                onClick={
                  isBusy
                    ? () => {}
                    : card.isMatch
                    ? () => {}
                    : () => handleFlip(i, card)
                }
                color={card.color}
              />
            </div>
          ))}
      </div>
      {victory && (
        <Modal
          count={count}
          setVictory={setVictory}
          reGame={handleReGame}
          value={formData}
          setFormData={setFormData}
        />
      )}
    </div>
  );
};

export default withRouter(Game);
