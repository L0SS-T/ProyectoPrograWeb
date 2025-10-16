import React, { useState } from "react";
import { useApp } from "../../../context/AppContext";
import "./Maniobras.css";

const ListaProductos = ({ onAgregar }) => {
  const { productosAdmin = [], toggleActivoProducto } = useApp();
  const [filtro, setFiltro] = useState("");

  const filtrados = productosAdmin.filter(
    (p) =>
      p.nombre?.toLowerCase().includes(filtro.toLowerCase()) ||
      p.serie?.toLowerCase().includes(filtro.toLowerCase()) ||
      p.id?.toString().includes(filtro)
  );

  return (
    <div className="maniobra-container">
      <h3>Lista de Productos</h3>

      <input
        type="text"
        className="maniobra-buscador"
        placeholder="Buscar por nombre, serie o ID..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />

      <button className="maniobra-button" onClick={onAgregar}>
        Agregar Producto
      </button>

      <ul className="maniobra-list">
        {filtrados.map((p) => (
          <li key={p.id}>
            <span>
              {p.nombre} (ID: {p.id})
            </span>
            {p.isActive ? (
              <span>Activo</span>
            ) : (
              <span>Inactivo</span>
            )}
             <button
              className="maniobra-button"
              style={{ marginLeft: "10px" }}
              onClick={() => toggleActivoProducto(p.id)}
            >
              {p.isActive ? "Desactivar" : "Activar"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaProductos;
