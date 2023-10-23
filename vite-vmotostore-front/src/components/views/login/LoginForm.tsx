'use client';

import { Alert, Box, Container, Snackbar, SnackbarOrigin } from "@mui/material";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import React from "react";


function LoginForm(props: any) {

  
    const validarForm = (): boolean => {

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

       
        if (props.formulario.email.length <= 0) {
            setMsgErro("Login inválido");
            setState({ vertical: 'top', horizontal: 'center', open: true });
            return false;
        }
        /*if (!emailRegex.test(props.formulario.email)) {
            setMsgErro("Email inválido");
            setState({ vertical: 'top', horizontal: 'center', open: true });
            return false;
        }*/

        if (props.formulario.senha.length <= 0) {
            setMsgErro("Senha inválida");
            setState({ vertical: 'top', horizontal: 'center', open: true });
            return false;
        }

        return true;
    }
    /**
         * Msg de Erro
         */
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



    return (
        <Box width={800}>
            <Card  >
                <Container maxWidth="lg">


                    <form className="flex max-w-md flex-col gap-4">
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="email"
                                    value="Seu e-mail"
                                />
                            </div>
                            <TextInput
                                id="email"
                                placeholder="Digite o seu login"
                                required
                                name="email"
                                type="text"
                                onChange={(e) => props.setForm(e)}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="senha"
                                    value="Sua Senha"
                                />
                            </div>
                            <TextInput
                                id="senha"
                                required
                                type="password"
                                name="senha"
                                onChange={(e) => props.setForm(e)}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox id="remember" />
                            <Label htmlFor="remember">
                                Remember me
                            </Label>
                        </div>
                        <Button onClick={() => {
                            if (validarForm()) {
                                props.processarLogin();
                            }
                        }
                        }
                            type="button">
                            Entrar
                        </Button>
                    </form>
                </Container >
            </Card>

            <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical, horizontal }}

                onClose={handleClose}
                message={msgErro}
                key={vertical + horizontal}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {msgErro}
                </Alert>
            </Snackbar>


        </Box>




    );
}

export default LoginForm;