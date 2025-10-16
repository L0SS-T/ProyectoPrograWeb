import React, { useState } from "react";
import { useApp } from "../../../context/AppContext";
import "./Maniobras.css";

const ListaUsuarios = ({ onVerDetalle }) => {
  const { usuarios = [] } = useApp();
  const [filtro, setFiltro] = useState("");

  const usuariosFiltrados = usuarios.filter((u) =>
    u.nombre?.toLowerCase().includes(filtro.toLowerCase()) ||
    u.apellido?.toLowerCase().includes(filtro.toLowerCase()) ||
    u.id?.toString().includes(filtro)
  );

  return (
    <div className="maniobra-container">
      <h3>Lista de Usuarios</h3>

      <input
        className="maniobra-buscador"
        type="text"
        placeholder="Buscar por nombre, apellido o ID..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />

      <ul className="maniobra-list">
        {usuariosFiltrados.map((u) => (
          <li key={u.id}>
            <span>
              {u.nombre} {u.apellido} (ID: {u.id})
            </span>
            <button
              className="maniobra-button"
              onClick={() => onVerDetalle(u)}
            >
              Ver detalle
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaUsuarios;
