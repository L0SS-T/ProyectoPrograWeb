// src/context/AppContext.jsx
import { createContext, useContext, useState } from "react";
import usuariosData from "../data/usuarios";
import productosData from "../data/data";
import categoriasData from "../data/categorias";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // -------------------- USUARIOS --------------------
  const [usuarios, setUsuarios] = useState(() => {
    const saved = localStorage.getItem("usuarios");
    return saved ? JSON.parse(saved) : usuariosData;
  });

  const sincronizarUsuarios = (nuevosUsuarios) => {
    setUsuarios(nuevosUsuarios);
    localStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios));
  };

  const activarUsuario = (id) => {
    const updated = usuarios.map((u) => (u.id === id ? { ...u, isActive: true } : u));
    sincronizarUsuarios(updated);
  };

  const desactivarUsuario = (id) => {
    const updated = usuarios.map((u) => (u.id === id ? { ...u, isActive: false } : u));
    sincronizarUsuarios(updated);
  };

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("usuario");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (correo, password) => {
    const usuarioEncontrado = usuarios.find(
      (u) => u.correo.toLowerCase() === correo.toLowerCase() && u.password === password
    );
    if (!usuarioEncontrado) return null;
    if (usuarioEncontrado.isActive === false) return { banned: true };
    setUser(usuarioEncontrado);
    localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));
    return usuarioEncontrado;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("usuario");
    setCarrito([]);
    localStorage.setItem("carrito", JSON.stringify([]));
    setGuardarParaDespues([]);
    localStorage.setItem("guardarParaDespues", JSON.stringify([]));
  };

  const registrarUsuario = (nuevoUsuario) => {
    const id = usuarios.length ? usuarios[usuarios.length - 1].id + 1 : 1;
    const usuarioFinal = {
      ...nuevoUsuario,
      id,
      isActive: true,
      isAdmin: false,
    };
    const updated = [...usuarios, usuarioFinal];
    sincronizarUsuarios(updated);
  };

  const editarUsuario = (id, data) => {
    const updated = usuarios.map((u) => (u.id === id ? { ...u, ...data } : u));
    sincronizarUsuarios(updated);
    if (user && user.id === id) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem("usuario", JSON.stringify(updatedUser));
    }
  };

  // ---------------- RECUPERACIÓN DE CONTRASEÑA (flujo forgot/recover) ----------------
  const [usuarioARecuperar, setUsuarioARecuperar] = useState(() => {
    const saved = localStorage.getItem("usuarioARecuperar");
    return saved ? JSON.parse(saved) : null;
  });

  const setUsuarioARecuperarPersist = (u) => {
    setUsuarioARecuperar(u);
    if (u === null) localStorage.removeItem("usuarioARecuperar");
    else localStorage.setItem("usuarioARecuperar", JSON.stringify(u));
  };

  const updateUserPasswordById = (id, newPassword) => {
    // Actualiza la lista de usuarios y, si corresponde, el usuario en sesión
    editarUsuario(id, { password: newPassword });
    // editarUsuario ya sincroniza usuarios y actualiza user si es necesario
  };

  // -------------------- PRODUCTOS --------------------
  const [productosAdmin, setProductosAdmin] = useState(() => {
    const saved = localStorage.getItem("productosAdmin");
    return saved ? JSON.parse(saved) : productosData;
  });

  const [productos, setProductos] = useState(() => {
    const saved = localStorage.getItem("productos");
    if (saved) return JSON.parse(saved);
    return productosData.filter((p) => p.isActive);
  });

  const sincronizarProductos = (nuevosProductosAdmin) => {
    setProductosAdmin(nuevosProductosAdmin);
    localStorage.setItem("productosAdmin", JSON.stringify(nuevosProductosAdmin));

    const soloActivos = nuevosProductosAdmin.filter((p) => p.isActive);
    setProductos(soloActivos);
    localStorage.setItem("productos", JSON.stringify(soloActivos));
  };

  const agregarProductoAdmin = (nuevoProducto) => {
    sincronizarProductos([...productosAdmin, nuevoProducto]);
  };

  const editarProductoAdmin = (id, updatedData) => {
    const updated = productosAdmin.map((p) => (p.id === id ? { ...p, ...updatedData } : p));
    sincronizarProductos(updated);
  };

  const toggleActivoProducto = (id) => {
    const updated = productosAdmin.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p));
    sincronizarProductos(updated);
  };

  // -------------------- CARRITO --------------------
  const [carrito, setCarrito] = useState(() => {
    const saved = localStorage.getItem("carrito");
    return saved ? JSON.parse(saved) : [];
  });

  const agregarAlCarrito = (producto, cantidad) => {
    setCarrito((prev) => {
      const existing = prev.find((p) => p.id === producto.id);
      let updated;
      if (existing) {
        updated = prev.map((p) =>
          p.id === producto.id ? { ...p, quantity: Math.min(p.quantity + cantidad, producto.stock) } : p
        );
      } else {
        updated = [...prev, { ...producto, quantity: cantidad }];
      }
      localStorage.setItem("carrito", JSON.stringify(updated));
      return updated;
    });
  };

  const quitarDelCarrito = (id) => {
    setCarrito((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      localStorage.setItem("carrito", JSON.stringify(updated));
      return updated;
    });
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.setItem("carrito", JSON.stringify([]));
  };

  // -------------------- GUARDAR PARA DESPUÉS --------------------
  const [guardarParaDespues, setGuardarParaDespues] = useState(() => {
    const saved = localStorage.getItem("guardarParaDespues");
    return saved ? JSON.parse(saved) : [];
  });

  const agregarParaDespues = (producto) => {
    setGuardarParaDespues((prev) => {
      const updated = [...prev, producto];
      localStorage.setItem("guardarParaDespues", JSON.stringify(updated));
      return updated;
    });
    quitarDelCarrito(producto.id);
  };

  const quitarParaDespues = (id) => {
    setGuardarParaDespues((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      localStorage.setItem("guardarParaDespues", JSON.stringify(updated));
      return updated;
    });
  };

  // -------------------- ORDENES --------------------
  const [ordenes, setOrdenes] = useState(() => {
    const saved = localStorage.getItem("ordenes");
    return saved ? JSON.parse(saved) : [];
  });

  const confirmarOrden = (metodoPago, metodoEnvio, direccion) => {
    // Asegurarnos que hay usuario y carrito
    if (!user) return null;
    if (!carrito || !carrito.length) return null;

    const subtotal = carrito.reduce((acc, p) => {
      const precioNum = parseFloat(String(p.price || p.price || "").replace(/[^0-9.]/g, "")) || 0;
      return acc + precioNum * p.quantity;
    }, 0);

    let envio = 0;
    if (metodoEnvio === "express") envio = 25;
    if (metodoEnvio === "estandar") envio = 7; 
    if (metodoEnvio === "normal") envio = 0;

    const impuesto = +(subtotal * 0.08).toFixed(2);
    const total = +(subtotal + envio + impuesto).toFixed(2);

    const nuevosProductosAdmin = productosAdmin.map((p) => {
      const itemCarrito = carrito.find((c) => c.id === p.id);
      if (!itemCarrito) return p;
      return { ...p, stock: Math.max(0, p.stock - itemCarrito.quantity) };
    });
    sincronizarProductos(nuevosProductosAdmin);

    // Productos de la orden (guardamos precio numérico por unidad)
    const productosOrden = carrito.map((p) => ({
      id: p.id,
      quantity: p.quantity,
      priceUnit: parseFloat(String(p.price).replace(/[^0-9.]/g, "")) || 0,
    }));

    const nuevaOrden = {
      id: Date.now(),
      userId: user.id,
      productos: productosOrden,
      fecha: new Date().toISOString(),
      subtotal,
      impuesto,
      envio,
      total,
      metodoPago,
      metodoEnvio,
      direccion,
      isEntregado: false,
      isCancelada: false,
    };

    const updated = [...ordenes, nuevaOrden];
    setOrdenes(updated);
    localStorage.setItem("ordenes", JSON.stringify(updated));

    // Vaciar carrito y persistir
    setCarrito([]);
    localStorage.setItem("carrito", JSON.stringify([]));

    return nuevaOrden;
  };

  const toggleEstadoOrden = (id) => {
    setOrdenes((prev) => {
      const updated = prev.map((o) => (o.id === id ? { ...o, isEntregado: !o.isEntregado } : o));
      localStorage.setItem("ordenes", JSON.stringify(updated));
      return updated;
    });
  };

  const cancelarOrden = (id) => {
    setOrdenes((prev) => {
      const updated = prev.map((o) => (o.id === id ? { ...o, isCancelada: true } : o));
      localStorage.setItem("ordenes", JSON.stringify(updated));
      return updated;
    });
  };

  // -------------------- CATEGORIAS --------------------
  const [categorias, setCategorias] = useState(() => {
    const saved = localStorage.getItem("categorias");
    return saved ? JSON.parse(saved) : categoriasData;
  });

  const sincronizarCategorias = (nuevas) => {
    setCategorias(nuevas);
    localStorage.setItem("categorias", JSON.stringify(nuevas));
  };

  const agregarCategoria = (nueva) => {
    const nombre = nueva.trim();
    if (!nombre) return;
    sincronizarCategorias([...categorias, nombre]);
  };

  const eliminarCategoria = (cat) => {
    const updated = categorias.filter((c) => c !== cat);
    sincronizarCategorias(updated);
  };

  // -------------------- EXPORTAR --------------------
  const value = {
    // usuarios & sesión
    user,
    login,
    logout,
    usuarios,
    setUsuarios,
    activarUsuario,
    desactivarUsuario,
    registrarUsuario,
    editarUsuario,

    // recuperación
    usuarioARecuperar,
    setUsuarioARecuperar: setUsuarioARecuperarPersist,
    updateUserPasswordById,

    // productos
    productos,
    setProductos,
    productosAdmin,
    setProductosAdmin,
    agregarProductoAdmin,
    editarProductoAdmin,
    toggleActivoProducto,

    // carrito
    carrito,
    agregarAlCarrito,
    quitarDelCarrito,
    vaciarCarrito,

    // guardar para después
    guardarParaDespues,
    agregarParaDespues,
    quitarParaDespues,

    // órdenes
    ordenes,
    confirmarOrden,
    toggleEstadoOrden,
    cancelarOrden,

    // categorías
    categorias,
    agregarCategoria,
    eliminarCategoria,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
