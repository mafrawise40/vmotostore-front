'use client';

import { Logout, PersonAdd, Settings } from '@mui/icons-material';
import { Avatar, Box, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import React from 'react';
import Auth from '../../utils/AuthUtils';



export const Header = () => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {

        Auth.destroStorage();
        setAnchorEl(null);

    }

    const [anchorElRelatorio, setAnchorElRelatorio] = React.useState<null | HTMLElement>(null);
    const openRelatorio = Boolean(anchorElRelatorio);
    const handleClickRelatorio = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElRelatorio(event.currentTarget);
    };
    const handleCloseRelatorio = () => {
        setAnchorElRelatorio(null);
    };


    return (
        <div className='container'>
            <Box sx={{ position: 'center', alignContent: 'center', gridArea: 'header', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Typography sx={{ minWidth: 100 }}>Home</Typography>
                <a href="/venda">Vendas</a>
                <Typography sx={{ minWidth: 100 }}><a href='/cadastro'>Cadastro</a></Typography>

                <Typography sx={{ minWidth: 100 }}> <Button
                    id="basic-button"
                    aria-controls={openRelatorio ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openRelatorio ? 'true' : undefined}
                    onClick={handleClickRelatorio}
                >
                    Relatórios
                </Button></Typography>

                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="large"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 50, height: 32 }}>O</Avatar>
                    </IconButton>
                </Tooltip>
            </Box>


            <Menu
                id="basic-menu"
                anchorEl={anchorElRelatorio}
                open={openRelatorio}
                onClose={handleCloseRelatorio}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleCloseRelatorio}>Relatório de Vendas</MenuItem>
            </Menu>


            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    <a href='/login/trocar-senha'>
                        <Avatar /> Trocar Senha
                    </a>
                </MenuItem>

                <Divider />


                <MenuItem onClick={logout} >
                    <a href='/login'>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Sair
                    </a>
                </MenuItem>
            </Menu>
        </div>
    );
};