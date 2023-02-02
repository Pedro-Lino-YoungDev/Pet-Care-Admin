import Style from '../Style/User.module.css'
import { Navigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { useEffect , useState } from 'react'
import axios from 'axios'
import Botao from '../Components/Botao'

function Perfil () { 

    if (localStorage.getItem("token") != null) {

        const DataAtual = new Date();
        const HorarioTokenFormatado = parseInt(DataAtual.valueOf()/1000);

        const token_jwt = localStorage.getItem("token");
        const TokenDecodificado = jwtDecode(token_jwt);

        if (TokenDecodificado.exp > HorarioTokenFormatado) {

            const [usuario,setUsuario] = useState();
            const [erro, setErro] = useState();
            const [animacao,setAnimacao] = useState(true);

            const token ={
                "token" : token_jwt
            }

            useEffect(() => {
                axios.post("https://backend-petcare.herokuapp.com/admin/"+TokenDecodificado.id,token)
                .then((res) => setUsuario(res.data.admin))
                .catch((res) => setErro(res))
                .finally(() => setAnimacao(false))
            },[]);

            while(animacao == true){
                return(
                    <div className={Style.ContainerMinimal}>
                        <div className={Style.Carregamento}></div>
                    </div>
                )
            }
            return(
                
                <div>
                    {usuario != null &&(
                        <div className={Style.ContainerMinimal}>
                            <div className={Style.Container}>
                            <div className={Style.ContainerIMG}>
                                <img src={usuario.photo} alt="" />
                            </div>
                            <div >
                                <h4>
                                    Nome do Usuario:
                                </h4>
                                <p>
                                    {usuario.name}
                                </p>
                                <h4>
                                    Organização:
                                </h4>
                                <p>
                                    {usuario.org}
                                </p>
                                <h4>
                                    E-mail do Usuario:
                                </h4>
                                <p>
                                    {usuario.email}
                                </p>
                            </div>
                            </div>
                            <Botao tipo="redirecionar" nome="Modificar Cadastro" rota="atualizar"></Botao>
                            <a href="/home" onClick={ () => {localStorage.removeItem("token"), localStorage.removeItem("foto")}} className={Style.Logout}>
                                Sair
                            </a>
                        </div>
                        
                    )
                    }
                </div>
            )
        }
        else{
            return <Navigate to="/login" />    
        }
    }
    else{
        return <Navigate to="/login" />    
    }
}

export default Perfil;