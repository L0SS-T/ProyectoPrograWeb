import './ForgotPassForm.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../../context/AppContext';

const ForgotPassForm = () => {
  const navigate = useNavigate();
  const { usuarios, setUsuarioARecuperar } = useApp();
  const [correo, setCorreo] = useState('');

  const handleForgotPass = () => {
    const encontrado = usuarios.find(
      (u) => u.correo.toLowerCase() === correo.toLowerCase()
    );

    if (encontrado) {
      setUsuarioARecuperar(encontrado);   
      alert('Correo enviado (simulado)');
      navigate('/recover-password');
    } else {
      alert('Correo no registrado');
    }
  };

  return (
    <main className="forgot-container">
      <div className="forgot-box">
        <h2 className="forgot-title">Olvidé mi contraseña</h2>
        <p className="forgot-text">
          Se enviará un enlace a tu correo electrónico para validar tu identidad.
        </p>

        <label className="forgot-label">Correo</label><br />
        <input
          type="email"
          placeholder="usuario@gmail.com"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="forgot-input"
        />
        <br />
        <button onClick={handleForgotPass} className="forgot-button">
          Recuperar contraseña
        </button>
      </div>
    </main>
  );
};

export default ForgotPassForm;

