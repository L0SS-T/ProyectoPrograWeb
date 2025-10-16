import Register from "../components/Register/Register";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const RegisterPage = ()=>{
    const navigate = useNavigate();

    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        if (usuario) {
            navigate("/"); 
        }
    }, []);

    return(
        <Register/>
    )
}
export default RegisterPage;