import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserPool from "../lib/cognito";

export default function Register() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  function registro() {
    UserPool.signUp(email, pass, [], null, (err, data) => {
      if (err) {
        alert("Error ): \n" + err.message);
        console.error(err);
        return;
      }
      alert("Logeado!");
      console.log(data);
    });
  }

  return (
    <div className="outer">
      <div className="inner">
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <h3>Registro</h3>

          <div className="form-group">
            <label>Correo</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={pass}
              onChange={(event) => setPass(event.target.value)}
            />
          </div>
          <button
            className="btn btn-dark btn-lg btn-block"
            onClick={() => registro()}
          >
            Register
          </button>
          <Link to={"/home"}>
            <button type="submit" className="btn btn-dark btn-lg btn-block">
              Register
            </button>
          </Link>
          <p className="forgot-password text-right">
            Already registered <a href="#">log in?</a>
          </p>
        </form>
      </div>
    </div>
  );
}
