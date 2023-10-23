import { useState } from "react";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";
import Auth from "../../../utils/AuthUtils";
import axios from "axios";

function LoginView() {
    const navigate = useNavigate();
    // const context = useContext(AuthContext);


    let [formulario, setFormulario] = useState({
        email: '',
        senha: ''
    });



    const setForm = (event: any) => {
        const { name, value } = event.target;
        setFormulario({
            ...formulario,
            [name]: value,
        });
    }


    const processarLogin = async () => {

        try {
            let response;

            response = await axios.post(`${import.meta.env.VITE_URL_BACK_NODE}/user/login`, formulario);
            if (response.status === 200) {
                //context.logar();
                Auth.setHeaderAuth(response.data.token);
                localStorage.setItem('user', JSON.stringify({ nome: response.data.nome, email: response.data.email }));
                navigate('/venda');
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (<>
        <LoginForm processarLogin={processarLogin} formulario={formulario} setForm={setForm}></LoginForm>
    </>);

}

export default LoginView;