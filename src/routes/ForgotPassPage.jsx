import ForgotPass from "../components/ForgotPass/ForgotPass";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ForgotPassPage = ()=>{

    const navigate = useNavigate();

    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        if (usuario) {
            navigate("/"); 
        }
    }, []);

    return(
        <ForgotPass/>
    )
}

export default ForgotPassPage;