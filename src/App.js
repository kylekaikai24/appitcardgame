import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";

import Game from "../src/Views/Game";
import Scorebroad from "../src/Views/Scorebroad";

import { ShouldApiCallContext } from "./Context/shouldCallApiContext";

function App() {
  const [apiCall, setApiCall] = React.useState(true);
  const providerValue = React.useMemo(() => ({ apiCall, setApiCall }), [
    apiCall,
    setApiCall,
  ]);

  return (
    <Router basename="/appitcardgame/">
      <ShouldApiCallContext.Provider value={providerValue}>
        <Route exact path="/" component={Game} />
        <Route exact path="/scorebroad" component={Scorebroad} />
      </ShouldApiCallContext.Provider>
    </Router>
  );
}

export default App;
