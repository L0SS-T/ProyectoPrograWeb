import React from "react";
import { useApp } from "../../../context/AppContext";
import "./Maniobras.css";

const DetalleUsuario = ({ usuario, onVolver }) => {
  const { ordenes = [], desactivarUsuario, activarUsuario } = useApp();

  if (!usuario) return <p>Usuario no seleccionado</p>;

  const ordenesUsuario = ordenes
    .filter((o) => o.userId === usuario.id)
    .slice(0, 10);

  const handleDesactivar = () => {
    if (window.confirm("¿Seguro que deseas desactivar este usuario?")) {
      desactivarUsuario(usuario.id);
      alert("Usuario desactivado");
    }
  };
  const handleActivar = () => {
    activarUsuario(usuario.id);
  };

  return (
    <div className="maniobra-container">
      <h3>Detalle de Usuario</h3>

      <div className="maniobra-info">
        <p><strong>ID:</strong> {usuario.id}</p>
        <p><strong>Nombre:</strong> {usuario.nombre} {usuario.apellido}</p>
        <p><strong>Correo:</strong> {usuario.correo}</p>
        <p><strong>Estado:</strong> {usuario.isActive ? "Activo" : "Inactivo"}</p>
      </div>

      <h4>Órdenes recientes:</h4>
      {ordenesUsuario.length ? (
        <ul className="maniobra-list">
          {ordenesUsuario.map((orden) => (
            <li key={orden.id}>
              <span>
                Orden #{orden.id} - {new Date(orden.fecha).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tiene órdenes.</p>
      )}

      <button onClick={onVolver}>
        Volver
      </button>

      {usuario.isActive && (
        <button id = "desactivarrr" onClick={handleDesactivar}>
          Desactivar Usuario
        </button>
      )}
      {!usuario.isActive && (
        <button id = "desactivarrr" onClick={handleActivar}>
          Activar Usuario
        </button>
      )}
    </div>
  );
};

export default DetalleUsuario;
