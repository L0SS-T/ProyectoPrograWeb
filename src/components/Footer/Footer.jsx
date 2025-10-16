import './Footer.css';
import ig from '../../assets/ig.webp';
import facebook from '../../assets/facebook.png';
import twitter from '../../assets/twitter.png';
import { useNavigate } from 'react-router-dom'

const irInicio = () => {
    window.location.href = '/';
};

const Footer = () => {
    const navigate = useNavigate();

    const irProductos = () => {
        navigate(`/productos`); 
    };


    return (
        <footer className="footer-wrapper"> 
            <div className="unete">
                <h2>Únete a nosotros</h2>
                <p>Se el primero en descubrir nuestras nuevas colecciones y ofertas exclusivas</p>

                <div className="suscripcion">
                    <input type="email" placeholder="Ingrese su email" />
                    <button>SUBSCRIBETE</button>
                </div>
                <br />
                <br />
            </div>

            <hr />

            <div className="footer-content">

                <div className='footer1'>
                    <h4>MENU</h4>
                    <ul>
                        <li><a href="#" onClick={irInicio}>Inicio</a></li>
                        <li><a href="/colecciones">Colecciones</a></li>
                        <li><a href="#" onClick={irProductos}>Productos</a></li>
                        <li><a href="#">Acerca Nosotros</a></li>
                    </ul>
                </div>

                <div className='footer2'>
                    <h4>SERVICIO AL CLIENTE</h4>
                    <ul>
                        <li>Entregas y devoluciones</li>
                        <li>Guia de medidas</li>
                        <li>Instrucciones de cuidado</li>
                        <li>Garantia</li>
                        <li>FAQs</li>
                    </ul>
                </div>

                <div className='footer3'>
                    <h4>CONTACTANOS</h4>
                    <ul className="contact-info">
                        <li>Calle Palominmo, Galeria 1283</li>
                        <li>+51 999-999-999</li>
                        <li>contact@maricielosgold.com</li>
                    </ul>
                </div>   

                <div className="footer4">
                    <h4>MARICIELO'S GOLD</h4>
                    <p>
                        Creando elegancia eterna a través de una maestría artesanal y un diseño 
                        excepcional desde hace más de 25 años.
                    </p>

                    <div className="siguenos">
                        <h4>SIGUENOS</h4>
                        <div className='redes'>
                            <img src={ig}></img>
                            <img src={facebook}></img>
                            <img src={twitter}></img>
                        </div>
                        
                    </div>
                </div> 
                
            </div>
            <br />
            <hr />

            <div className="footer-end">
                <p>© 2025 Joyeria Adara. All rights reserved.</p>
                <div className="policies">
                    <span>Politica de Privacidad</span>
                    <span>Terminos de Servicio</span>
                    <span>Accessibilidad</span>
                </div>
            </div>

        </footer>
    )
}

export default Footer;
