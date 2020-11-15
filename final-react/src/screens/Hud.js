import React , {useState, useEffect, useContext}from "react";
import "../App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {Account, AccountContext} from "../lib/Accounts"
import { useHistory } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import Home from "./Home";

function Hud() {
  const [status, setStatus] = useState(false);
  const { getSession , setSession} = useContext(AccountContext);
  const history = useHistory()


  useEffect(()=>{
    getSession()
    .then(session => {
      setStatus(true)
    })
  },[])

  function logout() {
    localStorage.clear();
    setSession()
    setStatus(false);
    history.push("/sign-in")
  }
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/sign-in"}>
              EF SO1 - Ricardo Menendez - 201602916
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">

              {!status && (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-in"}>
                    Sign in
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>
                    Sign up
                  </Link>
                </li>
              </ul>
              )}
              {status && (
                <Link to={"/sign-up"} className="navbar-nav ml-auto">
                  <button
                    className="btn btn-outline-danger my-2 my-sm-0"
                    type="submit"
                    onClick={() => logout()}
                  >
                    Cerrar Sesion
                  </button>
                </Link>
              )}
            </div>
          </div>
        </nav>

        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/sign-in" component={Login} />
          <Route path="/sign-up" component={Register} />
          <Route path="/home" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default Hud;
