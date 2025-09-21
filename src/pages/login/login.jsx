import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import fiebtech from "../../assets/fiebtech2.png";
import logo from "../../assets/logo.png";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const apiUrl = "http://localhost:8080/api/gerenciadores/login"; // endpoint do backend

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // limpa erro

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senhaBase64: senha }) // envia email e senha
      });

      if (!res.ok) throw new Error("Erro na autenticação");

      const data = await res.json();

      if (!data || !data.id) {
        setError("Email ou senha incorretos");
        return;
      }

      // Login bem-sucedido
      sessionStorage.setItem("gerenciador", JSON.stringify(data));
      navigate("/inicio");

    } catch (err) {
      console.error(err);
      setError("Falha ao conectar com o servidor");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src={fiebtech} alt="FIEBTECH" className="left-image" />
        <div className="overlay"></div>
        <div className="overlay-text">
          <h1 className="fiebtech-text">FIEBTECH</h1>
          <h2>TOURS EDUCATIVOS</h2>
        </div>
      </div>
      <div className="login-right">
        <p className="admin-tag">#SouAdmin</p>
        <h3>Seja bem-vindo!</h3>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha..."
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          {error && <p className="error-msg">{error}</p>}
          <a href="#" className="forgot-link">Esqueceu a sua senha?</a>
          <button type="submit">Entrar</button>
        </form>
        <img src={logo} alt="logo" className="logo-image" />
        <footer className="login-footer"></footer>
      </div>
    </div>
  );
}
