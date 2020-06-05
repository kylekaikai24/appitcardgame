import React from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";

// css
import "../Asset/css/scorebroad.css";

// icons
import Planet from "../Asset/svg/planet";
import Rocket from "../Asset/svg/rocket";

import Spinner from "../Asset/image/spinner.gif";

// Hooks & Context
import { useIsMobile } from "../Hooks/useIsMobile";
import { ShouldApiCallContext } from "../Context/shouldCallApiContext";

const Scorebroad = (props) => {
  // State
  const [tableData, setTableData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  // Hook & context
  const isMobile = useIsMobile();
  const context = React.useContext(ShouldApiCallContext);

  // function: handle fetch data from db and set to state
  const fetchData = async () => {
    const options = {
      method: "GET",
      headers: {
        "cache-control": "no-cache",
        "x-apikey": "260c55e44fcc603351421cc1b2c70921bdf32",
      },
      url:
        "https://cors-anywhere.herokuapp.com/https://ccbascappuat-cf19.restdb.io/rest/game-record",
    };
    try {
      const data = await axios(options);
      setIsLoading(false);
      let sortData = data.data;
      sortData.sort((a, b) => (b.score > a.score ? 1 : -1));
      setTableData(sortData);
      localStorage.setItem("rankingDataStorage", JSON.stringify(sortData));
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  /*
    Identify should api be called when component mounted
    If new rank is submitted in the game page, fetch new data from db
    If no new ranking, take data from localstorage and set data state
*/
  React.useEffect(() => {
    if (context.apiCall) {
      setIsLoading(true);
      fetchData();
    } else {
      const rankingDataStorage = localStorage.getItem("rankingDataStorage");
      if (rankingDataStorage === null) {
        setIsLoading(true);
        fetchData();
      } else if (Array.isArray(JSON.parse(rankingDataStorage))) {
        setTableData(JSON.parse(rankingDataStorage));
      }
    }
  }, []);

  return (
    <div className="scorebroad">
      <div className="nav">
        <Planet size={isMobile ? 50 : 70} color={"white"} />
        <span className="game-count">space rank</span>
        <Link to="/" onClick={() => context.setApiCall(false)}>
          <span className="to-scorebroad">
            <span className="to-scorebroad-text">game</span>
            <Rocket size={20} color={"white"} rotate={45} />
          </span>
        </Link>
      </div>
      <div className="table-container">
        <table className="rank-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td></td>
                <td>
                  <img
                    alt="spinner"
                    src={Spinner}
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td></td>
              </tr>
            ) : tableData && tableData.length > 0 ? (
              tableData.map((item, index) => (
                <tr key={`rank-${index}`}>
                  <td>{index + 1}</td>
                  <td>{item.playerName}</td>
                  <td>{item.score}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td></td>
                <td>No records</td>
                <td></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default withRouter(Scorebroad);
