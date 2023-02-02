import Style from "../Style/EstadoDenuncia.module.css"
import Botao from '../Components/Botao'
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Navigate, useParams } from 'react-router-dom';
import { useEffect } from "react";
import { useState } from "react";


function EstadoDenuncia() {

    if (localStorage.getItem("token") != null) {

        const token = localStorage.getItem("token");
        const decodificado = jwtDecode(token);
        const DataAtual = new Date();
        const HorarioTokenFormatado = parseInt(DataAtual.valueOf()/1000)

            if (decodificado.exp > HorarioTokenFormatado) {
            const Id = useParams().id

            const [estado,setEstado] = useState()
            const [erro,setErro] = useState()

            useEffect(() => {
                axios.post("https://backend-petcare.herokuapp.com/status/"+Id,{"token" : token})
                .then((res) => setEstado(res.data))
                .catch((res) => setErro(res.response.data))
            },[]);
            return(
                <div className={Style.ContainerMinimal}>
                    <div className={Style.Estado}>
                        <h3>
                            {estado != null && estado.status}
                        </h3>
                    </div>
                    <div className={Style.DivText}>
                        <p>
                            {estado != null && estado.message}
                        </p>
                    </div>
                    <div className={Style.buton}>
                        <Botao tipo="redirecionar" nome="Atualizar" rota="atualizar"></Botao>
                    </div>
                    { erro!= null && erro.message == "token has expired" && localStorage.removeItem("token") &&(
                       <Navigate to={"/login"}/>
                    )}
                    {estado != null && estado.admin != "oculto" &&(
                        <div className={Style.box}>
                            <h3>{estado.org}&ensp;</h3>
                            <h4>
                                {estado.admin}
                            </h4>
                        </div>
                    )}
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
export default EstadoDenuncia;
