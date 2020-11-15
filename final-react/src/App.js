import React , {useState, useEffect, useContext}from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {Account, AccountContext} from "./lib/Accounts"
import { useHistory } from "react-router-dom";

import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import Hud from "./screens/Hud";

function App() {
  return (
    <Account>

      <Hud/>
    </Account>
  );
}

export default App;
