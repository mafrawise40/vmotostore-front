import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormatadorMonetario from '../../utils/MonetarioUtil';

export default function MaoDeObraFormDialog(props: any) {
    //const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        //setOpen(true);
        props.setOpen(true);
    };

    const handleClose = () => {
        //setOpen(false);
        props.setOpen(false);
    };

    return (
        <div>

            <Dialog open={props.open} onClose={handleClose}>
                <DialogTitle>Adicionar Serviço</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="nome"
                        label="Descrição da Mão-de-obra"
                        type="text"
                        fullWidth
                        variant="standard"
                        name="nome"
                        onChange={props.tratarDadosForm}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="precoVenda"
                        name="precoVenda"
                        label="Preço da Mão-de-obra"
                        type="text"
                        fullWidth
                        variant="standard"
                        onInput={FormatadorMonetario.mascaraMoeda}
                        onChange={props.tratarDadosForm}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={props.adicionar}>Adicionar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}