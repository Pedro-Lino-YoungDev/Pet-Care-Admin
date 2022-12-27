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
import TodosUsuarios from './Routes/TodosUsuarios';
import TodasDenuncias from "./Routes/TodasDenuncias"
import TodosOsAdmins from "./Routes/TodosOsAdmins"
import AtualizarDenuncia from './Routes/AtualizarDenuncia';

function App() {
  
  return (
    <Router >
    <BarraDeNavegação/>
    <Routes >
        <Route path="/home" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/minhas_denuncias" element={<Listagem />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/modifica_rdenuncia" element={<ModificarCadastro />} />
        <Route path='/denuncia' element={<Denuncia />} />
        <Route path="/usuario" element={<User/>}/>
        <Route path="/modificar_cadastro_do_usuario" element={< Modificarcadastrodousuario />}/>
        <Route path="/sobre" element={<Sobre/>}/>
        <Route path="/politicas_da_empresa" element={<Politicas/>}/>
        <Route path="/Contato" element={<Contato/>}/>
        <Route path="/todos_usuarios" element={<TodosUsuarios/>}/>
        <Route path="/todos_admins" element={<TodosOsAdmins/>}/>
        <Route path="/todas_denuncias" element={<TodasDenuncias/>}/>
        <Route path="/atualizar_denuncia" element={<AtualizarDenuncia/>}/>

        <Route exact path="/" element={ <Navigate to="/home"/> }/>
    </Routes>
    <Rodapé />
    </Router>
  )
}

export default App
