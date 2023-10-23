'use client';

import { Alert, Box, Container, Snackbar, SnackbarOrigin } from "@mui/material";
import { Button, Card, Label, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";


function TrocarSenhaForm(props: any) {

    interface Usuario {
        nome: string,
        email: string
    }



    const [usuario, setUsuario] = useState<Usuario>({} as Usuario);



    useEffect(() => {
        console.log(props);
        const getUsuario = () => {
            let json = {} as Usuario;
            if (localStorage.hasOwnProperty('user')) {
                const data = localStorage.getItem('user');
                if (data !== null) {
                    json = JSON.parse(data) as Usuario;
                    setUsuario(json);
                    props.setFormManual('email', json.email);
                }
            }
            return {} as Usuario;
        }


        getUsuario();


    }, []);



    const validarForm = (): boolean => {

        /*
         * senhaAtual: string,
        senhaNova: string,
        senhaNovaRepetida: string,
         */

        console.log(props.formulario);

        if (props.formulario.senhaAtual == undefined || props.formulario.senhaAtual == null || props.formulario.senhaAtual.length <= 0) {
            setMsgErro("Digite a senha que você usa atualmente.");
            setState({ vertical: 'top', horizontal: 'center', open: true });
            return false;
        }


        if (props.formulario.senhaNova == undefined || props.formulario.senhaNova == null || props.formulario.senhaNova.length <= 6) {
            setMsgErro("A nova senha deve conter no mínimo 6 dígitos.");
            setState({ vertical: 'top', horizontal: 'center', open: true });
            return false;
        }

        if (props.formulario.senhaNova != props.formulario.senhaNovaRepetida) {
            setMsgErro("A nova senha não está igual a nova senha repetida.");
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

                    <div> <Label
                        htmlFor=""
                        value={"Usuario: " + usuario.nome}
                    /></div>

                    <div> <Label
                        htmlFor=""
                        value={"Login: " + usuario.email}
                    /></div>

                    <br />

                    <form className="flex max-w-md flex-col gap-4">
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="senhaAtual"
                                    value="Senha Atual"
                                />
                            </div>
                            <TextInput
                                id="senhaAtual"
                                placeholder=""
                                required
                                name="senhaAtual"
                                type="password"
                                onChange={(e) => props.setForm(e)}
                            />


                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="senhaNova"
                                    value="Nova Senha"
                                />
                            </div>
                            <TextInput
                                id="senhaNova"
                                required
                                type="password"
                                name="senhaNova"
                                onChange={(e) => props.setForm(e)}
                            />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="senhaNovaRepetida"
                                    value="Digite novamente a nova senha"
                                />
                            </div>
                            <TextInput
                                id="senhaNovaRepetida"
                                required
                                type="password"
                                name="senhaNovaRepetida"
                                onChange={(e) => props.setForm(e)}
                            />
                        </div>

                        <Button onClick={() => {
                            if (validarForm()) {
                                props.processarTrocarSenha();
                            }
                        }
                        }
                            type="button">
                            Trocar
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

export default TrocarSenhaForm;