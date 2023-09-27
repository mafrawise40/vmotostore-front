'use client';

import { Button, Navbar } from 'flowbite-react';
import { Dropdown } from 'flowbite-react';
import { NavbarLink } from 'flowbite-react/lib/esm/components/Navbar/NavbarLink';
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from 'react-icons/hi';


export const Header = () => {




    return (

        <Navbar
            fluid
            rounded
        >
            <Navbar.Brand href="/">

                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    vMoto Store
                </span>
            </Navbar.Brand>
            <div className="flex md:order-2">

            </div>
            <Navbar.Collapse>
               
                <Navbar.Link active href="/">
                    <p>Home</p>
                </Navbar.Link>

                <Navbar.Link href="/venda">
                    Vendas
                </Navbar.Link>

                <Navbar.Link href="#">
                    Cadastro
                </Navbar.Link>

                <Dropdown
                    label="Perfil"
                >
                    <ul className="py-1 focus:outline-none" >
                        <li role="menuitem" className=""><button type="button" className="flex items-center justify-start py-2 px-4 text-sm text-gray-700 cursor-pointer w-full hover:bg-gray-100 focus:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white" >Configuração</button></li>
                        <li role="menuitem" className=""><button type="button" className="flex items-center justify-start py-2 px-4 text-sm text-gray-700 cursor-pointer w-full hover:bg-gray-100 focus:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white" >Sair</button></li>
                    </ul>

                </Dropdown>


            </Navbar.Collapse>
        </Navbar>

    );
};