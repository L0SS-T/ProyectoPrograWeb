import { useState } from "react";
import { useApp } from "../../../context/AppContext";
import "./Maniobras.css";

const AdminCategorias = () => {
  const { categorias, agregarCategoria, eliminarCategoria } = useApp();
  const [nuevaCategoria, setNuevaCategoria] = useState("");

  const handleAgregar = () => {
    agregarCategoria(nuevaCategoria);
    setNuevaCategoria("");
  };

  return (
    <div className="maniobra-container">
      <h3>Gestionar categorías</h3>

      <div className="maniobra-form">
        <label>Nueva categoría</label>
        <input
          type="text"
          placeholder="Ej: Pulseras"
          value={nuevaCategoria}
          onChange={(e) => setNuevaCategoria(e.target.value)}
        />
        <button className="maniobra-button" onClick={handleAgregar}>
          Agregar
        </button>
      </div>

      <ul className="maniobra-list">
        {categorias.map((cat) => (
          <li key={cat}>
            {cat}
            <button onClick={() => eliminarCategoria(cat)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCategorias;
