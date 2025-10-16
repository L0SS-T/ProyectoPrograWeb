import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../../context/AppContext";  
import "./VerProductos.css";

const VerProductos = () => {
  const { productos, categorias } = useApp();        
  const [orden, setOrden] = useState("");
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleCategoria = (categoria) => {
    setCategoriasSeleccionadas((prev) =>
      prev.includes(categoria)
        ? prev.filter((c) => c !== categoria)
        : [...prev, categoria]
    );
  };

  const irADetalle = (id) => {
    navigate(`/producto/${id}`);
  };

  // Capturamos la categoría enviada desde Destacados - se dio click en Destacados y que aparezca ya filtrado
  useEffect(() => {
    if (location.state?.categoria) {
      setCategoriasSeleccionadas([location.state.categoria]);
    }
  }, [location.state]);

  useEffect(() => {
    const handleClickFuera = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMostrarMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickFuera);
    return () => document.removeEventListener("mousedown", handleClickFuera);
  }, []);

  // ===== FILTRAR POR CATEGORÍAS =====
  let productosFiltrados =
    categoriasSeleccionadas.length > 0
      ? productos.filter((p) => categoriasSeleccionadas.includes(p.category))
      : productos;

  // ===== ORDENAR =====
  if (orden === "precio") {
    productosFiltrados.sort(
      (a, b) =>
        parseFloat(a.price.replace("$", "")) -
        parseFloat(b.price.replace("$", ""))
    );
  } else if (orden === "nombre") {
    productosFiltrados.sort((a, b) => a.name.localeCompare(b.name));
  }

  //======LIMPIAR FILTROS =====
  const limpiarFiltros = () => {
    setCategoriasSeleccionadas([]);
    setOrden("");
  };

  const categoriasDisponibles = categorias || [];

  return (
    <section className="productos-section">
      <div className="productos-header">
        <div className="productos-titulo">
          <div className="linea"></div>
          <span>Shop</span>
          <div className="linea"></div>
        </div>
        <h1>Todos los productos</h1>
        <p>Explora nuestra colección completa de joyas</p>
      </div>

      <div className="productos-layout">
        <aside className="sidebar">
          <div className="sidebar-box">
            <div className="sidebar-header">
              <h3>Filtros</h3>
              {(categoriasSeleccionadas.length > 0 || orden) && (
                <button className="clear-btn" onClick={limpiarFiltros}>
                  Limpiar
                </button>
              )}
            </div>

            <div className="sidebar-section">
              <p className="sidebar-label">Categorías</p>
              <hr />
              <div className="sidebar-list">
                {categoriasDisponibles.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => toggleCategoria(cat)}
                    className={`sidebar-item ${
                      categoriasSeleccionadas.includes(cat) ? "active" : ""
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="sidebar-section">
              <p className="sidebar-label">Ordenar por</p>
              <hr />
              <select
                value={orden}
                onChange={(e) => setOrden(e.target.value)}
                className="orden-select"
              >
                <option value="">Seleccionar</option>
                <option value="precio">Precio</option>
                <option value="nombre">Nombre</option>
              </select>
            </div>
          </div>
        </aside>

        <div className="productos-contenido">
          <div className="productos-contador">
            Mostrando {productosFiltrados.length}{" "}
            {productosFiltrados.length === 1 ? "producto" : "productos"}
          </div>

          {productosFiltrados.length > 0 ? (
            <div className="productos-grid">
              {productosFiltrados.map((p) => (
                <div
                  key={p.id}
                  className="producto-card fade-in"
                  onClick={() => irADetalle(p.id)}
                >
                  <div className="producto-img-container">
                    <img src={p.image} alt={p.name} />
                  </div>
                  <div className="producto-info">
                    <small>{p.category}</small>
                    <h3>{p.name}</h3>
                    <p className="price">{p.price}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="productos-vacios">
              <p>No se encontraron productos</p>
              <button onClick={limpiarFiltros} className="clear-btn">
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VerProductos;
