import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from 'react-router-dom';
import VendaView from "./components/views/venda/Venda";
import VendaCadastrarView from "./components/views/venda/VendaCadastrar";
import CadastroView from "./components/views/cadastro/Cadastro";
import ProdutoListaView from "./components/views/produto/listar/ProdutoLista";
import ProdutoCadastroView from "./components/views/produto/cadastrar/ProdutoCadastro";
import LoginView from "./components/views/login/LoginView";
import TrocarSenhaForm from "./components/views/user/TrocarSenhaForm";
import TrocarSenhaView from "./components/views/user/TrocarSenhaView";


//import { useAuth } from "./context/AuthContext";


const privateRouter = [
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
        element: <VendaCadastrarView />
    },
    {
        path: "/venda/:id/editar",
        element: <VendaCadastrarView />
    },
    {
        path: "/cadastro",
        element: <CadastroView />
    },
    {
        path: "/produto",
        element: <ProdutoListaView />
    },
    {
        path: "/produto/cadastrar",
        element: <ProdutoCadastroView />
    },
    {
        path: "/produto/:id/editar",
        element: <ProdutoCadastroView />
    },
    {
        path: "/login",
        element: <LoginView />
    }
    ,
    {
        path: "/login/trocar-senha",
        element: <TrocarSenhaView />
    }




];

const publicRouter = [{
    path: "/login",
    element: <LoginView />
}
]






export default function AppRoutes() {

    //const context = useContext(AuthContext);

    /*  let router;
      if (context.isLogado) {
          console.log("tá logado");
          router = createBrowserRouter(privateRouter);
      } else {
          console.log("Não tá logado");
          router = createBrowserRouter(publicRouter);
      }*/

    const router = createBrowserRouter(privateRouter);
    return (

        <RouterProvider router={router} />


    );
}