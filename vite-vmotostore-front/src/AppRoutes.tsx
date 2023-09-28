import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from 'react-router-dom';
import VendaView from "./components/views/venda/Venda";
import VendaCadastrarView from "./components/views/venda/VendaCadastrar";
import CadastroView from "./components/views/cadastro/Cadastro";
import ProdutoListaView from "./components/views/produto/listar/ProdutoLista";
import ProdutoCadastroView from "./components/views/produto/cadastrar/ProdutoCadastro";




const router = createBrowserRouter([
    {
        path: "/",
        element: <div>HOME - PAGE !</div>,
    },
    {
        path: "/venda",
        element: <VendaView />
    },
    {
        path: "/venda/cadastrar",
        element: <VendaCadastrarView/>
    },
    {
        path: "/venda/:id/editar",
        element: <VendaCadastrarView/>
    },
    {
        path: "/cadastro",
        element: <CadastroView/>
    },
    {
        path: "/produto",
        element: <ProdutoListaView/>
    },
    {
        path: "/produto/cadastrar",
        element: <ProdutoCadastroView/>
    },
    {
        path: "/produto/:id/editar",
        element: <ProdutoCadastroView/>
    },

]);



export default function AppRoutes() {

    return (
        <RouterProvider router={router} />
    );
}