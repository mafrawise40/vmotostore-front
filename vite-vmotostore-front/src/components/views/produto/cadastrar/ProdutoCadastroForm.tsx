import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { Card, Label, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";

function ProdutoCadastroFormView(props: any) {
    const navigate = useNavigate();



    const getBotaoCadastrar = () => {
        return (<Button type='button' onClick={(event) => {
            props.processarSalvar(event, false);
        }} color="primary">Cadastrar</Button>);
    }



    const getForm = () => {
        return (<Card   >
            <form className="">
                <div className="grid gap-6 mb-2 md:grid-cols-2">


                    <div className="mb-2 block">
                        <br />
                        <Typography variant="h5" gutterBottom>
                            Descrição
                        </Typography>

                    </div>
                </div>

                <br />

                <div className="grid gap-6 mb-2 md:grid-cols-4">


                    <div className="mb-2 block">
                        <Label
                            htmlFor="codigo"
                            value="Código do Produto"
                        />
                        <TextInput
                            id="codigo"
                            name='codigo'
                            shadow
                            placeholder='Digite o código do produto'
                            type="text"
                            onChange={props.tratarDadosForm}

                        />
                    </div>

                </div>


                <div className="grid gap-6 mb-2 md:grid-cols-4">
                    <div className="mb-2 block">
                        <Label
                            htmlFor="nome"
                            value="Descrição"
                        />
                        <TextInput
                            id="nome"
                            name='nome'
                            required
                            shadow
                            placeholder='Digite a descrição do produto'
                            type="text"
                            onChange={props.tratarDadosForm}

                        />
                    </div>

                    <div className="mb-2 block">
                        <Label
                            htmlFor="aplicacao"
                            value="Aplicação"
                        />
                        <TextInput
                            id="aplicacao"
                            name='aplicacao'
                            required
                            shadow
                            placeholder='Ex: CRF 230 2020, CB 250 twister 2018'
                            type="text"
                            onChange={props.tratarDadosForm}

                        />
                    </div>



                </div>

                <div className="grid gap-6 mb-2 md:grid-cols-10">



                    <div className="mb-2 block">
                        <Label
                            htmlFor="precoCompra"
                            value="Preço de Compra"
                        />
                        <TextInput
                            addon="R$"
                            id="precoCompra"
                            name='precoCompra'
                            required
                            shadow
                            placeholder=''
                            type="text"
                            onChange={props.tratarDadosForm}

                        />
                    </div>

                    <div className="mb-2 block">
                        <Label
                            style={{ 'fontWeight': 'bold' }}
                            htmlFor="precoVenda"
                            value="Preço de Venda"
                            color={'red'}

                        />
                        <TextInput
                            addon="R$"
                            id="precoVenda"
                            name='precoVenda'
                            required
                            shadow
                            placeholder=''
                            type="text"
                            onChange={props.tratarDadosForm}

                        />
                    </div>
                    <div className="mb-2 block " ></div>
                    <div className="mb-2 block " >
                        <Label
                            htmlFor="quantidade"
                            value="Quantidade em estoque"
                        />
                        <TextInput
                            id="quantidade"
                            name='quantidade'
                            required
                            shadow
                            placeholder=''
                            type="text"
                            style={{ 'width': '100px' }}
                            onChange={props.tratarDadosForm}

                        />
                    </div>


                </div>


                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div className="mb-2 block">
                        <Label
                            htmlFor="fornecedor"
                            value="Fornecedor"
                        />
                        <TextInput
                            id="fornecedor"
                            name='fornecedor'
                            required
                            shadow
                            placeholder=''
                            type="text"
                            onChange={props.tratarDadosForm}

                        />
                    </div>
                </div>

                <div className="mb-2 block"></div>

                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div className="mb-2 block">
                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                            <Button type='button' onClick={() => {
                                navigate('/produto');
                            }} color="info" >Voltar</Button>
                        </ButtonGroup>

                    </div>

                    <div className="mb-2 block">
                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                            {getBotaoCadastrar()}

                        </ButtonGroup>

                    </div>
                </div>
            </form>
        </Card >)

    }

    return (

        <Card style={{ 'width': '100%' }} >

            <Box sx={{ width: '100%' }}>
                <Typography variant="h4" gutterBottom>
                    Cadastro de Produto
                </Typography>
                {getForm()}

            </Box>

        </Card>

    );

}



export default ProdutoCadastroFormView;