import './App.css'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import BarraDeNavegação from './Components/Navbar'
import Rodapé from'./Components/Footer'
import Home from './Routes/Home';
import DenunciasDoUsuario from './Routes/DenunciasDoUsuario';
import Registro from './Routes/Registro';
import Login from './Routes/Login';
import ModificarDenuncia from './Routes/ModificarDenuncia'
import Denuncia from './Routes/Denuncia';
import Perfil from './Routes/Perfil';
import AtualizarPerfil from './Routes/AtualizarPerfil';
import Sobre from "./Routes/Sobre"
import Contato from "./Routes/Contato"
import Politicas from "./Routes/Politicas"
import TodosUsuarios from './Routes/TodosUsuarios';
import TodasDenuncias from "./Routes/TodasDenuncias"
import TodosOsAdmins from "./Routes/TodosOsAdmins"
import AtualizarEstado from './Routes/AtualizarEstado';
import ModificarUsuario from './Routes/ModificarUsuario';
import EstadoDenuncia from './Routes/EstadoDenuncia';

function App() {

  return (
    <Router >
    <BarraDeNavegação/>
    <Routes >

        {/*Páginas de denúncia*/}
        
          {/*Páginas de denúncia gerais*/}
          <Route path="/denuncias" element={<TodasDenuncias/>}/>
          <Route path='/denuncias/:id' element={<Denuncia />} />
          <Route path="/denuncias/:id/modificar" element={<ModificarDenuncia/>} />
          <Route path="/denuncias/:id/estado" element={<EstadoDenuncia/>} />
          <Route path="/denuncias/:id/estado/atualizar" element={<AtualizarEstado/>}/>

          {/*Páginas de denúncia referentes ao usuário*/}
          <Route path="/usuarios/:id/denuncias" element={<DenunciasDoUsuario />} />
          <Route path='/usuarios/:id/denuncias/:id' element={<Denuncia />} />
          <Route path="/usuarios/:id/denuncias/:id/modificar" element={<ModificarDenuncia/>} />
          <Route path="/usuarios/:id/denuncias/:id/estado" element={<EstadoDenuncia/>} />
          <Route path="/usuarios/:id/denuncias/:id/estado/atualizar" element={<AtualizarEstado/>}/>

        {/*Páginas básicas*/}
          <Route path="/home" element={<Home />} />
          <Route path="/sobre" element={<Sobre/>}/>
          <Route path="/Contato" element={<Contato/>}/>
          <Route path="/politicas" element={<Politicas/>}/>

        {/*Páginas de autenticação*/}
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />

        {/*Páginas de perfil do administrador*/}
          <Route path="/perfil" element={<Perfil/>}/>
          <Route path="/perfil/atualizar" element={<AtualizarPerfil />}/>

        {/*Páginas de usuarios*/}
          <Route path="/usuarios" element={<TodosUsuarios/>}/>
          <Route path="/usuarios/:id/modificar" element={<ModificarUsuario/>}/>

        {/*Página de ver outros administradores*/}
          <Route path="/admins" element={<TodosOsAdmins/>}/>

        {/*Redirecionamento de / para home*/}
          <Route exact path="/" element={ <Navigate to="/home"/> }/>


    </Routes>
    <Rodapé />
    </Router>
  )
}

export default App
