import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { Card, Label, TextInput } from "flowbite-react";
import ProdutoDataTable from "./ProdutoListaTabela";
import { useNavigate } from "react-router-dom";

function ProdutoListaComponentsView(props: any) {
    const navigate = useNavigate();

    const getFormFiltro = () => {
        return (
            <Card>
                <form className="">


                    <div className="grid gap-6 mb-2 md:grid-cols-2">


                        <div className="mb-2 block">
                            <br />
                            <ButtonGroup variant="contained" aria-label="outlined primary button group">


                                <Button type='button' onClick={() => { navigate('/produto/cadastrar') }}   >Novo Produto</Button>
                            </ButtonGroup>

                        </div>
                    </div>



                </form>
            </Card>

        )
    }

    return (

        <Card style={{ 'width': '100%' }} >

            <Box sx={{ width: '100%' }}>
                <Typography variant="h4" gutterBottom>
                    Produtos
                </Typography>
                {getFormFiltro()}

            </Box>
            <div><ProdutoDataTable
                produtos={props.produtos}
                deletarProduto={props.deletarProduto}
                irPaginaEditarProduto={props.irPaginaEditarProduto}
            ></ProdutoDataTable></div>
        </Card>

    );

}

export default ProdutoListaComponentsView;