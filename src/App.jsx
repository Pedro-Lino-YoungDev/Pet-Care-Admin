import './App.css'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import BarraDeNavegação from './Components/Navbar'
import Rodapé from'./Components/Footer'
import Home from './Routes/Home';
import Cadastro from './Routes/Cadastro';
import Listagem from './Routes/Listagem';
import Registro from './Routes/Registro';
import Login from './Routes/Login';
import ModificarCadastro from './Routes/ModificarCadastro'
import Denuncia from './Routes/Denuncia';
import User from './Routes/User';
import Modificarcadastrodousuario from './Routes/ModificarCadastroDoUsuario';
import Sobre from "./Routes/Sobre"
import Contato from "./Routes/Contato"
import Politicas from "./Routes/Politicas"

function App() {
  
  return (
    <Router >
    <BarraDeNavegação/>
    <Routes >
        <Route path="/home" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/listagem" element={<Listagem />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/modificardenuncia" element={<ModificarCadastro />} />
        <Route path='/denuncia' element={<Denuncia />} />
        <Route path="/usuario" element={<User/>}/>
        <Route path="/modificarcadastrodousuario" element={< Modificarcadastrodousuario />}/>
        <Route path="/sobre" element={<Sobre/>}/>
        <Route path="/politicas_da_empresa" element={<Politicas/>}/>
        <Route path="/Contato" element={<Contato/>}/>
        <Route exact path="/" element={ <Navigate to="/home"/> }/>
    </Routes>
    <Rodapé />
    </Router>
  )
}

export default App
