import { useNavigate } from "react-router-dom";
import ProdutoListaComponentsView from "./ProdutoListaComponents";
import { useEffect, useState } from "react";
import axios from "axios";
import Auth from "../../../../utils/AuthUtils";

function ProdutoListaView() {
    const navigate = useNavigate();

    let [produtos, setProdutos] = useState([]);


    const deletarProduto = async (id: string) => {
        try {

            const response = await axios.delete(`${import.meta.env.VITE_URL_BACK_NODE}/produto/` + id , Auth.getHeaderAuth());
            if (response.status === 201) {
                alert("regostro deletado");
                window.location.reload();
            } else {
                console.log(response);
                alert(response?.data.message);
            }

        } catch (error: any) {
            alert(error?.data.message);
            console.log(error);
        }
    }

    const irPaginaEditarProduto = async (id: string) => {
        navigate(`/produto/${id}/editar`);
    }


    useEffect(() => {
        const getProdutos = async () => {
            try {

                const response = await axios.get(`${import.meta.env.VITE_URL_BACK_NODE}/produto` , Auth.getHeaderAuth());
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