import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useApp } from "../../context/AppContext"; 
import "./ProductoDetalles.css";
import Carrito from "../Carrito/Carrito";

function ProductoDetalles() {
  const { id } = useParams();
  const { user, agregarAlCarrito, carrito, productos } = useApp(); // <-- extraemos productos del contexto

  // Buscar producto activo por id
  const producto = productos.find((p) => p.id === parseInt(id));

  if (!user) return <Navigate to="/login" replace />;
  if (!producto) return <h2>PÁGINA NO EXISTE</h2>;

  const [imagenSeleccionada, setImagenSeleccionada] = useState(producto.image);
  const [cantidad, setCantidad] = useState(1);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const manejarMiniaturaClick = (imagen) => setImagenSeleccionada(imagen);
  const manejarRotacion = () =>
    setImagenSeleccionada(prev => (prev === producto.image ? producto.simage : producto.image));

  const cambiarCantidad = (valor) =>
    setCantidad(prev => {
      const nuevaCantidad = prev + valor;
      if (nuevaCantidad < 1) return 1;
      if (nuevaCantidad > producto.stock) return producto.stock;
      return nuevaCantidad;
    });

  const handleAgregar = () => {
    if (cantidad > producto.stock) return alert("OUT OF STOCK");
    agregarAlCarrito(producto, cantidad); // <-- agregamos usando AppContext
    setMostrarCarrito(true);
  };

  return (
    <div className="producto-detalle-page">
      <div className="producto-detalle-container">
        <div className="producto-detalle-imagen">
          <div className="producto-imagen-wrapper">
            <img src={imagenSeleccionada} alt={producto.name} />
            <button onClick={manejarRotacion} className="rotar-boton izquierda">←</button>
            <button onClick={manejarRotacion} className="rotar-boton derecha">→</button>
          </div>

          <div className="producto-miniaturas">
            <img
              src={producto.image}
              alt="miniatura 1"
              onClick={() => manejarMiniaturaClick(producto.image)}
            />
            <img
              src={producto.simage}
              alt="miniatura 2"
              onClick={() => manejarMiniaturaClick(producto.simage)}
            />
          </div>

          <div className="trust-badges">
            <div>
              <span>🛡️</span>
              <p>Garantía de por vida</p>
            </div>
            <div>
              <span>🏅</span>
              <p>Certificado</p>
            </div>
            <div>
              <span>🚚</span>
              <p>Envío gratis</p>
            </div>
          </div>
        </div>

        <div className="producto-detalle-info">
          <p className="categoria">{producto.category}</p>
          <h1>{producto.name}</h1>
          <div className="precio">
            <span>{producto.price}</span>
            <span className="moneda">USD</span>
          </div>

          <div className="linea"></div>

          <p><strong>Tipo:</strong> {producto.type}</p>
          <p><strong>Descripción:</strong> {producto.description}</p>
          <p><strong>Stock:</strong> {producto.stock}</p>

          <div className="cantidad-controles">
            <button onClick={() => cambiarCantidad(-1)}>-</button>
            <span>{cantidad}</span>
            <button onClick={() => cambiarCantidad(1)}>+</button>
          </div>

          <button className="btn-agregar" onClick={handleAgregar}>
            Agregar al carrito
          </button>

          <div className="info-extra">
            <div>
              <span>Tiempo de producción</span>
              <span>2-3 semanas</span>
            </div>
          </div>
        </div>
      </div>

      <Carrito
        mostrar={mostrarCarrito}
        cerrarModal={() => setMostrarCarrito(false)}
      />
    </div>
  );
}

export default ProductoDetalles;
