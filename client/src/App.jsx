import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./views/Landing/Landing";
import Home from "./views/Home/Home";
import Detail from "./views/Detail/Detail";
import Form from "./views/Form/Form";

const App = () => {
  return (
    <Router>
        <Route exact path="/">
          <Landing/>
        </Route>
        <Route exact path="/home">
          <Home/> 
        </Route>
        <Route exact path="/home/:id" component={Detail}/>
        <Route exact path="/form" >
          <Form/>
        </Route>
    </Router>
  );
};

export default App;

