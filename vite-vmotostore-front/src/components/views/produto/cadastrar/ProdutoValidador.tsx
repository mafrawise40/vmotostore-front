import { Alert, Snackbar, SnackbarOrigin } from "@mui/material";
import React from "react";

function ProdutoValidador(props: any) {


    const validarForm = () => {
        console.log(props.msgErro);
    }


    interface State extends SnackbarOrigin {
        open: boolean;
    }

    const [msgErro, setMsgErro] = React.useState('');
    const [state, setState] = React.useState<State>({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;

    const handleClick = (newState: SnackbarOrigin) => () => {
        setState({ ...newState, open: true });
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setState({ ...state, open: false });
    };

    return (<>
        <Snackbar open={props.isErro} autoHideDuration={6000} anchorOrigin={{ vertical, horizontal }}

            onClose={handleClose}
            message={msgErro}
            key={vertical + horizontal}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {msgErro}
            </Alert>
        </Snackbar>
    </>)


}


export default ProdutoValidador;