import React, {useState, useContext} from "react";
import { useHistory } from "react-router-dom";
import {AccountContext} from "../lib/Accounts"

export default function Login() {

  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const history = useHistory()
  const {authenticate} = useContext(AccountContext)

  function login() {
      localStorage.setItem("usuario",email)
      authenticate(email,pass)
      .then(data  => {
        console.log("Logeado! ", data)
        alert("Login Exitoso!")
        history.push("/home")
      })
      .catch(err=>{
        console.error('Fallo el login );  ', err);
        alert("Fallo en el login")
      })
      

  }
  return (
    <div className="outer">
      <div className="inner">
    <form onSubmit={event=>event.preventDefault()}>
      <h3>Log in</h3>

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
          value = {pass}
          onChange={(event) => setPass(event.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={()=>login()}>
        Sign in
      </button>
      <p className="forgot-password text-right">
        Forgot <a href="#">password?</a>
      </p>
    </form>
    </div>
    </div>
  );
}
