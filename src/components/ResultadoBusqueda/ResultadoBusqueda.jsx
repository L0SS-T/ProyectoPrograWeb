import { useParams, Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext"; // IMPORTAR CONTEXTO
import Noexiste from "../Noexiste/Noexiste";
import "./ResultadoBusqueda.css";

function ResultadoBusqueda() {
  const { termino } = useParams();
  const navigate = useNavigate();
  const { productos } = useApp(); // USAR PRODUCTOS DEL CONTEXTO
  const query = (termino || "").toLowerCase();

  const resultados = (productos || []).filter((p) => {
    if (!p || !p.name) return false;
    return (
      p.name.toLowerCase().includes(query) ||
      (p.category && p.category.toLowerCase().includes(query)) ||
      (p.type && p.type.toLowerCase().includes(query))
    );
  });

  if (resultados.length === 0) {
    return <Noexiste termino={termino} />;
  }

  const irADetalle = (id) => {
    navigate(`/producto/${id}`);
  };

  return (
    <div className="resultado-container">
      <div id = "volverrr">
        <Link to="/">← Volver al inicio</Link>
      </div>

      <h2>Resultados para: "{termino}"</h2>

      <div className="grid-resultados">
        {resultados.map((p) => (
          <div
            key={p.id}
            className="producto-card"
            onClick={() => irADetalle(p.id)}
          >
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p>{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultadoBusqueda;
