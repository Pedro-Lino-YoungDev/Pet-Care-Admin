import Style from "../Style/TodosUsuarios.module.css"
import { useEffect, useState } from 'react';
import { Navigate , Link } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Botao from '../Components/Botao';

function TodosUsuarios(){
    if (localStorage.getItem("token") != null) {   

        const DataAtual = new Date();
        const HorarioTokenFormatado = parseInt(DataAtual.valueOf()/1000);

        const token_jwt = localStorage.getItem("token");
        const TokenDecodificado = jwtDecode(token_jwt);

        if (TokenDecodificado.exp > HorarioTokenFormatado) {

            const [users, setUsers] = useState([]);
            const [erro, setErro] = useState();
            const [animacao,setAnimacao] = useState(true);
            const [popup, setPopup] = useState(false);
            const [id, setId] = useState();
            const [senha, setSenha] = useState("");
            const [chave, setChave] = useState("");
            const [resposta, setResposta] = useState();

            const token = {
                "token" : localStorage.getItem("token")

            }

            useEffect(() => {
                axios.post("https://backend-petcare.herokuapp.com/usuarios",token)
                .then((res) => setUsers(res.data[0]))
                .catch((res) => setErro(res.response.data.message))
                .finally(() => setAnimacao(false))
            },[]);

            const deletar = (e) =>{
                axios.delete("https://backend-petcare.herokuapp.com/usuario/"+e,{
                    "data":{
                        "adminKey": chave,
                        "password": senha,
                        "token": token.token
                    }
            })
                .then((res) => setResposta(res))
                .catch((res) => setErro(res.response.data.message))
            }
            while (animacao == true) {
                return (
                    <div className={Style.ContainerPadrao}>
                        <div className={Style.Carregamento}></div>
                    </div>
                )
            }
            if (erro == "users not found"){
                return (
                    <div className={Style.ContainerPadrao}>
                        <div className={Style.ContainerNorm}>
                            <h2>
                                Sem usuários
                            </h2>
                            <img src="/Imagens/icon-users-not-found.png" alt="" />
                            <br />
                            <p className={Style.Tamanho}>
                                Ainda não há nenhum usuario cadastrado no nosso sistema;
                            </p>
                        </div>
                        {
                            console.clear()
                        }
                    </div>
                )
            }
            else{
            return(
                <div>

                    <div className={Style.ContainerMinimal}>
                        {users.map((usr,i)=> 
                        <div className={Style.ContainerBlock} key ={usr.email}>
                            <h1 className={Style.ContainerBlockH1}>
                                <img className={Style.ContainerBlockImg} src={usr.photo} alt=""/>
                            </h1>
                            <p className={Style.espaçoGrande}></p>
                                        <a className={Style.Btn} onClick={() => {setPopup(true), setId(usr["id"]), setErro(null), console.clear()}} > Excluir </a>
                            <div className={Style.ContainerBlockH2}>
                                <p className={Style.espaço}></p>
                                <h4 className={Style.ContainerBlockH4}>
                                    Nome:

                                </h4>
                                <p className={Style.espaço}></p>
                                <p className={Style.ContainerBlockP}>
                                    {usr.name}
                                </p>
                                <p className={Style.espaço}></p>
                                <h4 className={Style.ContainerBlockH4}>
                                    Email:
                                </h4>
                                <p className={Style.espaço}></p>
                                <p className={Style.ContainerBlockP}>
                                    <a href={"mailto:"+usr.email}>{usr.email}</a>
                                </p>
                                <p className={Style.espaço}></p>
                                <p className={Style.espaço}></p>
                                <p className={Style.ContainerBlockPAlt}>
                                        <Botao tipo="redirecionar" nome="Modificar" estado={{from:usr}} rota={""+usr.id+"/modificar"}></Botao>
                                        <Link className={Style.Botão} state={{from:usr}} to ={""+usr.id+"/denuncias"}>Denúncias</Link> 
                                </p>
                                <p className={Style.espaço}></p>

                            </div>
                        </div>
                        
                        
                        )}
                        {popup == true &&(
                            <div className={Style.popup}>
                                {erro == "login admin attempt failed"&&(
                                    <div>
                                        <h4 className={Style.erro}>
                                            senha de administrador incorreta
                                        </h4>
                                    </div>
                                )
                                }
                                <label htmlFor="senha"> Digite sua senha de admin</label>
                                <input className={Style.senha} value={senha} type="password" id="senha" onChange={(e) =>{setSenha(e.target.value), setErro(null)}}/>
                                {erro == "access denied by admin key wrong"&&(
                                    <div>
                                        <h4 className={Style.erro}>
                                            chave de administração incorreta
                                        </h4>
                                    </div>
                                )
                                }
                                <label htmlFor="codigo"> chave de administração</label>
                                <input className={Style.codigo} value={chave} type="password" id="codigo" onChange={(e) =>{setChave(e.target.value), setErro(null)}}/>
                                <a onClick={() => {deletar(id), setErro(null)}} > Concluír </a>
                                <a onClick={() => {setPopup(false), setErro(null), setChave(""), setSenha("")}} > Cancelar </a>
                                {resposta != null && resposta.data.message =="user records deleted by admin" &&(
                                    setPopup(false)
                                )}
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
export default TodosUsuarios