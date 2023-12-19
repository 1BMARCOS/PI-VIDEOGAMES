import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./views/Landing/Landing";
import Home from "./views/Home/Home";

const App = () => {
  return (
    <Router>
        <Route exact path="/">
          <Landing/>
        </Route>
        <Route exact path="/home">
          <Home/> 
        </Route>    
    </Router>
  );
};

export default App;

