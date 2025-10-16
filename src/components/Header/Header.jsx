import './Header.css'
import imgLogo from '../../assets/logo.png'
import usuarioIcon from '../../assets/usuario.webp'
import bolsita from '../../assets/bolsita.webp'
import Buscar from "../Buscar/Buscar";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { useState, useRef, useEffect } from 'react';
import Carrito from '../Carrito/Carrito'; // Componente Carrito actualizado

const Header = () => {
  const { user, logout, carrito } = useApp(); // <-- usamos AppContext
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const menuRef = useRef(null);

  const irInicio = () => navigate('/');
  const irOrdenes = () => {
    navigate('/listado-ordenes');
    setMenuOpen(false);
  };
  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  const abrirCarrito = () => {
    if (!user) {
      navigate('/login');
    } else {
      setMostrarCarrito(true);
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className="header-main">
      <div className="header-left">
        <div className="header-logo" onClick={irInicio}>
          <img src={imgLogo} alt="Logo Joyeria" />
        </div>
        <nav className="header-menu">
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/colecciones">Colecciones</a></li>
            <li><a href="/productos">Productos</a></li>
            <li><a href="/acerca-nosotros">Acerca Nosotros</a></li>
          </ul>
        </nav>
      </div>

      <div className="header-right">
        <div className="header-buscar">
          <Buscar />
        </div>

        <div className="header-usuario" ref={menuRef}>
          {user ? (
            <>
              <img 
                src={usuarioIcon} 
                alt="Usuario" 
                onClick={() => setMenuOpen(!menuOpen)} 
                className="header-iconoUsuario"
              />
              {menuOpen && (
                <div className="header-dropdownMenu">
                  <button onClick={irOrdenes}>Mis Órdenes</button>
                  <button onClick={handleLogout}>Cerrar sesión</button>
                </div>
              )}
            </>
          ) : 
          (
            <button 
              className="header-botonLogin" 
              onClick={() => navigate('/login')}
            >
              Login/Register
            </button>
          )}
        </div>

        <div className="header-carrito" onClick={abrirCarrito}>
          {user && <img src={bolsita} alt="Carrito de compras" />}
          {user && carrito.length > 0 && (
            <span className="carrito-count">{carrito.length}</span>
          )}
        </div>
      </div>

      {/* Mostramos el carrito */}
      {mostrarCarrito && (
        <Carrito 
          mostrar={mostrarCarrito} 
          cerrarModal={() => setMostrarCarrito(false)}
        />
      )}
    </header>
  )
}

export default Header;
