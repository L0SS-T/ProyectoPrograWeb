import './AcercaNosotros.css';

export default function AcercaNosotros() {
  return (
    <section className="about-section">

      <div className="about-hero">
        <div className="about-hero-overlay">
          <div className="about-hero-text">
            <h1>Sobre Nosotros</h1>
            <p>Elegancia atemporal creada con pasión</p>
          </div>
        </div>
      </div>

      <div className="about-container">
        <div className="about-content">

          <div className="about-block">
            <h2>Nuestra Historia</h2>
            <p>
              Fundada con la visión de redefinir la joyería de lujo, nuestra marca representa 
              la fusión perfecta entre elegancia atemporal y minimalismo contemporáneo.
            </p>
            <p>
              Cada pieza de nuestra colección cuenta una historia de dedicación, detalle 
              y artesanía excepcional. Creemos que el verdadero lujo se encuentra en 
              la sutileza de los detalles.
            </p>
          </div>


          <div className="about-block">
            <h2>Nuestros Valores</h2>
            <div className="about-values">
              <div className="value-item">
                <div>
                  <h3>Artesanía Excepcional</h3>
                  <p>
                    Cada pieza es elaborada a mano por artesanos expertos, 
                    cuidando cada detalle.
                  </p>
                </div>
              </div>

              <div className="value-item">
                <div>
                  <h3>Diseño Atemporal</h3>
                  <p>
                    Creamos piezas que trascienden tendencias, 
                    manteniendo su elegancia generación tras generación.
                  </p>
                </div>
              </div>

              <div className="value-item">
                <div>
                  <h3>Lujo Sostenible</h3>
                  <p>
                    Trabajamos de forma responsable, respetando el planeta 
                    y creando belleza duradera.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="about-visit">
          <div className="visit-card">
            <h2>Visítanos</h2>
            <p className="visit-subtitle">
              Descubre nuestra colección en nuestra boutique principal
            </p>

            <hr />

            <div className="visit-info">
              <p><strong>Dirección:</strong><br/>
              Calle Palominmo, Galeria 1283<br/>
              Miraflores</p>

              <p><strong>Horario:</strong><br/>
              Lunes a Viernes: 10:00 - 19:00<br/>
              Sábados: 10:00 - 18:00<br/>
              Domingos: 12:00 - 17:00</p>

              <p><strong>Teléfono:</strong> +1 (310) 555-1234</p>
              <p><strong>Email:</strong> contact@maricielosgold.com</p>
            </div>
          </div>

            <iframe src="https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d1970.2158030090586!2d-77.02882870610438!3d-12.12031472489302!3m2!1i1024!2i768!4f13.1!2m1!1sdireccion%20de%20joyerias%20en%20lima%20miraflores!5e0!3m2!1ses-419!2spe!4v1760629979406!5m2!1ses-419!2spe" width="600" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          
        </div>
      </div>

      {/* Reconocimientos */}
      <div className="about-awards">
        <h2>Premios y Reconocimientos</h2>
        <p>Orgullosos de ser reconocidos por la excelencia en diseño de joyería</p>
        <div className="awards-grid">
          <div className="award-item">
            <h3>Mejor Joyería de Lujo</h3>
            <p>International Design Awards 2024</p>
          </div>
          <div className="award-item">
            <h3>Innovación en Artesanía</h3>
            <p>Artisan Excellence Award 2023</p>
          </div>
          <div className="award-item">
            <h3>Marca de Lujo Sostenible</h3>
            <p>Green Fashion Awards 2024</p>
          </div>
        </div>
      </div>
    </section>
  );
}
