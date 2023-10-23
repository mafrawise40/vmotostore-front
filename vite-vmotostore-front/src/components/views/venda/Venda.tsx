
'use client';

import { Box, ButtonGroup, Container, Grid, Paper, Typography, styled } from '@mui/material';
import axios from 'axios';
import { Button, Card, Label, TextInput } from 'flowbite-react';
import { Badge } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FormatadorMonetario from '../../../utils/MonetarioUtil';
import DateUtil from '../../../utils/DateUtils';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import Auth from '../../../utils/AuthUtils';


function VendaView() {

    let dataHoje = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())).toISOString().slice(0, 10);

    let [itensVenda, setItensVenda] = useState([]);
    let [dataInicio, setDataInicio] = useState(dataHoje);
    let [dataFim, setDataFim] = useState('');
    let [valorTotalFinalizado, setValorTotalFinalizado] = useState(0);
    let [valorTotalVendasAbertas, setValorTotalVendasAbertas] = useState(0);
    let [qtdVendasFinalizadas, setQtdVendasFinalizadas] = useState(0);
    let [qtdVendasAbertas, setQtdVendasAbertas] = useState(0);

    const calcularValorTotalVendas = (data: any[]) => {
        let valorTotalVendasFinalizadas = 0;
        let valorTotalVendasAbertas = 0;
        let qtdVendasFinalizadas = 0;
        let qtdVendasAbertas = 0;
        for (let element of data) {

            if (element.status === 'finalizado') {
                valorTotalVendasFinalizadas = valorTotalVendasFinalizadas + element.valorTotal;
                qtdVendasFinalizadas++;
            }

            if (element.status === 'aberto') {
                valorTotalVendasAbertas = valorTotalVendasAbertas + element.valorTotal;
                qtdVendasAbertas++;
            }
        }
        setValorTotalFinalizado(valorTotalVendasFinalizadas);
        setValorTotalVendasAbertas(valorTotalVendasAbertas);
        setQtdVendasFinalizadas(qtdVendasFinalizadas);
        setQtdVendasAbertas(qtdVendasAbertas);
    }

    useEffect(() => {
        // Função para buscar os dados do banco de dados
        const getVendas = async () => {
            try {
                const hoje = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())).toISOString().slice(0, 10);
                const dadosDoFormulario = { dataInicio: hoje, dataFim: '' };




                const response = await axios.post(`${import.meta.env.VITE_URL_BACK_NODE}/venda/filtro`, dadosDoFormulario, Auth.getHeaderAuth());


                setItensVenda(response.data); // Atualize o estado com os dados recuperados
                calcularValorTotalVendas(response.data);
            } catch (error: any) {
                console.log(error);
            }
        };



        getVendas(); // Chame a função para buscar os dados quando o componente for montado
    }, []); // O segundo argumento vazio [] garante que isso só será executado uma vez, após a montagem inicial


    let finalizarVenda = async (id: number, index: number) => {
        try {
            const dadosDoFormulario = { status: 'finalizado' };


            const response = await axios.put(`${import.meta.env.VITE_URL_BACK_NODE}/venda/` + id, dadosDoFormulario, Auth.getHeaderAuth()); // Substitua pela URL da sua API

            if (response.status === 201) {
                setItensVenda((prevState: any) =>
                    prevState.map((item: any, i: number) =>
                        i === index ? { ...item, status: 'finalizado' } : item
                    )
                );
            }
        } catch (error: any) {
            console.log(error);
        }


    }

    let pesquisar = async () => {


        try {

            const dadosDoFormulario = { dataInicio: dataInicio, dataFim: dataFim };
            const response = await axios.post(`${import.meta.env.VITE_URL_BACK_NODE}/venda/filtro`, dadosDoFormulario, Auth.getHeaderAuth());
            setItensVenda(response.data);
            calcularValorTotalVendas(response.data);

            console.log(response.data);

        } catch (error: any) {
            console.log(error);
        }
    }


    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));


    return (<>

        <Card className="" style={{ 'width': '100%', 'marginTop': '60px' }}
            href="#"
        >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <p style={{ 'alignItems': 'center', 'justifyContent': 'center', 'textAlign': 'center' }}>
                    Vendas
                </p>
            </h5>

            <Card >
                <Container maxWidth="xl">
                    <form className="">
                        <div className="grid gap-6 mb-2 md:grid-cols-3">
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="dataInicio"
                                    value="Data Inícial"
                                />
                                <TextInput
                                    id="dataInicio"
                                    name='dataInicio'
                                    required
                                    shadow
                                    placeholder=''
                                    type="date"
                                    value={dataInicio}
                                    onChange={(e: any) => {
                                        setDataInicio(e.target.value);
                                    }}

                                />
                            </div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="dataFim"
                                    value="Data Final"
                                />

                                <TextInput
                                    id="dataFim"
                                    required
                                    shadow
                                    placeholder=''
                                    type="date"
                                    name='dataFim'
                                    onChange={(e: any) => {
                                        setDataFim(e.target.value);
                                    }}

                                />
                            </div>


                            <div className="mb-2 block">
                                <br />
                                <ButtonGroup variant="contained" aria-label="outlined primary button group">


                                    <Button type='button' onClick={pesquisar}  >Pesquisar</Button>
                                </ButtonGroup>

                            </div>
                            <div className="mb-2 block">
                                <Item> <Link to="/venda/cadastrar" className="inline-flex w-full justify-center rounded-lg bg-cyan-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900">Nova Venda</Link></Item>
                            </div>
                        </div>


                        <div className="mb-2 block"></div>

                        <div className="grid gap-6 mb-6 md:grid-cols-2">

                        </div>
                    </form>
                </Container>
            </Card>
            <Card>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid sx={{ flexGrow: 1 }}>
                        <Grid container item spacing={1}  >
                            <Badge color="gray">  <Typography variant="subtitle2" display="block" gutterBottom>
                                Vendas a partir do dia: <b>{DateUtil.getStringDataToString(dataInicio)} {dataFim && " até o dia " + DateUtil.getStringDataToString(dataFim) || ' até esse exato momento.'} </b>
                            </Typography> </Badge>
                        </Grid>
                        <Grid container item spacing={0}  >
                            <Badge color="success">Total de Vendas: {itensVenda.length || 0} </Badge>
                            <Badge color="success">Total de Vendas em aberto: {qtdVendasAbertas || 0} </Badge>
                            <Badge color="success">Valor Total de Vendas Abertas: {FormatadorMonetario.mascaraMoeda(valorTotalVendasAbertas)}</Badge>

                        </Grid>
                        <Grid container item spacing={0}  >
                            <Badge color="info">Total de Vendas em Finalizadas: <b>{qtdVendasFinalizadas || 0}</b></Badge>
                            <Badge color="info">Valor Total de Vendas Finalizadas: <b>{FormatadorMonetario.mascaraMoeda(valorTotalFinalizado)} </b></Badge>
                        </Grid>

                    </Grid>
                </Box>
            </Card>




            <Grid container spacing={2} >


                {(itensVenda !== null && itensVenda !== undefined && itensVenda.length > 0) ? itensVenda.map((item: any, index: number) => {
                    return (<>
                        <Grid   >
                            <Card key={item._id} >

                                <Badge color="gray">{DateUtil.getDataHoraFormatadaToString(item.criadoEm)}</Badge>
                                {item.status === 'aberto' ? <><Badge color="success">Aberto</Badge></> :
                                    item.status === 'finalizado' ? <><Badge color="info">Finalizado</Badge></> : <><Badge color="failure">Cancelado</Badge></>
                                }
                                <h5 style={{ 'color': 'black', 'fontWeight': 'bold' }} className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
                                    <SportsMotorsportsIcon color='primary'></SportsMotorsportsIcon> {item.cliente?.nome}
                                </h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                    <PhoneAndroidIcon color='success'></PhoneAndroidIcon> {item.cliente?.telefone}
                                </p>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                    <TwoWheelerIcon color='error'></TwoWheelerIcon> {item?.modeloMoto}
                                </p>



                                <ul className="my-7 space-y-5">
                                    {item.produtos.map((produtos: any) => {
                                        return (<>
                                            <li className="flex space-x-3" >
                                                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                                    <b> {produtos.quantidade} x</b> {produtos?.produto?.nome}  <b>{FormatadorMonetario.formatarValorMonetario(produtos?.produto?.precoVenda, "R$")} </b>
                                                </span>
                                            </li>
                                        </>
                                        )
                                    }
                                    )}
                                </ul>


                                <div>
                                    Desconto: {FormatadorMonetario.formatarValorMonetario(item.descontoNoValorTotal, "R$")}
                                </div>

                                <div className="flex items-baseline text-gray-900 dark:text-white">
                                    <span className="text-3xl font-semibold">
                                        R$
                                    </span>
                                    <span className="text-5xl font-extrabold tracking-tight">
                                        {FormatadorMonetario.formatarValorMonetario(item.valorTotal, "")}
                                    </span>
                                    <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                                        total
                                    </span>
                                </div>

                                <Link to={"/venda/" + item._id + '/editar'}
                                    className="inline-flex w-full justify-center rounded-lg bg-cyan-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900"
                                    type="button"
                                >
                                    <p>
                                        Editar
                                    </p>
                                </Link>


                            </Card >
                        </Grid>
                    </>)
                }

                ) : <></>}

            </Grid >


        </Card >


    </>);
}


export default VendaView;