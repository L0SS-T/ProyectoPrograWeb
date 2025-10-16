import './masVendidos.css'
import productos from "../../data/data";
import { useNavigate } from 'react-router-dom'


const masVendidos = () => {
    const navigate = useNavigate();

    let top12 = [];

    for (let i = 0; i < productos.length; i++) {
      const producto = productos[i];

      if (top12.length < 12) {
        top12.push(producto);
        top12.sort((a, b) => b.ventas - a.ventas);
      } else if (producto.ventas > top12[11].ventas) {
        top12[11] = producto;
        top12.sort((a, b) => b.ventas - a.ventas);
      }
    }

    const irADetalle = (id) => {
      navigate(`/producto/${id}`); 
    };

    return (
    <section className="masVendidos-section">
      <div className="masVendidos-encabezado">
        <div className="linea"></div>
        <h2>Los más vendidos del mes</h2>
        <p>Nuestras piezas más apreciadas, amadas por los conocedores</p>
      </div>

      <div className="masVendidos-productos">
        {top12.map((product) => (
          <div key={product.id} className="masVendidos-card" onClick={()=> irADetalle(product.id)}>
            <img src={product.image} alt={product.name} />
            <small>{product.category}</small>
            <h3>{product.name}</h3>
            <p className="masVendidos-price">{product.price}</p>
          </div>
        ))}
      </div>

      <button className="masVendidos-boton-ver" onClick={() => navigate('/productos')}>
        Ver todos los productos
      </button>
    </section>

    );
};

export default masVendidos;

