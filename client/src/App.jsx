import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./views/Landing/Landing";
// import Home from "./views/Home/Home";
// import Card from "./components/Card/Card"
// import CardsContainer from "./components/CardsContainer/CardsContainer";

const App = () => {
  return (
    <Router>
        
        <Route exact path="/">
          <Landing/>
        </Route>
        
      
    </Router>
  );
};

export default App;

