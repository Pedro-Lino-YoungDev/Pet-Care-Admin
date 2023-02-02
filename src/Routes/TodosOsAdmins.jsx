import { useEffect, useState } from 'react';
import Style from '../Style/TodosOsAdmins.module.css';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Botao from '../Components/Botao';

function TodosOsAdmins(){

    if (localStorage.getItem("token") != null) {   

        const DataAtual = new Date();
        const HorarioTokenFormatado = parseInt(DataAtual.valueOf()/1000);

        const token_jwt = localStorage.getItem("token");
        const TokenDecodificado = jwtDecode(token_jwt);
        
        if (TokenDecodificado.exp > HorarioTokenFormatado) {

            const [admins, setAdmins] = useState([]);
            const [erro, setErro] = useState();
            const [animacao,setAnimacao] = useState(true);


            const token = {
                "token" : localStorage.getItem("token")
            }
        
            useEffect(() => {
                axios.post("https://backend-petcare.herokuapp.com/admins",token)
                .then((res) => setAdmins(res.data[0]))
                .catch((res) => setErro(res.response.data.message))
                .finally(() => setAnimacao(false))
            },[]);

            while (animacao == true) {
                return (
                    <div className={Style.ContainerPadrao}>
                        <div className={Style.Carregamento}></div>
                        {
                            console.clear()
                        }
                    </div>
                )
            }
            return(
                <div>
                    <div className={Style.ContainerMinimal}>       
                        {admins.map((adm,i)=> 
                        <div className={Style.ContainerBlock} key ={adm.email}>
                            <h1 className={Style.ContainerBlockH1}>
                                <img className={Style.ContainerBlockImg} src={adm.photo} alt=""/>
                            </h1>
                            <div className={Style.ContainerBlockH2}>
                                <h4 className={Style.ContainerBlockH4}>
                                    Nome:
                                </h4>
                                <p className={Style.espaço}></p>
                                <p className={Style.ContainerBlockP}>
                                    {adm.name}
                                </p>
                                <p className={Style.espaço}></p>
                                <h4 className={Style.ContainerBlockH4}>
                                    Org:
                                </h4>
                                <p className={Style.espaço}></p>
                                <p className={Style.ContainerBlockP}>
                                    {adm.org}
                                </p>
                                <p className={Style.espaço}></p>
                                <h4 className={Style.ContainerBlockH4}>
                                    Email:
                                </h4>
                                <p className={Style.espaço}></p>
                                <p className={Style.ContainerBlockP}>
                                    <a href={"mailto:"+adm.email}>{adm.email}</a>
                                </p>
                                <p className={Style.espaço}></p>
                                <p className={Style.espaço}></p>
                                {adm.email == TokenDecodificado.email &&(
                                    <>
                                        <p className={Style.ContainerBlockPAlt}>
                                                <Botao tipo="redirecionar" nome="Modificar" estado={{from:adm}} rota="/perfil/atualizar"></Botao>
                                        </p>
                                    </>
                                )
                                }
                            </div>
                        </div>
                        )}
                    </div>
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
export default TodosOsAdmins