import Style from '../Style/Home.module.css'
import Boton from '../Components/Botao'
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';



function Home(){
    var teste = false;
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
                <div className={Style.Opção}>
                        <p>
                        <Link to={"/sobre"}>
                        <img src="/Imagens/Admins.svg" alt="" />
                        
                        
                        </Link>Todos os admins
                        </p>
                </div>
                <div className={Style.Opção}>
                    <p>
                        <Link to={"/sobre"}>
                        <img src="/Imagens/all.svg" alt="" />
                        </Link>Todos usuários
                    </p>
                </div>
            </div>
            <div className={Style.Duplas2}>
                <div className={Style.Opção}>
                    <p>
                        <Link to={"/sobre"}>
                        <img src="/Imagens/denúncias.png" alt="" />
                        </Link>Todas denúncias
                    </p>
                </div>
                <div className={Style.Opção}>
                    <p>
                        <Link to={"/sobre"}>
                        <img src="/Imagens/MinhasDenuncias.png" alt="" />
                        </Link>Minhas Denúncias
                    </p>
                </div>
            </div>

        </div>
    ) 
}

export default Home