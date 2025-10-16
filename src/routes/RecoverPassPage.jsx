import RecoverPass from "../components/RecoverPass/RecoverPass";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RecoverPassPage = ()=>{
    const navigate = useNavigate();

    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        if (usuario) {
            navigate("/"); 
        }
    }, []);

    return(
        <RecoverPass/>
    )
}
export default RecoverPassPage;