// src/pages/Auth/LoginForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from "../../../context/AppContext";
import './LoginForm.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useApp(); 

  const register = () => navigate('/registerForm');//


  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  //creada por Maricielo
  const [verPassword, setVerPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const loggedUser = login(correo, password);

    if (!loggedUser) {
      alert("Usuario o contraseña incorrecta!");
      return;
    }

    if (loggedUser.banned) {
      alert("Tu cuenta ha sido desactivada / baneada.");
      return; // no setea user ni localStorage
    }

    if (loggedUser.isAdmin) {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };



  return (
    <main className="login-container">
      <div className="login-box">
        <h2 className="login-title">Iniciar sesión</h2>
        <p className="login-subtitle">Accede a tu cuenta para continuar</p>

        <form className="login-form" onSubmit={handleLogin}>
          <label htmlFor="correo" className="login-label">Correo electrónico</label>
          <input
            type="email"
            id="correo"
            placeholder="usuario@gmail.com"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="login-input"
            required
          />

          <label htmlFor="password" className="login-label">Contraseña</label>
          <div className="password-box">
            <input
              type={verPassword ? "text" : "password"}
              id="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />
            <button
              type="button"
              onClick={() => setVerPassword(!verPassword)}
              className="show-password-btn"
            >
              {verPassword ? "No ver" : "Ver"}
            </button>
          </div>

          <div className="extras-box">
            <a href="/forgot-password" className="forgot-link">¿Olvidaste tu contraseña?</a>
          </div>

          <button type="submit" className="login-button">Iniciar sesión</button>
        </form>

        <div className="divider">
          <span>O continúa con</span>
        </div>

        <div className="social-buttons">
          <button type="button" className="social-btn">Google</button>
          <button type="button" className="social-btn">Apple</button>
        </div>

      {/*Registrarse*/}
        <div className="register-link">
          <p>¿No tienes cuenta? <a href="/register">Regístrate</a></p>
        </div>
      </div>
    </main>
  );
};

export default LoginForm;

