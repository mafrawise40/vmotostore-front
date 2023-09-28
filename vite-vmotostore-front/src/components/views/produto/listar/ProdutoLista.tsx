import { useNavigate } from "react-router-dom";
import ProdutoListaComponentsView from "./ProdutoListaComponents";
import { useEffect, useState } from "react";
import axios from "axios";

function ProdutoListaView() {
    const navigate = useNavigate();

    let [produtos, setProdutos] = useState([]);


    const deletarProduto = async (id: string) => {
        console.log('deletando' + id);
    }

    const irPaginaEditarProduto = async (id: string) => {
        navigate(`/produto/${id}/editar`);
    }


    useEffect(() => {
        const getProdutos = async () => {
            try {

                const response = await axios.get('http://localhost:3000/produto');
                setProdutos(response.data); // Atualize o estado com os dados recuperados

            } catch (error: any) {
                console.log(error);
            }
        };

        getProdutos(); // Chame a função para buscar os dados quando o componente for montado
    }, []); // O segundo argumento vazio [] garante que isso só será executado uma vez, após a montagem inicial



    return (

        <ProdutoListaComponentsView produtos={produtos}
            deletarProduto={deletarProduto}
            irPaginaEditarProduto={irPaginaEditarProduto}
        ></ProdutoListaComponentsView>

    );

}

export default ProdutoListaView;