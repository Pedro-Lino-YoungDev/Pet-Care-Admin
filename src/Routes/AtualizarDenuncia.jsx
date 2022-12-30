import { useState } from "react"
import Style from "../Style/AtualizarDenuncia.module.css"
import Botao from '../Components/Botao'
import { Navigate } from "react-router-dom"

function AtualizarDenuncia(){

    const [dados, setDados] = useState({
        "estado" : "",
        "admin" : "oculto",
        "orgaização" : "fixo",
        "mensagem" : ""
    })
    const[validador, setValidador] = useState(false);
    const[erro, setErro] = useState();
    const[resposta, setResposta] = useState();
    const[falha, setFalha] = useState();
    const[redirecionar,setRedirecionar] = useState();

    const editar = (e) =>{
        setErro(null)
        if(e.target.id == "mensagem"){
            let valor = e.target.value;
            setDados((prev) =>{
                const NovosDados = {...prev, mensagem: valor}
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
                    let NovosDados = {...prev, admin: "Pedro"}
                    return NovosDados;
            })
            }
        }
        else{
            let valor = e.target.value
            setDados((prev) =>{
                let NovosDados = {...prev, estado: valor}
                return NovosDados;
            })
        }
    }
    const progresso = () => {
        let valor = 0;

        if(dados.estado != "concluída" && dados.mensagem.length > 100){
            valor+=50
        }
        if(dados.estado != "concluída" && dados.estado){
            valor+=50
        }
        else if(dados.estado == "concluída" && dados.estado){
            valor +=100
        }

        return valor
    }
    const post = () =>{
        axios.post("https://backend-petcare.herokuapp.com/admin/denuncia/atualizar",dados)
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
                    <option value="aceita">Em Acompanhamento</option>
                    <option value="concluída">Animal Resgatado</option>
                </select>
                {dados.estado != "concluída" &&(
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
                {redirecionar == true &&(
                    <Navigate to={"/home"}/>
                )
                }
                {

                }
            </form>
        </div>
    )
}
export default AtualizarDenuncia