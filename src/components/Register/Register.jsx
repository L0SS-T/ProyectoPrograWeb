// src/pages/Auth/Register.jsx
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import RegisterForm from "./RegisterForm/RegisterForm";
import { useApp } from "../../context/AppContext";

const Register = () => {
  const { registrarUsuario } = useApp();  // ✅ usamos el contexto

  const handleSubmit = (usuario) => {
    registrarUsuario(usuario);
    alert("Registrado correctamente!");
  };

  return (
    <>
      <Header />
      <RegisterForm onSubmit={handleSubmit} />
      <Footer />
    </>
  );
};

export default Register;
