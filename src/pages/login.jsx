import React from "react";
import "./login.css";
import fiebtech from "../assets/fiebtech2.png"; 
import logo from "../assets/logo.png"; // Importando a logo

export default function Login() {
  return (
    <div className="login-container">
      <div className="login-left">
        <img src={fiebtech} alt="FIEBTECH" className="left-image" />
        <div className="overlay"></div>

        {/* Overlay de texto */}
        <div className="overlay-text">
          <h1 className="fiebtech-text">FIEBTECH</h1>
          <h2>TOURS EDUCATIVOS</h2>
        </div>
      </div>
      <div className="login-right">
        <p className="admin-tag">#SouAdmin</p>
        <h3>Seja bem vindo!</h3>

        <form className="login-form">
          <input type="email" placeholder="Email..." />
          <input type="password" placeholder="Senha..." />
          <a href="#" className="forgot-link">
            Esqueceu a sua senha?
          </a>
          <button type="submit">Entrar</button>
        </form>
        <img src={logo} alt="logo" className="logo-image" />
        <footer className="login-footer">
        </footer>
      </div>
    </div>
  );
}