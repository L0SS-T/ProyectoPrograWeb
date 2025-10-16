import React, { useState } from "react";
import "./Catalogo.css";
import productos from "../../data/data";
import { useNavigate } from "react-router-dom";

function Carrusel({ titulo, productos, onNavigate }) {
  const [indice, setIndice] = useState(0);
  const total = productos.length;
  const navigate = useNavigate(); 

  const siguiente = () => setIndice((indice + 3) % total);
  const anterior = () => setIndice((indice - 3 + total) % total);

  const visibles = productos.slice(indice, indice + 3);
  if (visibles.length < 3) {
    visibles.push(...productos.slice(0, 3 - visibles.length));
  }

  const irADetalle = (id) => {
    navigate(`/producto/${id}`); 
  };

  return (
    <section className="catalogo-section">
      <div className="catalogo-section-header">
        <div>
          <h2 className="catalogo-section-title">{titulo}</h2>
        </div>
        <button
          className="catalogo-ver-todo-btn"
          onClick={() => onNavigate(titulo)}
        >
          Ver todo ➝
        </button>
      </div>

      <div className="catalogo-carrusel">
        <button className="catalogo-btn" onClick={anterior}>⬅</button>

        <div key={indice} className="catalogo-productos">
          {visibles.map((item) => (
            <div
              key={item.id}
              className="catalogo-producto-card"
              onClick={() => irADetalle(item.id)} // 👈 Igual que en VerProductos
            >
              <div className="catalogo-imagen-container">
                <img src={item.image} alt={item.name} />
                <div className="catalogo-overlay"></div>
              </div>
              <div className="catalogo-info-producto">
                <div className="catalogo-linea-dorada"></div>
                <h3>{item.name}</h3>
                <p>{item.category}</p>
                <span className="catalogo-precio">{item.price}</span>
              </div>
            </div>
          ))}
        </div>

        <button className="catalogo-btn" onClick={siguiente}>➡</button>
      </div>
    </section>
  );
}

export default function Catalogo() {
  const navigate = useNavigate();

  const lujo = productos.filter((p) => p.type === "de lujo");
  const artesanal = productos.filter((p) => p.type === "artesanal");
  const casual = productos.filter((p) => p.type === "casual");

  const irAProductos = (categoria) => {
    navigate(`/productos?categoria=${encodeURIComponent(categoria)}`);
  };

  return (
    <div className="catalogo-page">
      <div className="catalogo-header">
        <div className="catalogo-header-linea"></div>
        <span className="catalogo-header-tag">Explora</span>
        <div className="catalogo-header-linea"></div>
      </div>
      <h1 className="catalogo-titulo-principal">Nuestras Colecciones</h1>
      <p className="catalogo-subtitulo">
        Descubre nuestras piezas exclusivas organizadas por estilo y diseño.
      </p>

      <div className="catalogo">
        <Carrusel titulo="Colección de Lujo" productos={lujo} onNavigate={irAProductos} />
        <Carrusel titulo="Colección Artesanal" productos={artesanal} onNavigate={irAProductos} />
        <Carrusel titulo="Colección Casual" productos={casual} onNavigate={irAProductos} />
      </div>

      <div className="catalogo-cta">
        <h3>¿No encuentras lo que buscas?</h3>
        <p>Explora nuestro catálogo completo con filtros avanzados.</p>
        <button
          className="catalogo-cta-btn"
          onClick={() => navigate("/productos")}
        >
          Ver todos los productos ➝
        </button>
      </div>
    </div>
  );
}

