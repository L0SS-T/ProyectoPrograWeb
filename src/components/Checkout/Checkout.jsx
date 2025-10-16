// src/pages/Checkout/Checkout.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import "./Checkout.css";
import qrImagen from "../../assets/qr.png";
const Checkout = () => {
  const { user, carrito, confirmarOrden } = useApp();
  const navigate = useNavigate();

  const [direccion, setDireccion] = useState("");
  const [metodoEnvio, setMetodoEnvio] = useState("normal"); // "normal" o "express"
  const [metodoPago, setMetodoPago] = useState("tarjeta"); // "tarjeta" o "qr"
  const [datosPago, setDatosPago] = useState({ tarjeta: "", cvv: "", vencimiento: "" });

  if (!user) {
    navigate("/login");
    return null;
  }

  // subtotal calculado usando carrito[].price (string como "$47.00")
  const subtotal = carrito.reduce((acc, p) => {
    const precio = parseFloat(String(p.price || "").replace(/[^0-9.]/g, "")) || 0;
    return acc + precio * p.quantity;
  }, 0);

  const envio = metodoEnvio === "express" ? 25 : 0;
  const impuesto = +(subtotal * 0.08).toFixed(2);
  const total = +(subtotal + envio + impuesto).toFixed(2);

  const handleCompletarOrden = () => {
    if (!direccion) return alert("Ingrese la dirección de envío");
    if (metodoPago === "tarjeta" && (!datosPago.tarjeta || !datosPago.cvv || !datosPago.vencimiento)) {
      return alert("Complete los datos de la tarjeta");
    }

    // confirmarOrden ahora persiste y vacía el carrito
    const nuevaOrden = confirmarOrden(metodoPago, metodoEnvio, direccion);

    if (!nuevaOrden) {
      return alert("No se pudo crear la orden. Intenta nuevamente.");
    }

    alert("Orden completada 🎉");
    navigate("/"); // volver al home o a la página deseada
  };

  return (
    <div className="checkout-section">
      <button className="checkout-back" onClick={() => navigate(-1)}>← Volver al carrito</button>
      <h1 className="checkout-title">Checkout</h1>
      <p className="checkout-subtitle">Completa tu compra de forma segura</p>

      <div className="checkout-grid">
        {/* Columna izquierda */}
        <div className="checkout-form">
          {/* Dirección */}
          <div className="checkout-box">
            <h2>Dirección de envío</h2>
            <input
              type="text"
              placeholder="Dirección"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </div>

          {/* Método de envío */}
          <div className="checkout-box">
            <h2>Método de envío</h2>
            <div className="checkout-radio">
              <label>
                <input
                  type="radio"
                  name="envio"
                  value="normal"
                  checked={metodoEnvio === "normal"}
                  onChange={(e) => setMetodoEnvio(e.target.value)}
                />
                Envío estándar (Gratis)
              </label>
              <label>
                <input
                  type="radio"
                  name="envio"
                  value="express"
                  checked={metodoEnvio === "express"}
                  onChange={(e) => setMetodoEnvio(e.target.value)}
                />
                Envío express ($25.00)
              </label>
            </div>
          </div>

          {/* Método de pago */}
          <div className="checkout-box">
            <h2>Método de pago</h2>
            <div className="checkout-radio">
              <label>
                <input
                  type="radio"
                  name="pago"
                  value="tarjeta"
                  checked={metodoPago === "tarjeta"}
                  onChange={(e) => setMetodoPago(e.target.value)}
                />
                Tarjeta de crédito / débito
              </label>
              <label>
                <input
                  type="radio"
                  name="pago"
                  value="qr"
                  checked={metodoPago === "qr"}
                  onChange={(e) => setMetodoPago(e.target.value)}
                />
                Código QR
              </label>
            </div>

            {metodoPago === "tarjeta" && (
              <div className="pago-tarjeta">
                <input
                  type="text"
                  placeholder="Número de tarjeta"
                  value={datosPago.tarjeta}
                  onChange={(e) => setDatosPago({ ...datosPago, tarjeta: e.target.value })}
                />
                <div className="tarjeta-flex">
                  <input
                    type="text"
                    placeholder="CVV"
                    value={datosPago.cvv}
                    onChange={(e) => setDatosPago({ ...datosPago, cvv: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Vencimiento MM/AA"
                    value={datosPago.vencimiento}
                    onChange={(e) => setDatosPago({ ...datosPago, vencimiento: e.target.value })}
                  />
                </div>
              </div>
            )}

            {metodoPago === "qr" && (
              <div className="pago-qr">
                <img src={qrImagen} alt="Código QR" />
              </div>
            )}
          </div>
        </div>

        {/* Columna derecha - Resumen */}
        <div className="checkout-summary">
          <h2>Resumen del pedido</h2>
          <div className="checkout-items">
            {carrito.map((p) => (
              <div key={p.id} className="checkout-item">
                <div className="item-info">
                  <span>{p.name} x {p.quantity}</span>
                  <small>{p.category}</small>
                </div>
                <span>${(parseFloat(String(p.price).replace(/[^0-9.]/g, "")) * p.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <hr className="linea" />
          <div className="checkout-total-line">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="checkout-total-line">
            <span>Envío</span>
            <span>{envio === 0 ? "Gratis" : `$${envio.toFixed(2)}`}</span>
          </div>
          <div className="checkout-total-line">
            <span>Impuesto (8%)</span>
            <span>${impuesto.toFixed(2)}</span>
          </div>
          <hr className="linea" />
          <div className="checkout-total-line total">
            <strong>Total</strong>
            <strong>${total.toFixed(2)}</strong>
          </div>

          <button className="btn-completar" onClick={handleCompletarOrden}>
            Confirmar orden
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
