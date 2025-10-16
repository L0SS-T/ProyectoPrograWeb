import React from "react";
import { useApp } from "../../../context/AppContext";
import "./Maniobras.css";

const DetalleOrden = ({ orden, onVolver }) => {
  const { toggleEstadoOrden, cancelarOrden, productosAdmin } = useApp();

  if (!orden) return <p>No se ha seleccionado ninguna orden.</p>;

  // Mapear los productos de la orden con sus nombres
  const productosConNombre = orden.productos.map((item) => {
    const prod = productosAdmin.find((p) => p.id === item.id);
    return {
      id: item.id,
      name: prod ? prod.name : "Producto eliminado",
      quantity: item.quantity,
    };
  });

  return (
    <div className="detalle-orden">
      <h3>Detalle de Orden #{orden.id}</h3>

      <p><strong>Usuario ID:</strong> {orden.userId}</p>
      <p><strong>Fecha:</strong> {new Date(orden.fecha).toLocaleString()}</p>
      <p><strong>Método de pago:</strong> {orden.metodoPago}</p>
      <p><strong>Método de envío:</strong> {orden.metodoEnvio}</p>
      <p><strong>Dirección:</strong> {orden.direccion}</p>

      <p><strong>Subtotal:</strong> ${orden.subtotal}</p>
      <p><strong>Impuesto:</strong> ${orden.impuesto}</p>
      <p><strong>Envío:</strong> ${orden.envio}</p>
      <p><strong>Total:</strong> ${orden.total}</p>

      <p>
        <strong>Entregado:</strong>{" "}
        {orden.isEntregado ? "Sí" : "No"}
      </p>

      <p>
        <strong>Cancelada:</strong>{" "}
        {orden.isCancelada ? "Sí" : "No"}
      </p>

      <div>
        <strong>Productos:</strong>
        <ul>
          {productosConNombre.map((p) => (
            <li key={p.id}>
              {p.name} — Cantidad: {p.quantity}
            </li>
          ))}
        </ul>
      </div>

      {/* Botón para entregar / desentregar */}
      <button onClick={() => toggleEstadoOrden(orden.id)}>
        {orden.isEntregado ? "Marcar como NO entregado" : "Marcar como ENTREGADO"}
      </button>

      {/* Botón para cancelar (solo si no está cancelada) */}
      {!orden.isCancelada && (
        <button onClick={() => cancelarOrden(orden.id)}>
          Cancelar orden
        </button>
      )}

      <button onClick={onVolver}>
        Volver
      </button>
    </div>
  );
};

export default DetalleOrden;
