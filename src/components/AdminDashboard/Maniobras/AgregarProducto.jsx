import React, { useState } from "react";
import { useApp } from "../../../context/AppContext";
import "./Maniobras.css";

const AgregarProducto = ({ onVolver }) => {
  const { agregarProductoAdmin, productosAdmin, categorias } = useApp();

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const [sImagen, setSImagen] = useState("");
  const [categoria, setCategoria] = useState(categorias[0] || "general");
  const [tipo, setTipo] = useState("convencional");
  const [stock, setStock] = useState(100);
  const [ventas, setVentas] = useState(0);
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !precio || !categoria || !imagen || !sImagen || !descripcion) {
      return alert("Completa todos los campos");
    }

    const maxId = productosAdmin.length
      ? Math.max(...productosAdmin.map((p) => p.id))
      : 0;
    const id = maxId + 1;

    const nuevoProducto = {
      id,
      name: nombre,
      price: `$${parseFloat(precio).toFixed(2)}`,
      isActive: true,
      image: imagen,
      simage: sImagen,
      stock: Number(stock),
      ventas: Number(ventas),
      category: categoria,
      type: tipo,
      description: descripcion,
    };

    agregarProductoAdmin(nuevoProducto);

    // limpiar formulario
    setNombre("");
    setPrecio("");
    setImagen("");
    setSImagen("");
    setCategoria(categorias[0] || "general");
    setTipo("convencional");
    setStock(100);
    setVentas(0);
    setDescripcion("");

    alert("Producto agregado exitosamente!");
  };

  return (
    <div className="maniobra-container">
      <h3>Agregar Producto</h3>

      <form className="maniobra-form" onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} />

        <label>Precio:</label>
        <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} />

        <label>Imagen principal URL:</label>
        <input
          type="text"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
          placeholder="URL de la imagen principal"
        />

        <label>Imagen secundaria URL:</label>
        <input
          type="text"
          value={sImagen}
          onChange={(e) => setSImagen(e.target.value)}
          placeholder="URL de la imagen secundaria"
        />

        <label>Categoría:</label>
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <label>Tipo:</label>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="convencional">Convencional</option>
          <option value="especial">Especial</option>
          <option value="especial">de lujo</option>
          <option value="especial">casual</option>
          <option value="especial">artesanal</option>
        </select>

        <label>Stock:</label>
        <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} />

        <label>Ventas:</label>
        <input type="number" value={ventas} onChange={(e) => setVentas(e.target.value)} />

        <label>Descripción:</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción del producto"
        />

        <button type="submit" className="maniobra-button">
          Guardar
        </button>
      </form>

      <button onClick={onVolver} className="maniobra-button">
        Volver
      </button>
    </div>
  );
};

export default AgregarProducto;
  