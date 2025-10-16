import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewArrivals.css";
import { useApp } from "../../context/AppContext"; 

function Carrusel({ titulo, productos }) {
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
    <div className="carrusel">
      <h2>{titulo}</h2>
      <div className="carrusel-contenido">
        <button onClick={anterior}>⬅</button>

        <div key={indice} className="productos-arrivals">
          {visibles.map((item) => (
            <div key={item.id} className="producto-card" onClick={()=>irADetalle(item.id)}>
              <div className="imagen-container">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="info-producto">
                <h3>{item.name}</h3>
                <p>{item.category}</p>
                <span className="precio">{item.price}</span>
              </div>
            </div>
          ))}
        </div>

        <button onClick={siguiente}>➡</button>
      </div>
    </div>
  );
}

export default function NewArrivals() {
  const { productos } = useApp(); // <-- aquí sí dentro del componente

  // Los 6 ids más altos
  const ultimos6 = [...productos].sort((a, b) => b.id - a.id).slice(0, 6);

  return (
    <section className="new-arrivals">
      <div className="encabezado">
        <div className="linea"></div>
        <h2>Nuevos Productos</h2>
        <p>Recién añadidos a nuestra colección</p>
      </div>

      <Carrusel titulo="Nuevos Productos" productos={ultimos6} />
    </section>
  );
}
