import './NewCollections.css';
import { useNavigate } from "react-router-dom";
import productos from "../../data/data";

const NewCollections = () => {
  const navigate = useNavigate();

  // Filtramos solo productos que tengan type
  const productosConColeccion = productos.filter(p => p.type && p.type.trim() !== "");

  // Obtenemos solo 1 producto por cada tipo de colección
  const coleccionesUnicas = [];
  const tiposVistos = new Set();

  for (const p of productosConColeccion) {
    if (!tiposVistos.has(p.type)) {
      coleccionesUnicas.push(p);
      tiposVistos.add(p.type);
    }
    if (coleccionesUnicas.length === 3) break; // solo 3 colecciones
  }

  return (
    <section className="new-collections">
      <div className="encabezado">
        <div className="linea"></div>
        <h2>Nuevas Colecciones</h2>
        <p>Introducing our latest series of exceptional jewelry</p>
      </div>

      <div className="colecciones-grid">
        {coleccionesUnicas.map((col) => (
          <div key={col.id} className="coleccion-card">
            <div className="imagen">
              <img src={col.simage} alt={col.name} />
            </div>

            <div className="info">
              <p className="subtitulo">{col.category}</p>
              <h3>{col.name}</h3>
              <p className="descripcion">COLECCIÓN {col.type}</p>
              <button
                className="boton-descubrir"
                onClick={() => navigate("/colecciones")}
              >
                Descubre más →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewCollections;
