import Style from '../Style/Login.module.css'
import Link from "../Components/Link"
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode'
import Botao from '../Components/Botao'


function Login(){

    const DataAtual = new Date();
    const HorarioTokenFormatado = parseInt(DataAtual.valueOf()/1000);
    
    const VerificarToken = () => {
        if(localStorage.getItem("token") != null){
            const token_jwt = localStorage.getItem("token");
            const TokenDecodificado = jwtDecode(token_jwt);
            return TokenDecodificado.exp
        }
    }
    if (localStorage.getItem("token") == null || VerificarToken() < HorarioTokenFormatado) {
        const [email, setEmail] = useState();
        const [senha, setSenha] = useState();
        const [erroInput, setErroInput] = useState();
        const [erro_email, setErro_email] = useState();
        const [resposta, setRespost] = useState();
        const [erro, setErro] = useState();
        const [carregamento, setCarregamento] = useState();

        const user ={
            "email" : email,
            "password" : senha
        }
    
        const post = () => {
            axios.post("https://backend-petcare.herokuapp.com/admin/login",user)
            .then((res) => setRespost(res.data))
            .catch((res) => setErro(res.response.data))
        }

        const Verificar_campos = (e,s) => {
            var re = /\S+@\S+\.\S+/;
            if(e == null || e == '' || s == null || s == ''){
                return false
            }
            else if(re.test(e) == false){
                return 4
            }
            else{
                return true
            }
        }

        return(
            <div className={Style.ContainerMinimal}>
                <form className={Style.formulario} action="Login" method="Post">

                    <div className={Style.ContainerItem1}>
                        <label htmlFor="Email">Email:</label>
                        <br />
                        <input className={Style.Input} type="Email" onChange={(e) =>{setEmail(e.target.value), setErroInput(null), setErro_email(null), setErro(null), setCarregamento(false)}}/>
                    </div>

                    <div className={Style.ContainerItem}>
                        <label htmlFor="Email">Senha:</label>
                        <br />
                        <input className={Style.Input} type="Password" onChange={(e) =>{setSenha(e.target.value), setErroInput(null), setErro(null), setCarregamento(false)}}/>
                    </div>
                </form>
                <div className={Style.Container}>
                    <h4>
                        Não possui conta?
                        <Link tipo="interno" nome="Registrar-se" url="/Registro"/>
                    </h4>
                </div>

                {erroInput == true && Verificar_campos(email, senha) == false &&(
                    <div className={Style.DivErro}>
                        <h4  className={Style.erro}>
                            Digite todas as informações para prosseguir*
                        </h4>
                    </div>
                )
                }
                {erro_email == true && Verificar_campos(email, senha) == 4 &&(
                    <div className={Style.DivErro}>
                        <h4  className={Style.erro}>
                            Seu e-mail não é válido*
                        </h4>
                    </div>
                )
                }
                {erro != null && erro.message == "login attempt failed" &&
                    <div className={Style.Container}>
                        <h4  className={Style.erro}>
                            seu email ou senha estão incorretos tente novamente*
                        </h4>
                    </div>
                }
                {resposta == null && erro == null && carregamento == true &&(
                    <div className={Style.Carregamento}></div>
                )
                }
                {Verificar_campos(email,senha) == true &&(
                    <div className={Style.DivBotao}>
                        <Botao tipo="interno" nome="Entrar" clique={() => {post(), setCarregamento(true)}}></Botao>
                    </div>
                )
                }
                {Verificar_campos(email,senha) == 4 &&(
                    <div className={Style.DivBotao}>
                        <Botao tipo="interno" nome="Entrar" clique={() => {setErro_email(true)}}></Botao>
                    </div>
                )
                }
                {Verificar_campos(email,senha) == false &&(
                    <div className={Style.DivBotao}>
                        <Botao tipo="interno" nome="Entrar" clique={() => {setErroInput(true)}}></Botao>
                    </div>
                )
                }
                {resposta != null && resposta.message == "successfully logged in" &&(
                    localStorage.setItem("token",resposta.token),
                    localStorage.setItem("foto",resposta.photo),
                    <Navigate to="/home"/>
                )
                }

            </div>
        )
    }
    else{
        return <Navigate to="/home"/>
    }
}

export default Login