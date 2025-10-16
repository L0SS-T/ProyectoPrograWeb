import React from "react";
import { useApp } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import "./ListadoOrdenes.css";

const ListadoOrdenes = () => {
  const { 
    user, 
    ordenes, 
    guardarParaDespues, 
    cancelarOrden, 
    quitarParaDespues, 
    agregarAlCarrito 
  } = useApp();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  const misOrdenes = ordenes.filter((o) => o.userId === user.id);

  const moverAlCarrito = (producto) => {
    agregarAlCarrito(producto, producto.quantity || 1);
    quitarParaDespues(producto.id);
  };

  return (
    <div className="ordenes-container">
      <h2>Mis Órdenes</h2>
      {misOrdenes.length ? (
        misOrdenes.map((orden) => (
          <div
            key={orden.id}
            className={`orden-card ${orden.isCancelada ? "orden-cancelada" : ""}`}
          >
            <p><strong>ID de Orden:</strong> {orden.id}</p>
            <p><strong>Fecha:</strong> {new Date(orden.fecha).toLocaleString()}</p>
            <p><strong>Método de pago:</strong> {orden.metodoPago}</p>
            <p><strong>Método de envío:</strong> {orden.metodoEnvio}</p>
            <p><strong>Estado:</strong>{" "}
              {orden.isCancelada ? "Cancelada" : "Activa"}
            </p>

            <p><strong>Productos:</strong></p>
            <ul>
              {orden.productos.map((p) => (
                <li key={p.id}>
                  Producto ID: {p.id}, Cantidad: {p.quantity}
                </li>
              ))}
            </ul>

            {!orden.isCancelada && (
              <button
                className="btn-cancelar-orden"
                onClick={() => cancelarOrden(orden.id)}
              >
                Cancelar orden
              </button>
            )}
          </div>
        ))
      ) : (
        <p>No tienes órdenes aún.</p>
      )}

      <h2>Guardados para después</h2>
      {guardarParaDespues.length ? (
        <div className="guardar-despues-container">
          <ul>
            {guardarParaDespues.map((p) => (
              <li key={p.id} className="guardar-despues-item">
                {p.name} — Cantidad: {p.quantity || 1}
                <div className="acciones-guardar">
                  <button
                    className="btn-mover-carrito"
                    onClick={() => moverAlCarrito(p)}
                  >
                    Mover al carrito
                  </button>
                  <button
                    className="btn-eliminar-guardar"
                    onClick={() => quitarParaDespues(p.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No tienes productos guardados para después.</p>
      )}
    </div>
  );
};

export default ListadoOrdenes;
