
'use client';

import { Badge, Card, Label, TextInput } from 'flowbite-react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TabelaVenda from './TabelaVenda';
import Asynchronous from './AutoComplete';
import { useEffect, useState } from 'react';
import axios from 'axios';
import FormatadorMonetario from '../../../utils/MonetarioUtil';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, TextField } from '@mui/material';
import React from 'react';


function VendaCadastrarView() {

    const navigate = useNavigate();
    const parametro = useParams();


    class Venda {
        cliente: any;
        produtos: any;
        status: string = ""; //aberto ou finalizada,
        valorTotal: number = 0;
        descontoNoValorTotal: number = 0;
        modeloMoto: string = "";
        criadoEm: Date = new Date;
        alteradoEm: Date = new Date;

    }

    class Cliente {
        nome: string = '';
        cpf: string = '';
        email: string = '';
        telefone: string = '';
        criadoEm: Date = new Date()
        alteradoEm: Date = new Date();
    }

    interface ProdutoVenda {

        produto: any,
        quantidade: number,
        valor: number
    }


    let [valorTotal, setValorTotal] = useState(0.00);
    let [valorTotalTable, setValorTotalTable] = useState(0.00);
    let [itens, setItens] = useState([]);
    let [itensTabela, setItensTabela] = useState<ProdutoVenda[]>([]);
    let [status, seStatus] = useState('aberto');
    const [valor, setValor] = useState('');
    const [formulario, setFormulario] = useState({
        cliente: '',
        telefone: '',
        modeloMoto: '',
        total: 0,
        desconto: 0,
        formaPagamento: '',
        observacao: ''
    });


    const handleCallback = (childData: any) => {
        setValorTotal(childData);
    }

    const atualizarValorTabela = () => {
        let total = 0;

        itensTabela.forEach((item: { valor: number; quantidade: number }) => {
            total = total + (item.valor * item.quantidade);
        })

        setValorTotal(total);
        setValorTotalTable(total);
    };

    const adicionarItem = (event: any) => {

        if (event != null) {
            setItensTabela(oldArray => [...oldArray, { produto: event, quantidade: 1, valor: event.precoVenda }]);
            let novoValorTotal = valorTotal + (event.precoVenda * 1);
            setValorTotal(novoValorTotal);
            setValorTotalTable(novoValorTotal);
        }
    }

    const deletarItem = (id: number) => {
        itensTabela.splice(itensTabela.map(e => e.produto['_id']).indexOf(id), 1);
        setItensTabela(itens => [...itens]);
        atualizarValorTabela();
    }

    const alterarQuantidade = (id: number, novaQtd: number) => {
        itensTabela[itensTabela.map(e => e.produto['_id']).indexOf(id)].quantidade = novaQtd;
        setItens(itens => [...itens]);
        atualizarValorTabela();
    }


    const aplicarDesconto = (desconto: any | number, valorTotalTabela: number | null) => {
        let value: any | number = null;
        if (typeof desconto === "number") {
            value = desconto;
        } else {
            somentePositivo(desconto);
            value = FormatadorMonetario.stringToNumber(desconto.target?.value);
        }


        if (value != 0 || value > 0) {
            if (valorTotalTabela != null) {
                let novoValor = valorTotalTabela - value;
                setValorTotal(novoValor);
            } else {
                setValorTotal(valorTotalTable - Number(value));
            }

        } else {
            if (valorTotalTabela != null) {
                setValorTotal(valorTotalTabela);
            } else {
                setValorTotal(valorTotalTable);
            }
        }

    }


    const somentePositivo = (e: any) => {
        const novoValor = e.target.value;
        // Verifica se o novo valor é um número positivo ou uma string vazia
        if (/^\d+(\,\d{0,2})?$/.test(novoValor) || novoValor === '') {
            setValor(novoValor);
        }
    };


    const tratarDadosForm = (event: any) => {
        const { name, value } = event.target;
        setFormulario({
            ...formulario,
            [name]: value,
        });
    };


    const processarSalvar = async (e: any, isFinalizar: boolean) => {
        e.preventDefault();

        try {

            let dadosDoFormulario = {
                cliente: formulario.cliente,
                telefone: formulario.telefone,
                modeloMoto: formulario.modeloMoto,
                valorTotal: Number(valorTotal.toString().replace(",", ".")).toFixed(2), // O valor atualizado
                desconto: Number(formulario.desconto.toString().replace(",", ".")).toFixed(2),
                produtos: itensTabela,
                status: status,
                formaPagamento: formulario.formaPagamento,
                observacao: formulario.observacao

            };

            if (isFinalizar) {
                dadosDoFormulario.status = 'finalizado';
            }

            let response = null;

            if (parametro.id) {
                response = await axios.put('http://localhost:3000/venda/' + parametro.id, dadosDoFormulario); // Substitua pela URL da sua API
            } else {
                response = await axios.post('http://localhost:3000/venda', dadosDoFormulario);
            }


            if (response && response.status == 201) {
                handleClick();
                navigate('/venda');
            }


        } catch (error: any) {
            return (<Alert severity="error">Erro ao processar o formulário {error}</Alert>)

        }


    }



    /**
     * Msg de sucesso
     */
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    /**
     * Dialogo
     */
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const getDialogo = (operacao: string) => {


        return (<Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>{operacao} Venda </DialogTitle>
            <DialogContent>

                {operacao === 'Finalizar' ? <>
                    <DialogContentText>
                        {formulario?.cliente && 'Cliente: ' + formulario?.cliente}
                        <br />
                        {valorTotal && 'Total ' + FormatadorMonetario.formatarValorMonetario(valorTotal, "R$")}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="formaPagamento"
                        label="Forma de Pagamento"
                        name='formaPagamento'
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={tratarDadosForm}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="observacao"
                        name='observacao'
                        label="Obrservação"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={tratarDadosForm}
                    />
                </>
                    : <>
                        <DialogContentText>
                            Motivo do Cancelamento
                        </DialogContentText>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="observacao"
                            name='observacao'
                            label="Obrservação"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={tratarDadosForm}
                        /></>}


            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                {operacao === 'Finalizar' ? <><Button onClick={() => { processarSalvar(event, true); }}>Confirmar</Button></>
                    :
                    <><Button onClick={() => { cancelarVenda(); }}>Confirmar</Button></>
                }
            </DialogActions>
        </Dialog>)

    }


    useEffect(() => {
        // Função para buscar os dados do banco de dados
        const buscarDados = async () => {
            try {

                const response = await axios.get('http://localhost:3000/produto'); // Substitua pela URL da sua API
                setItens(response.data); // Atualize o estado com os dados recuperados

            } catch (error: any) {
                return (<Alert severity="error">{error}</Alert>)
            }
        };

        buscarDados();
        //  buscarDadosVenda(); // Chame a função para buscar os dados quando o componente for montado
    }, []); // O segundo argumento vazio [] garante que isso só será executado uma vez, após a montagem inicial



    useEffect(() => {
        const buscarDadosVenda = async () => {
            try {
                if (parametro.id) {
                    const response = await axios.get('http://localhost:3000/venda/' + parametro.id);

                    let arraNovo: any = [];
                    let valorTotalTabelaResponse = 0;
                    response.data.produtos.forEach((produto: { produto: { precoVenda: any; }; quantidade: any; }) => {

                        arraNovo.push({
                            produto: produto.produto,
                            quantidade: produto.quantidade,
                            valor: produto.produto.precoVenda
                        });
                        valorTotalTabelaResponse += produto.quantidade * produto.produto.precoVenda;
                    });

                    setItensTabela(arraNovo);
                    setValorTotalTable(valorTotalTabelaResponse);
                    setFormulario({
                        cliente: response.data?.cliente?.nome || '',
                        telefone: response.data.cliente?.telefone || '',
                        desconto: response.data?.descontoNoValorTotal || 0.00,
                        modeloMoto: response.data?.modeloMoto || '',
                        total: response.data?.valorTotal || 0.00,
                        formaPagamento: response.data?.formaPagamento || '',
                        observacao: response.data?.observacao || ''

                    });


                    setValor(response.data.descontoNoValorTotal);
                    setValorTotal(response.data.valorTotal);

                    if (response.status) {
                        seStatus(response.data.status);
                    }

                    aplicarDesconto(response.data.descontoNoValorTotal, valorTotalTabelaResponse);

                }
            } catch (error: any) {
            }
        };
        buscarDadosVenda();
    }, [parametro.id]);


    const getBotaoFinalizar = () => {
        if (status != 'finalizado' && status != 'cancelado') {
            return (<Button type='button' color="success" onClick={(event) => {
                handleClickOpenDialog();
            }} >Finalizar Venda</Button>);
        }
    }

    const getBotaoSalvar = () => {
        if (status != 'finalizado' && status != 'cancelado') {
            return (<Button type='button' onClick={(event) => {
                processarSalvar(event, false);
            }} color="primary">Salvar</Button>);
        }
    }

    const getBotaoCancelar = () => {
        if ( status != 'cancelado' && ( parametro.id != null && parametro.id != undefined)) {
            return (<Button type='button' onClick={() => {
                handleClickOpenCancelarVenda();
            }} color="error" >Cancelar</Button>);
        }
    }



    const cancelarVenda = async () => {

        if (parametro.id != null && parametro.id != undefined) {
            try {
                const dadosDoFormulario = { observacao: formulario.observacao };
                const response = await axios.post('http://localhost:3000/venda/' + parametro.id + '/cancelar', dadosDoFormulario);

                if (response.status == 201) {
                    alert('Venda Cancelada com sucesso');
                    setOpenCancelarDialogo(false);
                }
            } catch (error: any) {
                console.log(error);
            }
        }
    }

    const [openCancelarDialogo, setOpenCancelarDialogo] = React.useState(false);
    const handleClickOpenCancelarVenda = () => {
        setOpenCancelarDialogo(true);
    };

    const handleCloseCancelarVenda = () => {
        setOpenCancelarDialogo(false);
    };

    return (<>
        <Card style={{ 'width': '100%' }} >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <p>
                    Nova Venda
                </p>
            </h5>
            <Card >
                <form className="">
                    <div className="grid gap-6 mb-2 md:grid-cols-2">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="cliente"
                                value="Nome Cliente"
                            />
                            <TextInput
                                id="cliente"
                                name='cliente'
                                required
                                shadow
                                placeholder='Digite o nome do cliente'
                                type="text"
                                onChange={tratarDadosForm}
                                value={formulario?.cliente}
                            />
                        </div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="telefone"
                                value="Telefone"
                            />

                            <TextInput
                                id="telefone"
                                required
                                shadow
                                placeholder='61 9999-9999'
                                type="text"
                                name='telefone'
                                onChange={tratarDadosForm}
                                value={formulario?.telefone}
                            />
                        </div>
                    </div>

                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="modeloMoto"
                                value="Modelo da Moto / Placa"
                            />
                            <TextInput
                                id="modeloMoto"
                                required
                                shadow
                                placeholder='Ex: HONDA CG 150 - APC2313'
                                type="modeloMoto"
                                name='modeloMoto'
                                onChange={tratarDadosForm}
                                value={formulario?.modeloMoto}
                            />
                        </div>

                        <div className="mb-2 block">
                            <Label
                                htmlFor="status"
                                value="Status da Venda"
                            />
                            {status === 'aberto' ? <><Badge color="success">Aberto</Badge></> :
                                status === 'finalizado' ? <><Badge color="info">Finalizado</Badge></> :
                                    status === 'cancelado' ? <><Badge color="failure">Cancelada</Badge></> : <></>
                            }

                        </div>

                    </div>

                    <div className="grid gap-6 mb-6 md:grid-cols-2" >
                        <div className="mb-2 block">
                            <Label
                                htmlFor="moto"
                                value=""
                            />
                            <Asynchronous itens={itens} adicionarItem={adicionarItem} ></Asynchronous>
                        </div>



                    </div>

                    <div>
                        <TabelaVenda
                            itens={itensTabela}
                            deletar={deletarItem}
                            alterarQuantidade={alterarQuantidade}
                            valorTotal={handleCallback} />
                    </div>

                    <div className="grid gap-6 mb-6 md:grid-cols-4">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="desconto"
                                value="Aplicar desconto"
                            />
                            <TextInput
                                id="desconto"
                                name='desconto'
                                required
                                shadow
                                placeholder='R$: 00,00'
                                type="text"
                                onChange={(event) => {
                                    aplicarDesconto(event, null); // Chama a primeira função
                                    tratarDadosForm(event); // Chama a segunda função
                                }}
                                value={valor}
                            />
                        </div>

                        <div className="mb-2 block"></div>

                        <div className="mb-2 block">
                            <Label

                                htmlFor="total"
                                value="Valor Total"
                            />

                            <TextInput
                                id="total"
                                required
                                readOnly
                                name='total'
                                shadow
                                placeholder='R$: 100.00'
                                type="text"
                                onChange={tratarDadosForm}
                                value={FormatadorMonetario.formatarValorMonetario(valorTotal, "R$")}
                            />
                        </div>

                    </div>

                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div className="mb-2 block">
                            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                <Button type='button' onClick={() => {
                                    navigate('/venda')
                                }} color="info" >Voltar</Button>
                            </ButtonGroup>

                        </div>

                        <div className="mb-2 block">
                            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                {getBotaoSalvar()}
                                {getBotaoFinalizar()}
                                {getBotaoCancelar()}

                            </ButtonGroup>

                        </div>
                    </div>
                </form>

                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        This is a success message!
                    </Alert>
                </Snackbar>

                <div>

                    <Dialog open={openDialog} onClose={handleCloseDialog}>
                        <DialogTitle>Finalizar Venda </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {formulario?.cliente && 'Cliente: ' + formulario?.cliente}
                                <br />
                                {valorTotal && 'Total ' + FormatadorMonetario.formatarValorMonetario(valorTotal, "R$")}
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="formaPagamento"
                                label="Forma de Pagamento"
                                name='formaPagamento'
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={tratarDadosForm}
                            />

                            <TextField
                                autoFocus
                                margin="dense"
                                id="observacao"
                                name='observacao'
                                label="Obrservação"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={tratarDadosForm}
                            />

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog}>Cancelar</Button>
                            <Button onClick={() => { processarSalvar(event, true); }}>Confirmar</Button>
                        </DialogActions>
                    </Dialog>


                    <div>
                        <Dialog open={openCancelarDialogo} onClose={handleCloseCancelarVenda}>
                            <DialogTitle>Deseja Realmente Cancelar a Venda ?</DialogTitle>
                            <DialogContent></DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseCancelarVenda}>Cancelar</Button>
                                <Button onClick={cancelarVenda}>Sim</Button>
                            </DialogActions>
                        </Dialog>
                    </div>

                </div>
            </Card>
        </Card>
    </>);
}


export default VendaCadastrarView;

