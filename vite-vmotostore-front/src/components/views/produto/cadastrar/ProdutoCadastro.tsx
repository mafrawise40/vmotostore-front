import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Auth from '../../../../utils/AuthUtils';
import FormatadorMonetario from '../../../../utils/MonetarioUtil';
import ProdutoCadastroFormView from './ProdutoCadastroForm';
import ProdutoValidador from './ProdutoValidador';

function ProdutoCadastroView() {

    const navigate = useNavigate();
    const parametro = useParams()

    const [formulario, setFormulario] = useState({
        codigo: '',
        nome: '',
        aplicacao: '',
        precoCompra: 0,
        precoVenda: 0,
        tipo: '',
        quantidade: 0,
        quantidadeVenda: 0,
        fornecedor: ''

    });

    let [msgErro, setMsgErro] = useState("");
    let [isErro, setIsErro] = useState(false);


    const processarSalvar = async (e: any) => {

        e.preventDefault();

        //FIXME -- Aplicar validações
        if (formulario.nome.length < 5) {
            msgErro = "Nome do produto obrigatório";
            isErro = true;
            return;
        }

        let formularioValidado = formulario;

        formularioValidado.precoCompra = Number(FormatadorMonetario.stringMonetariaToNumber(formularioValidado.precoCompra.toString()));
        formularioValidado.precoVenda = Number(FormatadorMonetario.stringMonetariaToNumber(formularioValidado.precoVenda.toString()));
        setFormulario(formularioValidado);

        try {
            let response;
            if (parametro.id) {
                response = await axios.put(`${import.meta.env.VITE_URL_BACK_NODE}/produto/` + parametro.id, formulario , Auth.getHeaderAuth());
            } else {
                response = await axios.post(`${import.meta.env.VITE_URL_BACK_NODE}/produto`, formulario , Auth.getHeaderAuth());
            }

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

    useEffect(() => {
        const getProtudo = async () => {
            if (parametro.id) {
                try {
                    let response = await axios.get(`${import.meta.env.VITE_URL_BACK_NODE}/produto/` + parametro.id , Auth.getHeaderAuth());
                    if (response.status === 201) {
                        setFormulario({
                            codigo: response.data?.codigo || '',
                            nome: response.data?.nome || '',
                            aplicacao: response.data?.aplicacao || '',
                            precoCompra: response.data?.precoCompra || '',
                            precoVenda: response.data?.precoVenda || '',
                            tipo: response.data?.tipo || '',
                            quantidade: response.data?.quantidade || '',
                            quantidadeVenda: response.data?.quantidadeVenda || '',
                            fornecedor: response.data?.fornecedor || ''

                        });
                    }
                } catch (error) {
                    console.log(error);
                }
            }

        }

        getProtudo();
    }, []);

    const getForm = () => {

        return (<>
            <ProdutoCadastroFormView
                processarSalvar={processarSalvar}
                tratarDadosForm={tratarDadosForm}
                formulario={formulario}
            ></ProdutoCadastroFormView>

            <ProdutoValidador msgErro={msgErro} isErro={isErro}></ProdutoValidador>
        </>
        );
    }

    return (
        getForm()
    );

}



export default ProdutoCadastroView;

