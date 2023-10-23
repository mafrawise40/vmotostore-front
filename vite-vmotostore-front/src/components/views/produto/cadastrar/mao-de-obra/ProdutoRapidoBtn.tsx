import { Button } from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useState } from "react";
import MaoDeObraFormDialog from "../../../../dialog/MaoDeObraDialog";
import FormatadorMonetario from "../../../../../utils/MonetarioUtil";

function ProdutoRapidoBtn(props: any) {

    interface FormProduto {

        nome: string,
        precoVenda: string

    }



    const [formProduto, setFormProduto] = useState<any>({});
    const [open, setOpen] = useState(false);

    const tratarDadosForm = (event: any) => {
        const { name, value } = event.target;
        setFormProduto({
            ...formProduto,
            [name]: value,
        });

    };

    /*const adicionarItem = (event: any) => {

        if (event != null) {
            setItensTabela(oldArray => [...oldArray, { produto: event, quantidade: 1, valor: event.precoVenda }]);
            let novoValorTotal = valorTotal + (event.precoVenda * 1);
            setValorTotal(novoValorTotal);
            setValorTotalTable(novoValorTotal);
        }
    }*/

    const adicionar = () => {

        let produto = {
            _id: '#ID#'+ Math.random().toString(),
            nome: formProduto.nome,
            precoVenda: FormatadorMonetario.stringMonetariaToNumber(formProduto.precoVenda),
            aplicacao: '',
        }

        props.adicionarItem(produto);
        setOpen(false);
    }


    return (<>
        <Button variant="contained" onClick={() => { setOpen(true) }} startIcon={<AddBoxIcon />}> Serviço</Button>
        <MaoDeObraFormDialog setOpen={setOpen} open={open} setFormProduto={setFormProduto} tratarDadosForm={tratarDadosForm} adicionar={adicionar}></MaoDeObraFormDialog>
    </>)

}

export default ProdutoRapidoBtn;