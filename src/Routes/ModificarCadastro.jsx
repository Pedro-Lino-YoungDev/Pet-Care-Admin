import Style from '../Style/ModificarCadastro.module.css'
import { Navigate, useLocation } from 'react-router-dom';
import {useState} from 'react'
import axios from 'axios';
import jwtDecode from 'jwt-decode'

function ModificarCadastro(){

    if (localStorage.getItem("token") != null) {

        const DataAtual = new Date();
        const HorarioTokenFormatado = parseInt(DataAtual.valueOf()/1000);

        const token_jwt = localStorage.getItem("token");
        const TokenDecodificado = jwtDecode(token_jwt);


        if (TokenDecodificado.exp > HorarioTokenFormatado) {
            const [redirecionar,setRedirecionar] = useState(false);
            
            const location = useLocation();
            const { from } = location.state;

            const tipoDenuncia = from.tipo;
            const descricaoDenuncia = from.descricao;
            const localizacao = from.localizacao;
            const ruaDenuncia = from.rua;
            const bairroDenuncia = from.bairro;
            const prDenuncia = from["pontoDeReferencia"];
            const corDenuncia = from.cor;
            const id = from.id;

            const [tipo,setTipo] = useState(tipoDenuncia);
            const [descricao,setDescricao] = useState(descricaoDenuncia);
            const [rua,setRua] = useState(ruaDenuncia);
            const [bairro,setBairro] = useState(bairroDenuncia);
            const [PR,setPR] = useState(prDenuncia);
            const [cancelar,setCancelar] = useState();
            
            const [cor,setCor] = useState(corDenuncia);
            const [erroCampos,setErroCampos] = useState();

        
            const [resposta, setRespost] = useState();
            const [error, setError] = useState();
            const [carregamento, setCarregamento] = useState(false);

            const denuncia = {
                "tipo" : tipo,
                "cor" : cor,
                "localizacao" : localizacao,
                "rua" : rua,
                "bairro" : bairro,
                "pontoDeReferencia" : PR,
                "descricao" : descricao,
                "token" : token_jwt
            }

            const put = () => {
                axios.put("https://backend-petcare.herokuapp.com/denuncia/"+id, denuncia)
                .then((res) => setRespost(res))
                .catch((res) => setError(res))
                .then(() => setRedirecionar(true))
            }

            const verificiar_formulario = () =>{
                if (tipo == null || tipo == ''  || cor == null || cor == '' ||
                bairro == null || bairro == '' || rua == null || rua == '' || 
                PR == null || PR == '' || descricao == null || descricao == '')
                {
                    return true
                }
                else{
                    return false
                }
            }

            const verificiar_tipo = () =>{
                if(tipo == "Cachorro"){
                    return 1
                }
                else if(tipo == "Gato"){
                    return 2
                }
                else{
                    return 3
                }
            }

            return(
                <div className={Style.ContainerMinimal}>
                    <div className={Style.ContainerGeral}>
                        <form className={Style.form} action="Cadastro" method="Post" encType="multipart/form-data">
                            {verificiar_tipo() == 2 &&(
                                <div className={Style.ItemForm}>
                                    <label className={Style.Label} htmlFor="Especie">Tipo de animal</label>
                                    <select className={Style.Input} value={tipo} name="EspecieDoAnimal" id="Especie" onChange={(e) => {setTipo(e.target.value) , setErroCampos(false)}}>
                                        <option value="Gato">Gato</option>
                                        <option value="Cachorro">Cachorro</option>
                                        <option value="Outros">Outros</option>
                                    </select>
                                </div>
                            )
                            }
                            {verificiar_tipo() == 1  &&(
                                <div className={Style.ItemForm}>
                                    <label className={Style.Label} htmlFor="Especie">Tipo de animal</label>
                                    <select className={Style.Input} value={tipo} name="EspecieDoAnimal" id="Especie" onChange={(e) => {setTipo(e.target.value) , setErroCampos(false)}}>
                                        <option value="Cachorro">Cachorro</option>
                                        <option value="Gato">Gato</option>
                                        <option value="Outros">Outros</option>
                                    </select>
                                </div>
                            )
                            }
                            {verificiar_tipo() == 3 &&(
                                <div className={Style.ItemForm}>
                                    <label className={Style.Label} htmlFor="Especie">Tipo de animal</label>
                                    <select className={Style.Input} value={tipo} name="EspecieDoAnimal" id="Especie" onChange={(e) => {setTipo(e.target.value) , setErroCampos(false)}}>
                                        <option value="Outros">Outros</option>
                                        <option value="Cachorro">Cachorro</option>
                                        <option value="Gato">Gato</option>
                                    </select>
                                    <br />
                                    <input className={Style.Input} value={tipo} type="Text" id= "Tipo" placeholder= "Exemplo: Cavalo" onChange={(e) => {setTipo(e.target.value) , setErroCampos(false)}}/>
                                </div>
                            )
                            }
                            
                            <div className={Style.ItemForm}>
                                <label className={Style.Label} htmlFor="Bairro">Bairro:</label>
                                <select className={Style.Input} value={bairro} name="Bairro" id= "Bairro" onChange={(e) => {setBairro(e.target.value) , setErroCampos(false)}}>
                                    <option value="Aloísio Pinto">Aloísio Pinto</option>   
                                    <option value="Boa Vista">Boa Vista</option>
                                    <option value="Dom Hélder Câmara">Dom Hélder Câmara</option>
                                    <option value="Dom Thiago Póstma">Dom Thiago Póstma</option>
                                    <option value="Francisco Figueira">Francisco Figueira</option>
                                    <option value="Heliópolis">Heliópolis</option>
                                    <option value="José Maria Dourado">José Maria Dourado</option>
                                    <option value="Magano">Magano</option>
                                    <option value="Novo Heliópolis">Novo Heliópolis</option>
                                    <option value="Santo Antônio">Santo Antônio</option>
                                    <option value="São José">São José</option>
                                    <option value="Severiano de Moraes Filho">Severiano de Moraes Filho</option>
                                </select>
                            </div>

                            <div className={Style.ItemForm}>
                                <label className={Style.Label} htmlFor="Rua">Cor</label>
                                <input className={Style.Input} value={cor} type="Text" id= "Cor" placeholder= "Exemplo: Caramelo" onChange={(e) => {setCor(e.target.value) , setErroCampos(false)}}/>
                            </div>

                            <div className={Style.ItemForm}>
                                <label className={Style.Label} htmlFor="Rua">Rua</label>
                                <input className={Style.Input} value={rua} type="Text" id= "Rua" placeholder= "Exemplo: Rua Agamenon Magalhães" onChange={(e) => {setRua(e.target.value) , setErroCampos(false)}}/>
                            </div>
                            <div className={Style.ItemForm}>
                                <label className={Style.Label} htmlFor="PontoDeReferencia">Ponto de Referência</label>
                                <input className={Style.Input} value={PR} type="Text" id= "PontoDeReferencia" placeholder= "Exemplo: Proximo ao Assaí" onChange={(e) => {setPR(e.target.value) , setErroCampos(false)}}/>
                            </div>
                            <div className={Style.ItemForm}>
                                <label className={Style.Label} htmlFor="Descricao">Dê um breve resumo sobre a situção do animal:</label>
                                <input className={Style.Descricao} value={descricao} type="Text" id= "Descricao" placeholder= "Máximo de 100 Caracteres" maxLength={100} onChange={(e) => {setDescricao(e.target.value) , setErroCampos(false)}}/>
                            </div>
                            {erroCampos == true &&(
                                <div  className={Style.DivErro}>
                                    <h4  className={Style.erro}>
                                        Preencha todos os campos para cadastrar a denúncia com sucesso*
                                    </h4>
                                </div>
                            )
                            }

                        </form>
                    </div>
                    {resposta == null && error == null && carregamento == true &&(
                        <div className={Style.Carregamento}></div>
                    )
                    }
                    <div className={Style.ContainerBtn}>
                        {verificiar_formulario() == true &&(
                            <a className={Style.Btn} onClick={() => {setErroCampos(true)}}> Enviar</a>
                        )
                        }
                        {verificiar_formulario() == false &&(
                            < a className={Style.Btn} onClick={() => {put() , setCarregamento(true)}}> Enviar</a>
                        )
                        }
                        <div className={Style.Separacao} ></div>
                            <a className={Style.Btn} onClick={() => setCancelar(true)}>
                                Cancelar
                            </a>
                        {cancelar == true &&(
                            <Navigate to="/listagem"/>
                        )
                        }
                        {redirecionar == true &&(
                            <Navigate to="/home"/>
                        )
                        }
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

export default ModificarCadastro