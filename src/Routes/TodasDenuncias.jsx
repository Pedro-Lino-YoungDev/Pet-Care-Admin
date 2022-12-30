import Style from "../Style/TodasDenuncias.module.css"
import { Navigate, useLocation} from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Botao from '../Components/Botao';
import { useEffect, useState } from 'react';


function TodasDenucias(){

    if (localStorage.getItem("token") != null) {

        const DataAtual = new Date();
        const HorarioTokenFormatado = parseInt(DataAtual.valueOf()/1000);

        const token_jwt = localStorage.getItem("token");
        const TokenDecodificado = jwtDecode(token_jwt);

        if (TokenDecodificado.exp > HorarioTokenFormatado) {

            const[denuncias, setDenuncias] = useState([]);
            const [erro, setErro] = useState();
            const [animacao,setAnimacao] = useState(true);


            const token = {
                "token" : localStorage.getItem("token")
            }
        
            useEffect(() => {
                axios.post("https://backend-petcare.herokuapp.com/denuncias",token)
                .then((res) => setDenuncias(res.data[0]))
                .catch((res) => setErro(res.response.data.message))
                .finally(() => setAnimacao(false))
            },[]);
            
            const formatar_horario = (e) =>{
                const DataSeparada = e.split("T");
                const HorarioSeparado = DataSeparada[1].split(".")
                const HorarioFormatado = HorarioSeparado[0].split(":")
                const HorarioInt = parseInt(HorarioFormatado[0])
                if(HorarioInt == 0){
                    return ""+21+""+HorarioFormatado[1]+HorarioFormatado[2]
                }
                else if(HorarioInt == 1){  
                    return ""+22+":"+HorarioFormatado[1]+":"+HorarioFormatado[2]
                }
                else if(HorarioInt == 2){  
                    return ""+23+":"+HorarioFormatado[1]+":"+HorarioFormatado[2]
                }
                else{  
                    return ""+HorarioInt-3+":"+HorarioFormatado[1]+":"+HorarioFormatado[2]
                }
            }
            const ano_bissexto = (year) =>{
                if(year % 400 == 0){
                    return true
                }
                else if(year % 4 == 0 && year % 100 != 0){
                    return true
                }
                else{
                    return false
                }
            }

            const formatar_data = (e) =>{
                const DataSeparada = e.split("T");
                const HorarioSeparado = DataSeparada[1].split(".")
                const HorarioFormatado = HorarioSeparado[0].split(":")
                const HorarioInt = parseInt(HorarioFormatado[0])
                if(HorarioInt == 0 || HorarioInt == 1 || HorarioInt == 2){
                    const DataFormatada = DataSeparada[0].split("-")
                    if (parseInt(DataFormatada[2]) == 1) {
                        const mes = parseInt(DataFormatada[1])-1
                        if(ano_bissexto(parseInt(DataFormatada[0])) == true){
                            if(parseInt(DataFormatada[1]) == 1){
                                return ""+31+"/"+12+"/"+parseInt(DataFormatada[0])-1
                            }
                            else if(parseInt(DataFormatada[1]) == 3){
                                return ""+29+"/"+mes+"/"+DataFormatada[0]
                            }
                            else if (parseInt(DataFormatada[1]) == 2 || parseInt(DataFormatada[1]) == 4 || parseInt(DataFormatada[1]) == 6 || parseInt(DataFormatada[1]) == 8 || parseInt(DataFormatada[1]) == 9 || parseInt(DataFormatada[1]) == 11) {
                                return ""+31+"/"+mes+"/"+DataFormatada[0]
                            }
                            else{
                                return ""+30+"/"+mes+"/"+DataFormatada[0]
                            }
                        }
                        else{
                            if(parseInt(DataFormatada[1]) == 1){
                                return ""+31+"/"+12+"/"+parseInt(DataFormatada[0])-1
                            }
                            else if(parseInt(DataFormatada[1]) == 3){
                                return ""+28+"/"+mes+"/"+DataFormatada[0]
                            }
                            else if (parseInt(DataFormatada[1]) == 2 || parseInt(DataFormatada[1]) == 4 || parseInt(DataFormatada[1]) == 6 || parseInt(DataFormatada[1]) == 8 || parseInt(DataFormatada[1]) == 9 || parseInt(DataFormatada[1]) == 11) {
                                return ""+31+"/"+mes+"/"+DataFormatada[0]
                            }
                            else{
                                return ""+30+"/"+mes+"/"+DataFormatada[0]
                            }
                        }
                    }
                    else{
                        const dia = parseInt(DataFormatada[2])-1
                        return ""+dia+"/"+DataFormatada[1]+"/"+DataFormatada[0]
                    }
                }
                else{  
                    const DataFormatada = DataSeparada[0].split("-")
                    return DataFormatada[2]+"/"+DataFormatada[1]+"/"+DataFormatada[0]
                }
            }
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
            if (erro == "denuncias not found"){
                return (
                    <div className={Style.ContainerPadrao}>
                        <div className={Style.DivRedirecionar}>
                            <h2>
                                Não há denúncias
                            </h2>
                            <img src="/Imagens/NotFound.png" alt="" />
                            <br />
                            <p className={Style.Tamanho}>
                                Não há nenhuma denúncia cadastrada no nosso sistema ainda 
                            </p>
                        </div>
                        {
                            console.clear()
                        }
                    </div>
                )
            }
            else if (denuncias != undefined){
                /* Exemplo de Cronometro;
                const time = new Date ();
                time.setSeconds(time.getSeconds()+2);
                const expiryTimestamp = time;
                const [expirou, setExpirou] = useState();
                const {  } = useTimer({expiryTimestamp, onExpire: () => setExpirou(true)});
                */
                return(
                    <div>
                        <div className={Style.ContainerMinimal}>
                            {denuncias.map((den,i)=> 
                            <div className={Style.DivItem} key={i}>
        
                                <div className={Style.DivImg}>
                                    <img  className={Style.Imagen} src={den.picture1} alt="imagem da denúncia cadastrada" />
                                </div>
        
                                <div >
                                    <h4>
                                        Rua
                                    </h4>
                                    <p >
                                        {den.rua}
                                    </p>
                                </div>
        
                                <div >
                                    <h4>
                                        Data de cadastro:
                                    </h4>
                                    <p>
                                        {formatar_data(den["created_at"])}
                                    </p>
                                    <h4>
                                        Hora de cadastro:
                                    </h4 >
                                    <p>
                                        {formatar_horario(den["created_at"])}
                                    </p>
                                </div>
                                <div className={Style.ContainerBtn}>
                                <Botao tipo="redirecionar" nome="Ver detalhes" estado={{from:denuncias[i]}} rota="/denuncia"></Botao>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                )
            }
        }
        else{
            return <Navigate to="/login" />
        }
    }
    else{
        return <Navigate to="/login" />
    }
}
export default TodasDenucias