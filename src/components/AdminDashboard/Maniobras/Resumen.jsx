import React, { useState } from "react";
import { useApp } from "../../../context/AppContext";
import "./Maniobras.css";

const Resumen = () => {
  const { ordenes = [], usuarios = [] } = useApp();

  const hoy = new Date().toISOString().split("T")[0];
  const [fechaInicio, setFechaInicio] = useState(hoy);
  const [fechaFin, setFechaFin] = useState(hoy);

  // Filtrar órdenes por rango de fecha (inclusive)
  const ordenesFiltradas = (ordenes || []).filter((orden) => {
    const fechaOrden = new Date(orden.fecha).toISOString().split("T")[0];
    return fechaOrden >= fechaInicio && fechaOrden <= fechaFin;
  });

  const totalOrdenes = ordenesFiltradas.length;
  const nuevosUsuarios = usuarios.length; // Ahora sí cuenta todos los usuarios
  const ingresosTotales = ordenesFiltradas.reduce(
    (acc, orden) => acc + (Number(orden.total) || 0),
    0
  );

  return (
    <div className="maniobra-container">
      <h3>Resumen</h3>

      {/* Filtros de fecha */}
      <form className="maniobra-form" onSubmit={(e) => e.preventDefault()}>
        <div className="maniobra-flex">
          <div className="maniobra-field">
            <label>Desde</label>
            <input
              type="date"
              className="maniobra-buscador"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
          </div>

          <div className="maniobra-field">
            <label>Hasta</label>
            <input
              type="date"
              className="maniobra-buscador"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
            />
          </div>
        </div>
      </form>

      {/* Información resumen */}
      <div className="maniobra-info m-top">
        <p><strong>Órdenes:</strong> {totalOrdenes}</p>
        <p><strong>Usuarios nuevos:</strong> {nuevosUsuarios}</p>
        <p><strong>Ingresos:</strong> ${ingresosTotales.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Resumen;
