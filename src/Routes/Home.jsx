import Style from '../Style/Home.module.css'
import Boton from '../Components/Botao'
import { Link, Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { useState } from 'react';



function Home(){
    const [navegar, setNavegar] = useState();
    const verificar_token = () =>{
        if (localStorage.getItem("token") != null) {
            const DataAtual = new Date();
            const HorarioTokenFormatado = parseInt(DataAtual.valueOf()/1000);

            const token_jwt = localStorage.getItem("token");
            const TokenDecodificado = jwtDecode(token_jwt); 
            if (TokenDecodificado.exp > HorarioTokenFormatado) {
                return "token válido"
            }
            else{
                return "token inválido"
            }
        }
        else{
            return "token expirado"
        }
    }

    return(
        <div className={Style.ContainerMinimal}>
            <div className={Style.Duplas}>
                <div className={Style.Opção} onClick={() => {setNavegar("Todos os admins")}}>
                        <p>
                        <img src="/Imagens/Admins.svg" alt="" />
                        Todos os admins
                        </p>
                </div>
                <div className={Style.Opção} onClick={() => {setNavegar("Todos usuários")}}>
                    <p>
                        <img src="/Imagens/all.svg" alt="" />
                        Todos usuários
                    </p>
                </div>
            </div>
            <div className={Style.Duplas2}>
                <div className={Style.Opção}  onClick={() => {setNavegar("Todas Denúncias")}}>
                    <p>
                        <img src="/Imagens/denúncias.png" alt="" />
                        Todas denúncias
                    </p>
                </div>
                <div className={Style.Opção} onClick={() => {setNavegar("Minhas Denúncias")}}>
                    <p>
                        <img src="/Imagens/MinhasDenuncias.png" alt="" />
                        Minhas Denúncias
                    </p>
                </div>
            </div>
            { navegar == "Todos os admins" &&(
                <>
                <Navigate to={"/admins"}/>
                </>
            )
            }
            { navegar == "Todos usuários" &&(
                <>
                <Navigate to={"/usuarios"}/>
                </>
            )
            }
            { navegar == "Todas Denúncias" &&(
                <>
                <Navigate to={"/denuncias"}/>
                </>
            )
            }
            { navegar == "Minhas Denúncias" &&(
                <>
                    <Navigate to={"/"}/>
                </>
            )
            }
        </div>
    ) 
}

export default Home