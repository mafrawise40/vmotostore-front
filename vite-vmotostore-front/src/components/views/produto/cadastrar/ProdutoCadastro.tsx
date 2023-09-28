import { useState } from "react";
import ProdutoCadastroFormView from "./ProdutoCadastroForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProdutoCadastroView() {

    const navigate = useNavigate();

    const [formulario, setFormulario] = useState({
        codigo: '',
        nome: '',
        aplicacao: '',
        precoCompra: 0,
        precoVenda: 0,
        tipo: '',
        quantidade: 0,
        quantidadeVenda: 0

    });


    const processarSalvar = async (e: any) => {
        console.log("salvando");
        e.preventDefault();
        
        //FIXME -- Aplicar validações

        try {
            let response = await axios.post('http://localhost:3000/produto', formulario);
            if (response.status === 201) {
                navigate('/produto');
            }
        } catch (error) {
            console.log(error);
        }


    }

    const tratarDadosForm = (event: any) => {
        const { name, value } = event.target;
        setFormulario({
            ...formulario,
            [name]: value,
        });

    };

    const getForm = () => {
        return (
            <ProdutoCadastroFormView
                processarSalvar={processarSalvar}
                tratarDadosForm={tratarDadosForm}
            ></ProdutoCadastroFormView>
        );
    }

    return (
        getForm()
    );

}



export default ProdutoCadastroView;

