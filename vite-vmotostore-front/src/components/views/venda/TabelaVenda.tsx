'use client';

import { Table } from 'flowbite-react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormatadorMonetario from '../../../utils/MonetarioUtil';

export default function TabelaVenda(props: any) {


    interface ProdutoVenda {
        
        produto: any,
        quantidade: number,
        valor: number
    }

    const [open, setOpen] = React.useState(false);
    const [qtd, setQtd] = React.useState(1);
    const [id, setId] = React.useState(0);

    const handleClickOpen = (pQtd: number, id: number) => {
        setQtd(pQtd);
        setId(id);
        setOpen(true);
    };

    const salvarQtd = (e: any) => {
        setQtd(Number(e.target.value));
    }

    const handleClose = function (e: any) {
        setOpen(false);
    };

    const alterarQtd = function () {
        props.alterarQuantidade(id, qtd)
        setOpen(false);
    };


    const removerItem = function (id: number) {
        props.deletar(id);
    }

    const itens: ProdutoVenda[] = props.itens;



    return (<>

        <br></br>
        <Table striped>
            <Table.Head>
                <Table.HeadCell>
                    Produto / Serviço
                </Table.HeadCell>
                <Table.HeadCell>
                    Quantidade
                </Table.HeadCell>
                <Table.HeadCell>
                    Preço
                </Table.HeadCell>

                <Table.HeadCell>
                    <span className="sr-only">
                        Ação
                    </span>
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y" >
                <>
                    {itens.map((item: ProdutoVenda) => {
                        return (
                            <Table.Row key={item.produto._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {item.produto?.nome + ' - ' + item.produto?.aplicacao}
                                </Table.Cell>
                                <Table.Cell>
                                    {item.quantidade} <button onClick={() => handleClickOpen(item.quantidade, item.produto._id)} type='button'  ><AddBoxIcon color='success'></AddBoxIcon></button>
                                </Table.Cell>

                                <Table.Cell>
                                    <AttachMoneyIcon color='success' />  {FormatadorMonetario.formatarValorMonetario(item.valor , "R$")}
                                </Table.Cell>

                                <Table.Cell>
                                    <a onClick={() => removerItem(item.produto._id)}
                                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"

                                    >
                                        <DeleteForeverIcon titleAccess='Remover Produto' color='error' />
                                    </a>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </>


            </Table.Body>
        </Table>




        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Alterar Quantidade</DialogTitle>
            <DialogContent>
                <DialogContentText>

                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="qtd"
                    label="Quantidade"
                    type="number"
                    fullWidth
                    variant="standard"
                    defaultValue={qtd}
                    onChange={salvarQtd}
                >
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={() => alterarQtd()}>Alterar</Button>
            </DialogActions>
        </Dialog>
    </>
    )
}


