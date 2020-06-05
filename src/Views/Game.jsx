import React from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";

// components
import Card from "../Components/card";
import Modal from "../Components/modal";

// css
import "../Asset/css/game.css";

// icons
import Planet from "../Asset/svg/planet";
import Rocket from "../Asset/svg/rocket";

// Utils & Custom Hooks & Context
import { useShuffledData } from "../Data/data";
import { useIsMobile } from "../Hooks/useIsMobile";
import { UseRegex } from "../Util/useRegex";
import { ShouldApiCallContext } from "../Context/shouldCallApiContext";

const Game = (props) => {
  // State
  const [initData, setInitData] = React.useState();
  const [isBusy, setIsBusy] = React.useState(false);
  const [matched, setMatched] = React.useState([]);
  const [cardToCheck, setCardToCheck] = React.useState({
    id: null,
    needCheck: false,
    index: null,
  });
  const [victory, setVictory] = React.useState(false);
  const [countScore, setCount] = React.useState(0);
  const [formData, setFormData] = React.useState({
    playerName: "",
    score: 0,
  });
  const [showErrorMsg, setShowErrorMsg] = React.useState(false);

  // check mobile size
  const isMobile = useIsMobile();

  // shuffle data
  const data = useShuffledData();

  // input context
  const context = React.useContext(ShouldApiCallContext);

  /* 
    Get data from localstorage when component mount, if no localstorage then init new data
    set initial data to shuffled data when component mounted
*/
  React.useEffect(() => {
    const localStorageGameData = localStorage.getItem("gameDataStorage");
    const localStorageGameScore = localStorage.getItem("gameScoreStorage") || 0;
    const localStorageCardToCheck = localStorage.getItem(
      "cardToCheckStorage"
    ) || { id: null, needCheck: false, index: null };
    const localStorageMatchedSet =
      localStorage.getItem("gameDataMatchedStorage") || [];

    if (localStorageGameData !== null) {
      setInitData(JSON.parse(localStorageGameData));
      setCount(parseInt(localStorageGameScore));
      setCardToCheck(JSON.parse(localStorageCardToCheck));
      setMatched(JSON.parse(localStorageMatchedSet));
    } else {
      setInitData(data);
    }
  }, []);

  // check winning status if matched array length is equal to the data length
  React.useEffect(() => {
    if (initData && matched.length === initData.length) {
      setVictory(true);
    }
  }, [matched]);

  // handle form data change
  React.useEffect(() => {
    setFormData((prevState) => ({ ...prevState, score: countScore }));
  }, [countScore]);

  /* 
    Flip card function 
    1.) identify fliped card
    2.) if card to check then check if two cards match
    3.) no match => change card isFlip status back to false
    4.) is match => push to matched array
*/
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
      await cardMatch(index);
      setMatched((prevState) => [...prevState, cardId, cardToCheck.id]);
    } else {
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

  // handle game data store to localstorage when changing to other page
  const handleStoreGameDataToLocalStorage = () => {
    localStorage.setItem("gameDataStorage", JSON.stringify(initData));
    localStorage.setItem("cardToCheckStorage", JSON.stringify(cardToCheck));
    localStorage.setItem("gameScoreStorage", countScore);
    localStorage.setItem("gameDataMatchedStorage", JSON.stringify(matched));
  };

  // API call: save data to restdb.io
  // const saveToDb = async (data) => {
  //   const checkPlayerName = UseRegex(data.playerName);
  //   console.log(checkPlayerName);
  //   if (checkPlayerName) {
  //     const options = {
  //       method: "POST",
  //       headers: {
  //         "cache-control": "no-cache",
  //         "x-apikey": "260c55e44fcc603351421cc1b2c70921bdf32",
  //       },
  //       data: data,
  //       url:
  //         "https://cors-anywhere.herokuapp.com/https://ccbascappuat-cf19.restdb.io/rest/game-record",
  //     };
  //     try {
  //       const data = await axios(options);
  //       setCount(0);
  //       setShowErrorMsg(false);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } else {
  //     console.log(checkPlayerName, data.playerName);
  //     setShowErrorMsg(true);
  //   }
  // };

  /*
    handle re-game, after player submitted their name 
    remove all localstorage regarding the game status
    set all states to initial value
*/
  const handleReGame = () => {
    // saveToDb(formData);

    const checkPlayerName = UseRegex(formData.playerName);
    console.log(checkPlayerName);
    if (checkPlayerName) {
      const options = {
        method: "POST",
        headers: {
          "cache-control": "no-cache",
          "x-apikey": "260c55e44fcc603351421cc1b2c70921bdf32",
        },
        data: formData,
        url:
          "https://cors-anywhere.herokuapp.com/https://ccbascappuat-cf19.restdb.io/rest/game-record",
      };
      try {
        const data = await axios(options);
        setCount(0);
        setShowErrorMsg(false);

        localStorage.removeItem("gameDataStorage");
        localStorage.removeItem("gameScoreStorage");
        localStorage.removeItem("cardToCheckStorage");
        localStorage.removeItem("gameDataMatchedStorage");
        context.setApiCall(true);
        setVictory(false);
        setInitData(data);
        setMatched([]);
        setCardToCheck({
          id: null,
          needCheck: false,
          index: null,
        });

      } catch (error) {
        console.log(error);
      }
    } else {
      console.log(checkPlayerName, data.playerName);
      setShowErrorMsg(true);
    }
  };

  return (
    <div className="game-broad-wrapper">
      <div className="nav">
        <Planet size={isMobile ? 50 : 70} color={"white"} />
        <span className="game-count">SCORE: {countScore}</span>
        <Link to="/scorebroad" onClick={handleStoreGameDataToLocalStorage}>
          <span className="to-scorebroad">
            <span className="to-scorebroad-text">scorebroad</span>
            <Rocket size={20} color={"white"} rotate={45} />
          </span>
        </Link>
      </div>
      <div className="game-broad">
        {initData &&
          initData.map((card, i) => (
            <div className="card-container" key={`card-${i}`}>
              <Card
                classname={card.isFlip ? "visible" : ""}
                onClick={
                  isBusy
                    ? () => { }
                    : card.isMatch
                      ? () => { }
                      : () => handleFlip(i, card)
                }
                color={card.color}
              />
            </div>
          ))}
      </div>
      {victory && (
        <Modal
          count={countScore}
          reGame={handleReGame}
          value={formData}
          setFormData={setFormData}
          showErrorMsg={showErrorMsg}
        />
      )}
    </div>
  );
};

export default withRouter(Game);
