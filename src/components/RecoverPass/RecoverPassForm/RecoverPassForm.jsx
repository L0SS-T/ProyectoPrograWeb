import './RecoverPassForm.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../../context/AppContext";

const RecoverPassForm = () => {
  const {
    usuarioARecuperar,
    setUsuarioARecuperar,
    updateUserPasswordById
  } = useApp();

  const [form, setForm] = useState({
    nuevo: "",
    repetir: ""
  });

  const navigate = useNavigate();

  // Si intentan entrar sin haber pasado por Forgot, los saco
  useEffect(() => {
    if (!usuarioARecuperar) {
      navigate('/login');
    }
  }, [usuarioARecuperar, navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.nuevo !== form.repetir) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // ✅ Actualizar la contraseña de ese usuario específico
    updateUserPasswordById(usuarioARecuperar.id, form.nuevo);

    alert("Contraseña actualizada con éxito");

    // Limpiar usuarioARecuperar y redirigir
    setUsuarioARecuperar(null);
    navigate('/login');
  };

  return (
    <main>
      <div className="recoverBloque">
        <h2>Recuperar contraseña</h2>

        <form onSubmit={handleSubmit}>
          <label>Nueva Contraseña</label><br />
          <input
            type="password"
            placeholder="Contraseña"
            name="nuevo"
            value={form.nuevo}
            onChange={handleChange}
          />

          <label>Repetir Contraseña</label><br />
          <input
            type="password"
            placeholder="Contraseña"
            name="repetir"
            value={form.repetir}
            onChange={handleChange}
          />

          <button type="submit">Guardar</button>
        </form>
      </div>
    </main>
  );
};

export default RecoverPassForm;
