import React from "react";
import { useNavigate } from "react-router-dom";
import "./Carrito.css";
import { useApp } from "../../context/AppContext";

const Carrito = ({ mostrar, cerrarModal }) => {
  const { carrito, quitarDelCarrito, agregarParaDespues } = useApp();
  const navigate = useNavigate();

  if (!mostrar) return null;

  const subtotal = carrito.reduce((acc, p) => {
    const precio = parseFloat(p.price.replace(/[^0-9.]/g, "")) || 0;
    return acc + precio * p.quantity;
  }, 0);

  const irCheckout = () => {
    cerrarModal();
    navigate("/checkout");
  };

  return (
    <div className="carrito-modal">
      <div className="carrito-contenido">
        {/* Header */}
        <div className="carrito-header">
          <h3>🛒 Tu carrito</h3>
          <button className="cerrar-x" onClick={cerrarModal}>
            &times;
          </button>
        </div>

        {carrito.length === 0 ? (
          <div className="carrito-vacio">
            <div className="icono-vacio">👜</div>
            <p>Tu carrito está vacío</p>
            <button className="seguir-btn" onClick={cerrarModal}>
              Seguir comprando
            </button>
          </div>
        ) : (
          <>
            {/* Lista de productos */}
            <div className="carrito-lista">
              {carrito.map((p) => (
                <div key={p.id} className="carrito-item">
                  <div className="carrito-img-container">
                    <img src={p.image} alt={p.name} className="carrito-img" />
                  </div>
                  <div className="carrito-info">
                    <div className="carrito-item-header">
                      <h4>{p.name}</h4>
                      <button
                        className="eliminar-btn"
                        onClick={() => quitarDelCarrito(p.id)}
                      >
                        ✕
                      </button>
                    </div>
                    <p className="carrito-categoria">{p.category}</p>
                    <div className="carrito-detalle">
                      <span className="carrito-cantidad">
                        Cantidad: {p.quantity}
                      </span>
                      <span className="carrito-precio">{p.price}</span>
                    </div>
                    <div className="carrito-acciones">
                      <button
                        onClick={() => quitarDelCarrito(p.id)}
                        className="accion-btn eliminar"
                      >
                        Quitar
                      </button>
                      <button
                        onClick={() => agregarParaDespues(p)}
                        className="accion-btn guardar"
                      >
                        Guardar para después
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="carrito-footer">
              <div className="carrito-resumen">
                <div className="resumen-linea">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="resumen-linea">
                  <span>Envío</span>
                  <span className="envio-texto">Gratis</span>
                </div>
                <hr className="resumen-separador" />
                <div className="resumen-total">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>

              <button className="confirmar-btn" onClick={irCheckout}>
                Ir a Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Carrito;

