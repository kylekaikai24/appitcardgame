import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Game from "../src/Views/Game";
import Scorebroad from "../src/Views/Scorebroad";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Game} />
      <Route exact path="/scorebroad" component={Scorebroad} />
    </Router>
  );
}

export default App;
