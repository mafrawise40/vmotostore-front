import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TrocarSenhaForm from "./TrocarSenhaForm";
import React from "react";
import { Alert, AlertColor, Snackbar, SnackbarOrigin } from "@mui/material";

function TrocarSenhaView() {
    const navigate = useNavigate();

    const [formulario, setFormulario] = useState({} as any);

    const setForm = (event: any) => {
        const { name, value } = event.target;
        setFormulario({
            ...formulario,
            [name]: value,
        });
    }

    const setFormManual = function (nome: string, valor: any) {
        setFormulario({
            ...formulario,
            [nome]: valor,
        });
    }


    const processarTrocarSenha = async () => {

        try {
            let response;

            console.log(formulario);
            response = await axios.post(`${import.meta.env.VITE_URL_BACK_NODE}/user/trocar-senha`, formulario);
            if (response.status === 200) {

                setState({ vertical: 'top', horizontal: 'center', open: true });

                setTipoErro('success');
                setMsgErro(response.data.msg);
                await new Promise(f => setTimeout(f, 3000));

                navigate('/venda');

            } else {
                setState({ vertical: 'top', horizontal: 'center', open: true });
                setTipoErro('error');
                setMsgErro(response.data.msg);
            }
        } catch (error) {
            console.log(error);
        }
    }

    /**
         * Msg de Erro
         */
    interface State extends SnackbarOrigin {
        open: boolean;
    }

    const [msgErro, setMsgErro] = React.useState('');
    const [tipoErro, setTipoErro] = React.useState<AlertColor>();
    const [state, setState] = React.useState<State>({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setState({ ...state, open: false });
    };


    return (<>
        <TrocarSenhaForm processarTrocarSenha={processarTrocarSenha} formulario={formulario} setForm={setForm} setFormManual={setFormManual}></TrocarSenhaForm>

        <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical, horizontal }}

            onClose={handleClose}
            message={msgErro}
            key={vertical + horizontal}>
            <Alert onClose={handleClose} severity={tipoErro} sx={{ width: '100%' }}>
                {msgErro}
            </Alert>
        </Snackbar>
    </>);

}

export default TrocarSenhaView;