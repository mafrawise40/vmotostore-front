import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import FormatadorMonetario from '../../../utils/MonetarioUtil';
import Button from '@mui/material/Button';

interface Produto {
    _id: any,
    nome: string,
    codigo: string,
    fornecedor: string,
    quantidade: number,
    quantidadeVenda: number,
    precoCompra: number,
    precoVenda: number,
    tipo: string, //serviço ou produto
    aplicacao: string,
    criadoEm: Date,
    alteradoEm: Date
}

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}





export default function Asynchronous(props: any) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<readonly Produto[]>([]);
    const [produtos, setProdutos] = React.useState<readonly Produto[]>([]);
    const loading = open && options.length === 0;


  
    React.useEffect(() => {
        let active = true;
        setProdutos(props.itens);
        setOptions(props.itens);

        if (!loading) {
            return undefined;
        }

        (async () => {
            await sleep(1); // For demo purposes.

            if (active) {
                setOptions([...produtos]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (<>
        <Autocomplete
            id="asynchronous-demo"
            sx={{ width: '100%' }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option.nome === value.nome}
            getOptionLabel={(option) => option.nome + " " + FormatadorMonetario.formatarValorMonetario(option.precoVenda , "R$") + " - " + option.aplicacao}
            options={options}
            loading={loading}
            onChange={(event, value) => props.adicionarItem(value)}
            renderInput={(params) => (

                <TextField className=''
                    {...params}

                    label="Pesquisar Produtos e Serviços"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}

                />
            )}


        />

    </>

    );
}

// Top films as rated by IMDb users. http://www.imdb.com/chart/top
