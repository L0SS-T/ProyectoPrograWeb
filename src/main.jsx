import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import RegisterPage from './routes/RegisterPage.jsx'
import ForgotPassPage from './routes/ForgotPassPage.jsx'
import LoginPage from './routes/LoginPage.jsx'
import RecoverPassPage from './routes/RecoverPassPage.jsx'
import Admin from './routes/Admin.jsx'

import Colecciones from './routes/Colecciones.jsx'
import Checkoutt from './routes/Checkout.jsx'
import Busqueda from './routes/Busqueda.jsx'
import Detalles from './routes/Detalles.jsx'
import Productos from './routes/Productos.jsx'
import ListadoOrdenesPage from './routes/ListadoOrdenesPage.jsx'
import { AppProvider } from "./context/AppContext.jsx";
import AcercaNosotrosPage from './routes/AcercaNosotrosPage.jsx';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/colecciones', element: <Colecciones /> },
  { path: '/productos', element: <Productos /> },
  { path: '/buscar/:termino', element: <Busqueda /> },
  { path: '/producto/:id', element: <Detalles /> }, 
  { path: "register", element: <RegisterPage /> },
  { path: "forgot-password", element: <ForgotPassPage /> },
  { path: "login", element: <LoginPage /> },
  { path: "recover-password", element: <RecoverPassPage /> },
  { path: "listado-ordenes", element: <ListadoOrdenesPage /> },
  { path: "checkout", element: <Checkoutt/> },
  { path: "admin", element: <Admin/> },
  { path: "acerca-nosotros", element: <AcercaNosotrosPage /> } 

])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>
);
