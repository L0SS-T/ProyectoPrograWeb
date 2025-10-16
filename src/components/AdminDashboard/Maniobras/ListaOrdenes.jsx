import React, { useState } from "react";
import { useApp } from "../../../context/AppContext";
import "./Maniobras.css";

const ListaOrdenes = ({ onVerDetalle }) => {
  const { ordenes, cancelarOrden } = useApp();
  const [busqueda, setBusqueda] = useState("");

  const filtradas = ordenes.filter((orden) =>
    orden.id.toString().includes(busqueda)
  );

  return (
    <div className="maniobra-container lista-ordenes">
      <h3 className="maniobra-title">Lista de Órdenes</h3>

      <input
        type="text"
        placeholder="Buscar por ID de orden..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="maniobra-buscador"
      />

      <table className="maniobra-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Entregado</th>
            <th>Cancelada</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtradas.map((orden) => (
            <tr key={orden.id}>
              <td>{orden.id}</td>
              <td>{new Date(orden.fecha).toLocaleString()}</td>
              <td>{orden.isEntregado ? "Sí" : "No"}</td>
              <td>{orden.isCancelada ? "Sí" : "No"}</td>
              <td className="maniobra-actions">
                <button
                  className="maniobra-button btn-secondary"
                  onClick={() => onVerDetalle(orden)}
                >
                  VER DETALLE
                </button>
                {!orden.isCancelada && (
                  <button
                    className="maniobra-button btn-danger"
                    onClick={() => cancelarOrden(orden.id)}
                    style={{ marginLeft: "5px" }}
                  >
                    CANCELAR
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaOrdenes;
