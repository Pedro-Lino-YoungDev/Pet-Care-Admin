import Style from '../Style/Denuncia.module.css'
import { Navigate, useLocation, useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode'
import Botao from '../Components/Botao'
import axios from 'axios';
import { useEffect, useState } from 'react';


function Denuncia(){
    
    if (localStorage.getItem("token") != null) {

        const token_jwt = localStorage.getItem("token");
        const decodificado = jwtDecode(token_jwt);
        var validador = new Boolean(true);

        //Data e horario atual;
        const DataAtual = new Date();
        const AnoAtual = DataAtual.getFullYear();
        const MesAtual = DataAtual.getMonth()+1;
        const DiaAtual = DataAtual.getDate();
        const HoraAtual = DataAtual.getHours();
        const MinutosAtuais = DataAtual.getMinutes();
        const HorarioTokenFormatado = parseInt(DataAtual.valueOf()/1000)
        const location = useLocation();

        if (decodificado.exp > HorarioTokenFormatado) {

            if(location.state != null && location.state !=""){
                const { from } = location.state;

                const [popup, setPopup] = useState(false);
                const [erro, setErro] = useState();
                const [senha, setSenha] = useState("");
                const [chave, setChave] = useState("");
                const [resposta, setResposta] = useState();

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
                //Dia da denúncia;
                const DataFormatada = formatar_data(from["created_at"]).split("/");
                const DiaDenuncia = parseInt(DataFormatada[0]);
                const MesDenuncia = parseInt(DataFormatada[1]);
                const AnoDenuncia = parseInt(DataFormatada[2]);

                //Hora e minutos da denúncia;
                const HorarioDenuncia = formatar_horario(from["created_at"]);
                const HorarioSeparada = HorarioDenuncia[0].split(":");
                const HoraDenuncia = parseInt(HorarioSeparada[0]);
                const MinutosDenuncia = parseInt(HorarioSeparada[1]);
                

                const deletar = () =>{
                    axios.delete("https://backend-petcare.herokuapp.com/denuncia/"+from.id,{
                        "data":{
                            "adminKey": chave,
                            "password": senha,
                            "token": localStorage.getItem("token")
                        }
                    })
                    .then((res) => setResposta(res.data.message))
                    .catch((res) => setErro(res.response.data.message))
                    .then(() => {console.clear()})
                }
                return(
                    <div className={Style.ContainerMinimal}>
                        <div>
                            <img className={Style.Banner} src={from.picture1} alt="imagem do cachorro" />
                        </div>
                        {from.picture2 != null &&(
                        <div>
                            <img className={Style.Banner} src={from.picture2} alt="imagem do cachorro" />
                        </div>
                        )
                        }
                        {from.picture3 != null &&(
                        <div>
                            <img className={Style.Banner} src={from.picture3} alt="imagem do cachorro" />
                        </div>
                        )
                        }
                        <div className={Style.DivText}>
                            <div>
                                <h4>
                                    Tipo do animal:
                                </h4>
                                <p className={Style.paragrafo}>
                                    {from.tipo}
                                </p>
                            </div>
                            <div>
                                <h4>
                                    Cor do animal:
                                </h4>
                                <p className={Style.paragrafo}>
                                    {from.cor}
                                </p>
                            </div>
                            <div>
                                <h4> 
                                    Rua:
                                </h4>
                                <p className={Style.paragrafo}>
                                    {from.rua}
                                </p>
                            </div>
                            <div>
                                <h4>
                                    Bairro:
                                </h4>
                                <p className={Style.paragrafo}>
                                    {from.bairro}
                                </p>
                            </div>
                    
                            <div>
                                <h4 >
                                    Ponto de Referência:
                                </h4>
                                <p className={Style.paragrafo}>
                                    {from["pontoDeReferencia"]}
                                </p>
                            </div>
                            <div>
                                <h4>
                                    Data de Cadastro:
                                </h4>
                                <p className={Style.paragrafo}>
                                {formatar_data(from["created_at"])} as {formatar_horario(from["created_at"])}
                                </p>
                            </div>

                            <div>
                                <h4>
                                    Ultima Atualização:
                                </h4>
                                <p className={Style.paragrafo}>
                                    {formatar_data(from["updated_at"])} as {formatar_horario(from["updated_at"])}
                                </p>
                            </div>

                            <div>
                                <h4>
                                    Descrição
                                </h4>
                                <p className={Style.paragrafo}>
                                    {from.descricao}
                                </p>
                            </div>
                            <div className={Style.ContainerBtn}> 
                                    <Botao tipo="redirecionar" nome="Modificar" estado={{from:from}} rota="modificar"></Botao>
                            </div>
                            <div className={Style.ContainerBtn}> 
                                    <Botao tipo="redirecionar" nome="Estado" estado={{from:from}} rota="estado"></Botao>
                            </div>
                            <div className={Style.ContainerBtn}> 
                                <a className={Style.Btn} onClick={() => {setPopup(true)}}> Excluír</a>
                            </div>
                            {popup == true &&(
                                <div className={Style.popup}>
                                    {erro == "login attempt failed"&&(
                                        <div>
                                            <h4 className={Style.erro}>
                                                Senha de administrador incorreta
                                            </h4>
                                        </div>
                                    )
                                    }
                                    <label htmlFor="senha"> Digite sua senha de admin</label>
                                    <input className={Style.senha} value={senha} type="password" id="senha" onChange={(e) =>{setSenha(e.target.value), setErro(null)}}/>
                                    {erro == "access denied by admin key wrong"&&(
                                        <div>
                                            <h4 className={Style.erro}>
                                                Chave de administração incorreta
                                            </h4>
                                        </div>
                                    )
                                    }
                                    <label htmlFor="codigo"> Chave de administração</label>
                                    <input className={Style.codigo} value={chave} type="password" id="codigo" onChange={(e) =>{setChave(e.target.value), setErro(null)}}/>
                                    <a onClick={() => {deletar(), setErro(null), setChave(""), setSenha("")}} > Concluír </a>
                                    <a onClick={() => {setPopup(false), setErro(null), setChave(""), setSenha("")}} > Cancelar </a>
                                    {resposta == "denuncia records deleted" && (
                                        <Navigate to="../" />
                                    )
                                    }
                                </div>
                                )}

                        </div>
                    </div>
                )      
            }
            else{
                const {id} =   useParams();
                const [denuncia, setDenuncia] = useState();
                const [errorequest, setErrorequest] = useState();
                const [animacao,setAnimacao] = useState(true);

                const token = {
                    "token" : token_jwt
                }

                useEffect(() => {
                    axios.post("https://backend-petcare.herokuapp.com/denunciabyid/"+id,token)
                    .then((res) => setDenuncia(res.data[0]))
                    .catch((res) => setErrorequest(res.response.data.message))
                    .finally(() => setAnimacao(false))
                },[]);;

                const [popup, setPopup] = useState(false);
                const [erro, setErro] = useState();
                const [senha, setSenha] = useState("");
                const [chave, setChave] = useState("");
                const [resposta, setResposta] = useState();

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

                const deletar = () =>{
                    axios.delete("https://backend-petcare.herokuapp.com/denuncia/"+parametro.id,{
                        "data":{
                            "adminKey": chave,
                            "password": senha,
                            "token": localStorage.getItem("token")
                        }
                    })
                    .then((res) => setResposta(res.data.message))
                    .catch((res) => setErro(res.response.data.message))
                    .then(() => {console.clear()})
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
                return(
                    <div className={Style.ContainerMinimal}>
                        <div>
                            <img className={Style.Banner} src={denuncia.picture1} alt="imagem do cachorro" />
                        </div>
                        {denuncia.picture2 != null &&(
                        <div>
                            <img className={Style.Banner} src={denuncia.picture2} alt="imagem do cachorro" />
                        </div>
                        )
                        }
                        {denuncia.picture3 != null &&(
                        <div>
                            <img className={Style.Banner} src={denuncia.picture3} alt="imagem do cachorro" />
                        </div>
                        )
                        }
                        <div className={Style.DivText}>
                            <div>
                                <h4>
                                    Tipo do animal:
                                </h4>
                                <p className={Style.paragrafo}>
                                    {denuncia.tipo}
                                </p>
                            </div>
                            <div>
                                <h4>
                                    Cor do animal:
                                </h4>
                                <p className={Style.paragrafo}>
                                    {denuncia.cor}
                                </p>
                            </div>
                            <div>
                                <h4> 
                                    Rua:
                                </h4>
                                <p className={Style.paragrafo}>
                                    {denuncia.rua}
                                </p>
                            </div>
                            <div>
                                <h4>
                                    Bairro:
                                </h4>
                                <p className={Style.paragrafo}>
                                    {denuncia.bairro}
                                </p>
                            </div>
                    
                            <div>
                                <h4 >
                                    Ponto de Referência:
                                </h4>
                                <p className={Style.paragrafo}>
                                    {denuncia["pontoDeReferencia"]}
                                </p>
                            </div>
                            <div>
                                <h4>
                                    Data de Cadastro:
                                </h4>
                                <p className={Style.paragrafo}>
                                {formatar_data(denuncia["created_at"])} as {formatar_horario(denuncia["created_at"])}
                                </p>
                            </div>

                            <div>
                                <h4>
                                    Ultima Atualização:
                                </h4>
                                <p className={Style.paragrafo}>
                                    {formatar_data(denuncia["updated_at"])} as {formatar_horario(denuncia["updated_at"])}
                                </p>
                            </div>

                            <div>
                                <h4>
                                    Descrição
                                </h4>
                                <p className={Style.paragrafo}>
                                    {denuncia.descricao}
                                </p>
                            </div>
                            <div className={Style.ContainerBtn}> 
                                    <Botao tipo="redirecionar" nome="Modificar" estado={{from:denuncia}} rota="modificar"></Botao>
                            </div>
                            <div className={Style.ContainerBtn}> 
                                    <Botao tipo="redirecionar" nome="Estado" estado={{from:denuncia}} rota="estado"></Botao>
                            </div>
                            <div className={Style.ContainerBtn}> 
                                <a className={Style.Btn} onClick={() => {setPopup(true)}}> Excluír</a>
                            </div>
                            {popup == true &&(
                                <div className={Style.popup}>
                                    {erro == "login attempt failed"&&(
                                        <div>
                                            <h4 className={Style.erro}>
                                                Senha de administrador incorreta
                                            </h4>
                                        </div>
                                    )
                                    }
                                    <label htmlFor="senha"> Digite sua senha de admin</label>
                                    <input className={Style.senha} value={senha} type="password" id="senha" onChange={(e) =>{setSenha(e.target.value), setErro(null)}}/>
                                    {erro == "access denied by admin key wrong"&&(
                                        <div>
                                            <h4 className={Style.erro}>
                                                Chave de administração incorreta
                                            </h4>
                                        </div>
                                    )
                                    }
                                    <label htmlFor="codigo"> Chave de administração</label>
                                    <input className={Style.codigo} value={chave} type="password" id="codigo" onChange={(e) =>{setChave(e.target.value), setErro(null)}}/>
                                    <a onClick={() => {deletar(), setErro(null), setChave(""), setSenha("")}} > Concluír </a>
                                    <a onClick={() => {setPopup(false), setErro(null), setChave(""), setSenha("")}} > Cancelar </a>
                                    {resposta == "denuncia records deleted" && (
                                        <Navigate to="../" />
                                    )
                                    }
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

export default Denuncia;