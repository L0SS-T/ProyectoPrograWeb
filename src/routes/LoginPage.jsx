import Login from "../components/Login/Login";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const LoginPage = ()=>{
    const navigate = useNavigate();

    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        if (usuario) {
            navigate("/"); 
        }
    }, []);

    return(
            <Login/>
    )
}
export default LoginPage;