import { useState } from "react"
import Style from "../Style/AtualizarDenuncia.module.css"
import Botao from '../Components/Botao'
import axios from "axios"
import { Navigate, useParams} from "react-router-dom"

function AtualizarEstado(){

    if (localStorage.getItem("token") != null) {

        if(location.state == null){

            const DenunciaId =  useParams().id  
            const token = localStorage.getItem("token");
            const[validador, setValidador] = useState(false);
            const[erro, setErro] = useState();
            const[resposta, setResposta] = useState();
            const[falha, setFalha] = useState();
            const[redirecionar,setRedirecionar] = useState();

            const [dados, setDados] = useState(
            {
                "status" : "",
                "admin" : "oculto",
                "message" : "",
                "token" : token
            })

            const editar = (e) =>{
                setErro(null)
                if(e.target.id == "mensagem"){
                    let valor = e.target.value;
                    setDados((prev) =>{
                        const NovosDados = {...prev, message: valor}
                        return NovosDados;
                    })
                }
                
                else if(e.target.id == "checkbox-1"){
                    setValidador(!validador)
                    if(validador == true){
                        setDados((prev) =>{
                            let NovosDados = {...prev, admin: "oculto"}
                            return NovosDados;
                    })
                    }
                    else{
                        setDados((prev) =>{
                            let NovosDados = {...prev, admin: "ativo"}
                            return NovosDados;
                    })
                    }
                }
                else{
                    let valor = e.target.value
                    setDados((prev) =>{
                        let NovosDados = {...prev, status: valor}
                        return NovosDados;
                    })
                }
            }
            const progresso = () => {
                let valor = 0;

                if(dados.status != "concluída" && dados.message.length > 40){
                    valor+=50
                }
                if(dados.status != "concluída" && dados.status){
                    valor+=50
                }
                else if(dados.status == "concluída" && dados.status){
                    valor+=50
                }

                return valor
            }
            const put = () =>{
                axios.put("https://backend-petcare.herokuapp.com/status/"+DenunciaId,dados)
                .then((res) => setResposta(res))
                .catch((res) => setFalha(res.message))
                .then(() => {console.clear(), setRedirecionar(true)})
            }
            return (
                <div className={Style.ContainerMinimal}>
                    <div className={Style.BarraDeProgresso}><div style={{width : progresso()+"%"}}></div></div>
                    <form action="post">
                        <p>Deseja adicinar seu nome a essa atualização?</p>
                        <div className={Style.CheckBox}>
                            <input id="checkbox-1" type="checkbox" checked={validador} onChange={editar}/>
                            <label htmlFor="checkbox-1"></label>
                        </div>
                        <label htmlFor="estado">Estado da Denúncia</label>
                        <select name="estado" id="estado" onChange={editar}>
                            <option value="">--Selecionar--</option>
                            <option value="Denúncia aceita">Denúncia aceita</option>
                            <option value="Em acompanhamento">Em Acompanhamento</option>
                            <option value="concluída">Animal Resgatado</option>
                        </select>
                        {dados.status != "" &&(
                        <>
                            <label htmlFor="mensagem">Mensagem de atualização</label>
                            <textarea name="mensagem" placeholder="mínimo de 100 caractéres" id="mensagem" cols="30" rows="10" onChange={editar}></textarea>
                        </>
                        )
                        }
                        {erro == true &&(
                            <h4 className={Style.erro}>
                                os campos não foram completamente preenchidos!
                            </h4>
                        )
                        }
                        {progresso()!=100 &&(
                            <Botao tipo="interno" nome="Enviar" clique={() => {setErro(true)}}></Botao>
                        )
                        }
                        {progresso()==100 &&(
                            <Botao tipo="interno" nome="Enviar" clique={() => {put()}}></Botao>
                        )
                        }
                        {redirecionar == true &&(
                            <Navigate to={"/home"}/>
                        )
                        }
                    </form>
                </div>
            )
        }
        else{
            return(
            <Navigate to={"/home"}/>
            )
        }
    }
}
export default AtualizarEstado