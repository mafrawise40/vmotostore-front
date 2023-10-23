import './App.css'
import { Header } from './components/layout/Header'
import FooterPage from './components/layout/Footer'
import AppRoutes from './AppRoutes'

function App() {


  return (

    <>

      <Header></Header>

      <div id='content' className="flex items-center justify-center">
        <AppRoutes></AppRoutes>

      </div>


      <FooterPage></FooterPage>

    </>

  )
}

export default App
