import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from 'react-router-dom';
import VendaView from "./components/views/venda/Venda";
import VendaCadastrarView from "./components/views/venda/VendaCadastrar";



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

]);



export default function AppRoutes() {

    return (
        <RouterProvider router={router} />
    );
}