import { useState } from "react"
import Style from "../Style/AtualizarDenuncia.module.css"

function AtualizarDenuncia(){

    const [dados, setDados] = useState({
        "estado" : "",
        "admin" : "oculto",
        "orgaização" : "fixo",
        "mensagem" : ""
    })
    const[validador, setValidador] = useState(false);
    const[erro, setErro] = useState({
        estado: '',
        mensagem: 'mensagem não foi completamente preenchida'
    });

    const editar = (e) =>{
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

        if(dados.mensagem.length > 100){
            valor+=50
        }
        if(dados.estado){
            valor+=50
        }

        return valor
    }
    return (
        <div className={Style.ContainerMinimal}>
            {
                console.log(dados)
            }

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
                
                <label htmlFor="mensagem">Mensagem de atualização</label>
                <textarea name="mensagem" placeholder="mínimo de 100 caractéres" id="mensagem" cols="30" rows="10" onChange={editar}></textarea>
                
            </form>
        </div>
    )
}
export default AtualizarDenuncia