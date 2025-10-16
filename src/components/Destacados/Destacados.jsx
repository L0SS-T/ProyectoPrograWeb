import './Destacados.css'
import pulsera1 from '../../assets/pulseras.jpg'
import collar2 from '../../assets/collar2.jpg'
import anillo1 from '../../assets/anillo1.jpg'
import { useNavigate } from 'react-router-dom'

const categories = [
  {
    name: "Anillos",
    image: anillo1,
    description: "Timeless symbols of elegance"
  },
  {
    name: "Collares",
    image: collar2,
    description: "Grace and sophistication"
  },
  {
    name: "Pulseras",
    image: pulsera1,
    description: "Adorned wrist artistry"
  }
];

const Destacados = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoria) => {
    navigate('/productos', { state: { categoria } }); // 👈 enviamos la categoría seleccionada
  };

  return (
    <section className="dest-section">

      <div className="dest-header">
        <div className="dest-separator"></div>
        <h2 className="dest-title">Categorias destacadas</h2>
        <p className="dest-subtitle">Explora nuestras categorias</p>
      </div>

      <div className="dest-cards">
        {categories.map((category, index) => (
          <div
            key={index}
            className="dest-card"
            onClick={() => handleCategoryClick(category.name)} // 👈 click en la card
          >
            <div className="dest-img-container">
              <img src={category.image} alt={category.name} />
              <div className="dest-overlay"></div>
            </div>
            <div className="dest-info">
              <h3 className="dest-card-title">{category.name}</h3>
              <p className="dest-card-desc">{category.description}</p>
              <div className="dest-line"></div>
            </div>
          </div>
        ))}
      </div>

      <button className="dest-btn" onClick={() => navigate('/colecciones')}>
        Explorar todas
      </button>
    </section>
  );
};

export default Destacados;
