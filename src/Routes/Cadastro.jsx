import Style from '../Style/Cadastro.module.css'
import {useState} from 'react'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode'
import Botao from '../Components/Botao'



function Contato(){

    if(localStorage.getItem("token") != null){

        const DataAtual = new Date();
        const HorarioTokenFormatado = parseInt(DataAtual.valueOf()/1000);

        const token_jwt = localStorage.getItem("token");
        const TokenDecodificado = jwtDecode(token_jwt);


        if (TokenDecodificado.exp > HorarioTokenFormatado) {
            
            const [tipo,setTipo] = useState("Cachorro");
            const [descriao,setDescricao] = useState();
            const [localizacao,setLocalizacao] = useState();
            const [rua,setRua] = useState();
            const [cor,setCor] = useState();
            const [bairro,setBairro] = useState("Aloísio Pinto");
            const [PR,setPR] = useState();
            const [foto,setFoto] = useState(undefined);
            const [foto2,setFoto2] = useState(undefined);
            const [foto3,setFoto3] = useState(undefined);
            const [erroCampos,setErroCampos] = useState();

            const [redirecionar, setRedirecionar] = useState();
            const [resposta, setResposta] = useState();
            const [erro, setErro] = useState();
            const [carregamento, setCarregamento] = useState(false);
            
            const [texto, setTexto] = useState("Adicionar Imagem");
            const [texto2, setTexto2] = useState("Adicionar Imagem");
            const [texto3, setTexto3] = useState("Adicionar Imagem");


            const [chave, setChave] = useState("1");
            const [chave2, setChave2] = useState("3");
            const [chave3, setChave3] = useState("5");
            const [chave4, setChave4] = useState("7");
            const [chave5, setChave5] = useState("9");
            const [chave6, setChave6] = useState("11");
            const [chave7, setChave7] = useState("13");
            const [chave8, setChave8] = useState("15");
            const [chave9, setChave9] = useState("17");
            const [validador,setValidador] = useState(false);
            const [erroimg2,setErroImg2] = useState();
            const [erroimg3,setErroImg3] = useState();

            const quantidade_de_imagens = () =>{
                if (foto2 != null && foto3 != null) {
                    return{
                        "tipo" : tipo,
                        "cor" : cor,
                        "localizacao" : "localizacao",
                        "rua" : rua,
                        "bairro" : bairro,
                        "pontoDeReferencia" : PR,
                        "picture1" : foto,
                        "picture2" : foto2,
                        "picture3" : foto3,
                        "descricao" : descriao,
                        "token" : token_jwt
                    }
                }
                else if (foto2 == null && foto3 != null){
                    return{
                        "tipo" : tipo,
                        "cor" : cor,
                        "localizacao" : "localizacao",
                        "rua" : rua,
                        "bairro" : bairro,
                        "pontoDeReferencia" : PR,
                        "picture1" : foto,
                        "picture2" : foto3,
                        "descricao" : descriao,
                        "token" : token_jwt
                    }
                }
                else if (foto2 != null && foto3 == null){
                    return{
                        "tipo" : tipo,
                        "cor" : cor,
                        "localizacao" : "localizacao",
                        "rua" : rua,
                        "bairro" : bairro,
                        "pontoDeReferencia" : PR,
                        "picture1" : foto,
                        "picture2" : foto2,
                        "descricao" : descriao,
                        "token" : token_jwt
                    }
                }
                else{
                    return {
                        "tipo" : tipo,
                        "cor" : cor,
                        "localizacao" : "localizacao",
                        "rua" : rua,
                        "bairro" : bairro,
                        "pontoDeReferencia" : PR,
                        "picture1" : foto,
                        "descricao" : descriao,
                        "token" : token_jwt
                    }
                }
            }
            const post = () => {
                axios.post("https://backend-petcare.herokuapp.com/denuncia",quantidade_de_imagens())
                .then((res) => setResposta(res))
                .catch((res) => setErro(res.message))
                .then(() => {setRedirecionar(true) , console.clear()})
            }

            const verificiar_formulario = () =>{

                if (foto == null || foto == '' || tipo == null || tipo == ''  || cor == null ||
                cor == '' || bairro == null || bairro == '' || rua == null || rua == '' || 
                PR == null || PR == '' || descriao == null || descriao == ''
                ){
                    return true;
                }
                else{
                    return false;
                }
            }
            const converter_imagem = (e) =>{
                if(e != undefined && e != null){
                    const imagemCarregada = e[0];
                    const arquivo = new FileReader ();

                    arquivo.onload = function (arquivoCarregado) {
                        const image= arquivoCarregado.target.result;
                        if (image != foto2 && image != foto3) {
                            setFoto(image);
                        }
                        else if (image != foto2 && image == foto3) {
                            setFoto(image);
                            setFoto3(undefined);
                            setTexto3("Adicionar Imagem");
                            setChave9("18");
                            setChave7("14");
                            setChave5("10");
                            setChave3("6")
                        }
                        else if (image == foto2) {
                            setFoto(image);
                            setFoto2(undefined);
                            setTexto2("Adicionar Imagem");
                            setChave8("16");
                            setChave6("12"); 
                            setChave4("8");
                            setChave2("4");
                        }
                    }
                    arquivo.readAsDataURL(imagemCarregada);
                }
            }
            const converter_imagem2 = (e) =>{
                if(e != undefined && e != null){
                    const imagemCarregada = e[0];
                    const arquivo = new FileReader ();

                    arquivo.onload = function (arquivoCarregado) {
                        const image= arquivoCarregado.target.result;
                        if (image != foto && image != foto3) {
                          setFoto2(image);  
                        }
                        else{
                            setFoto2(null)
                            setErroImg2("imagem repetida");
                            setTexto2("Adicionar Imagem")
                        }
                    }
                    arquivo.readAsDataURL(imagemCarregada);
                }
            }
            const converter_imagem3 = (e) =>{
                if(e != undefined && e != null){
                    const imagemCarregada = e[0];
                    const arquivo = new FileReader ();

                    arquivo.onload = function (arquivoCarregado) {
                        const image= arquivoCarregado.target.result;
                        if (image != foto && image != foto2) {
                          setFoto3(image);  
                        }
                        else{
                            setFoto3(null)
                            setErroImg3("imagem repetida");
                            setTexto3("Adicionar Imagem")
                        }
                    }
                    arquivo.readAsDataURL(imagemCarregada);
                }
            }
            const validar = () =>{
                setValidador(!validador)
            }
            return(
                <div className={Style.ContainerMinimal}>
                    <div className={Style.ContainerGeral}>
                        <form className={Style.form} action="Cadastro" method="Post" encType="multipart/form-data">
                            <div className={Style.ItemForm1}>
                                {foto != undefined &&(
                                    <img className={Style.Imagem} src={foto} alt="" />
                                )
                                }
                                {foto == undefined &&(
                                    <img className={Style.Imagem} src={null} alt="" />
                                )
                                }
                                <label className={Style.FileLabel} htmlFor="PrimeiraImg"> {texto} </label>
                                { foto != null &&(
                                <a className={Style.Logout} onClick={() => {setFoto(undefined) , setTexto("Adicionar Imagem") , setChave("2") ,setValidador(false) , setFoto2(null) , setFoto3(null)}}>X</a>
                                )
                                }
                                <input className={Style.InputFile} key={chave} type="file" accept="image/*" name="image" id="PrimeiraImg" onChange ={(e) => {converter_imagem(e.target.files), setErroCampos(false) , setErro(null) , setCarregamento(false) , setTexto("") , setChave("1")}}/>
                            </div>
                            {foto != undefined &&(
                                <div>
                                    <div className={Style.CheckBox}>
                                        <h4>
                                            deseja adicianar mais imagens?
                                        </h4>
                                    </div>
                                    <div className={Style.CheckBox}>
                                        <input id="checkbox-1" type="checkbox" checked={validador} onChange={(e) => {validar() , setFoto2(null) , setFoto3(null) , setTexto2("Adicionar Imagem") , setTexto3("Adicionar Imagem") , setErroImg2(null) , setErroImg3(null)}}/>
                                        <label htmlFor="checkbox-1"></label>
                                    </div>
                                </div>
                            )
                            }
                            { validador == true && erroimg2 == null && erroimg3 == null &&
                                <div className={Style.ItemForm1}>
                                    {foto2 != undefined &&(
                                        <img className={Style.Imagem} src={foto2} alt="" />
                                    )
                                    }
                                    {foto2 == undefined &&(
                                        <img className={Style.Imagem} src={null} alt="" />
                                    )
                                    }
                                    <label className={Style.FileLabel2} htmlFor="SegundaImg"> {texto2} </label>
                                    {foto2 != null &&(
                                    <a className={Style.Logout} onClick={() => {setFoto2(undefined) , setTexto2("Adicionar Imagem") , setChave8("16") , setChave6("12") , setChave4("8"), setChave2("4")}}>X</a>
                                    )
                                    }
                                    <input className={Style.InputFile} key={chave2} type="file" accept="image/*" name="image2" id="SegundaImg" onChange ={(e) => {converter_imagem2(e.target.files), setErroCampos(false) , setErro(null) , setCarregamento(false) , setTexto2("") , setChave8("15")  , setChave6("11") , setChave4("7"), setChave2("3") , setErroImg2(null)}}/>
                                    {foto3 != undefined &&(
                                        <img className={Style.Imagem} src={foto3} alt="" />
                                    )
                                    }
                                    {foto3 == undefined &&(
                                        <img className={Style.Imagem} src={null} alt="" />
                                    )
                                    }
                                    {foto2 == null &&
                                        <label className={Style.FileLabel31} htmlFor="TerceiraImg"> {texto3} </label>
                                    }
                                    {foto2 != null &&(
                                        <label className={Style.FileLabel3} htmlFor="TerceiraImg"> {texto3} </label>
                                    )
                                    }
                                    {foto3 != null &&(
                                        <a className={Style.Logout} onClick={() => {setFoto3(undefined) , setTexto3("Adicionar Imagem") , setChave9("18") , setChave7("14") , setChave5("10") , setChave3("6")}}>X</a>
                                    )
                                    }
                                    <input className={Style.InputFile} key={chave3} type="file" accept="image/*" name="image2" id="TerceiraImg" onChange ={(e) => {converter_imagem3(e.target.files), setErroCampos(false) , setErro(null) , setCarregamento(false) , setTexto3("") , setChave9("17")  , setChave7("13") , setChave5("9") , setChave3("5") , setErroImg3(null)}}/>
                                </div>
                            }
                            { validador == true && erroimg2 == "imagem repetida" && erroimg3 == null &&
                                <div className={Style.ItemForm1}>
                                    <img className={Style.Imagem} src={null} alt="" />
                                    <label className={Style.FileLabel2} htmlFor="SegundaImg"> {texto2} </label>
                                    <input className={Style.InputFile} key={chave4} type="file" accept="image/*" name="image2" id="SegundaImg" onChange ={(e) => {converter_imagem2(e.target.files), setErroCampos(false) , setErro(null) , setCarregamento(false) , setTexto2("") , setChave8("15")  , setChave6("11") , setChave4("7"), setChave2("3") , setErroImg2(null)}}/>
                                        <div  className={Style.DivErro}>
                                            <h4  className={Style.erro}>
                                                você já selecionou essa imagem antes
                                            </h4>
                                        </div>
                                    {foto3 != undefined &&(
                                        <img className={Style.Imagem} src={foto3} alt="" />
                                    )
                                    }
                                    {foto3 == undefined &&(
                                        <img className={Style.Imagem} src={null} alt="" />
                                    )
                                    }
                                    <label className={Style.FileLabel31Erro} htmlFor="TerceiraImg"> {texto3} </label>
                                    {foto3 != null &&(
                                    <a className={Style.Logout} onClick={() => {setFoto3(undefined) , setTexto3("Adicionar Imagem") , setChave9("18") , setChave7("14") , setChave5("10") , setChave3("6")}}>X</a>
                                    )
                                    }
                                    <input className={Style.InputFile} key={chave5} type="file" accept="image/*" name="image2" id="TerceiraImg" onChange ={(e) => {converter_imagem3(e.target.files), setErroCampos(false) , setErro(null) , setCarregamento(false) , setTexto3("") , setChave9("17")  , setChave7("13") , setChave5("9") , setChave3("5") , setErroImg3(null)}}/>
                                </div>
                            }
                            { validador == true && erroimg2 == null  && erroimg3 == "imagem repetida" &&
                                <div className={Style.ItemForm1}>
                                    {foto2 != undefined &&(
                                        <img className={Style.Imagem} src={foto2} alt="" />
                                    )
                                    }
                                    {foto2 == undefined &&(
                                        <img className={Style.Imagem} src={null} alt="" />
                                    )
                                    }
                                    <label className={Style.FileLabel2} htmlFor="SegundaImg"> {texto2} </label>
                                    { foto2 != null &&(
                                        <a className={Style.Logout} onClick={() => {setFoto2(undefined) , setTexto2("Adicionar Imagem") , setChave8("16") , setChave6("12") , setChave4("8"), setChave2("4")}}>X</a>
                                    )
                                    }
                                    <input className={Style.InputFile} key={chave6} type="file" accept="image/*" name="image2" id="SegundaImg" onChange ={(e) => {converter_imagem2(e.target.files), setErroCampos(false) , setErro(null) , setCarregamento(false) , setTexto2("") , setChave8("15")  , setChave6("11") , setChave4("7"), setChave2("3") , setErroImg2(null)}}/>
                                    <img className={Style.Imagem} src={null} alt="" />
                                    {foto2 != null &&(
                                        <label className={Style.FileLabel3} htmlFor="TerceiraImg"> {texto3} </label>
                                    )
                                    } 
                                    {foto2 == null &&(
                                        <label className={Style.FileLabel31} htmlFor="TerceiraImg"> {texto3} </label>
                                    )
                                    } 
                                    <input className={Style.InputFile} key={chave7} type="file" accept="image/*" name="image2" id="TerceiraImg" onChange ={(e) => {converter_imagem3(e.target.files), setErroCampos(false) , setErro(null) , setCarregamento(false) , setTexto3("") , setChave9("17")  , setChave7("13") , setChave5("9") , setChave3("5") , setErroImg3(null)}}/>
                                    <div  className={Style.DivErro}>
                                        <h4  className={Style.erro}>
                                            você já selecinou essa imagem antes
                                        </h4>
                                    </div>
                                </div>
                            }
                            { validador == true && erroimg2 == "imagem repetida" && erroimg3 == "imagem repetida" &&
                                <div className={Style.ItemForm1}>
                                    <img className={Style.Imagem} src={null} alt="" />
                                    <label className={Style.FileLabel2} htmlFor="SegundaImg"> {texto2} </label>
                                    <input className={Style.InputFile} key={chave8} type="file" accept="image/*" name="image2" id="SegundaImg" onChange ={(e) => {converter_imagem2(e.target.files), setErroCampos(false) , setErro(null) , setCarregamento(false) , setTexto2("") , setChave8("15")  , setChave6("11") , setChave4("7"), setChave2("3"), setErroImg2(null)}}/>
                                    <div  className={Style.DivErro}>
                                        <h4  className={Style.erro}>
                                            você já selecionou essa imagem antes
                                        </h4>
                                    </div>
                                    <img className={Style.Imagem} src={null} alt="" />
                                    <label className={Style.FileLabel31Erro} htmlFor="TerceiraImg"> {texto3} </label>
                                    <input className={Style.InputFile} key={chave9} type="file" accept="image/*" name="image2" id="TerceiraImg" onChange ={(e) => {converter_imagem3(e.target.files), setErroCampos(false) , setErro(null) , setCarregamento(false) , setTexto3("") , setChave9("17")  , setChave7("13") , setChave5("9") , setChave3("5") , setErroImg3(null)}}/>
                                    <div  className={Style.DivErro}>
                                        <h4  className={Style.erro}>
                                            você já selecinou essa imagem antes
                                        </h4>
                                    </div>
                                </div>
                            }
                            {validador == true &&(
                                <p className={Style.Obs}> Obs: imagens adicionais não são obrigatorias</p>
                            )
                            }
                            <div className={Style.ItemForm}>
                                <label className={Style.Label} htmlFor="Especie">Tipo de animal:</label>
                                <select className={Style.Input} name="EspecieDoAnimal" id="Especie" onChange={(e) => {setTipo(e.target.value) , setErroCampos(false) , setErro(null) , setCarregamento(false)}}>
                                    <option value="Cachorro">Cachorro</option>
                                    <option value="Gato">Gato</option>
                                    <option value="Outros">Outros</option>
                                </select>
                            </div>
                            {tipo != null && tipo != "Gato" && tipo != "Cachorro" &&(
                                <div className={Style.ItemForm}>
                                    <input className={Style.Input} type="Text" id= "Tipo" placeholder= "Exemplo: Cavalo" onChange={(e) => {setTipo(e.target.value) , setErroCampos(false) , setErro(null) , setCarregamento(false)}}/>
                                </div>
                            )
                            }
                            <div className={Style.ItemForm}>
                                <label className={Style.Label} htmlFor="Bairro">Bairro:</label>
                                <select className={Style.Input} name="Bairro" id= "Bairro" onChange={(e) => {setBairro(e.target.value) , setErroCampos(false) , setErro(null) , setCarregamento(false)}}>
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
                                <label className={Style.Label} htmlFor="Cor">Cor:</label>
                                <input className={Style.Input} type="Text" id= "Cor" placeholder= "Exemplo: Caramelo" onChange={(e) => {setCor(e.target.value) , setErroCampos(false) , setErro(null) , setCarregamento(false)}}/>
                            </div>

                            <div className={Style.ItemForm}>
                                <label className={Style.Label} htmlFor="Rua">Rua:</label>
                                <input className={Style.Input} type="Text" id= "Rua" placeholder= "Exemplo: Rua Agamenon Magalhães" onChange={(e) => {setRua(e.target.value) , setErroCampos(false) , setErro(null) , setCarregamento(false)}}/>
                            </div>

                            <div className={Style.ItemForm}>
                                <label className={Style.Label} htmlFor="PontoDeReferencia">Ponto de Referência:</label>
                                <input className={Style.Input} type="Text" id= "PontoDeReferencia" placeholder= "Exemplo: Proximo ao Assaí" onChange={(e) => {setPR(e.target.value) , setErroCampos(false) , setErro(null) , setCarregamento(false)}}/>
                            </div>

                            <div className={Style.ItemForm}>
                                <label className={Style.Label} htmlFor="Descricao">Dê um breve resumo sobre a situção do animal:</label>
                                <input className={Style.Descricao} type="Text" id= "Descricao" placeholder= "Máximo de 100 Caracteres" maxLength={100} onChange={(e) => {setDescricao(e.target.value) , setErroCampos(false) , setErro(null) , setCarregamento(false)}}/>
                            </div>
                            {erroCampos == true &&(
                            <div  className={Style.DivErroCampos}>
                                <h4  className={Style.erro}>
                                    Preencha todos os campos para cadastrar a denúncia com sucesso*
                                </h4>
                            </div>
                            )
                            }
                            {erro == "Request failed with status code 500" &&(
                            <div  className={Style.DivErroCampos}>
                                <h4  className={Style.erro}>
                                    Não foi possivel efetuar o cadastro da denúncia!
                                </h4>
                            </div>
                            )
                            }
                            {
                                erro != null && setCarregamento(false)
                            }
                            {resposta == null && erro == null && carregamento == true &&(
                                <div className={Style.Carregamento}></div>
                            )
                            }
                        </form>
                    </div>
                    <div className={Style.ContainerBtn}>
                        {verificiar_formulario() == true  &&(
                            <Botao tipo="interno" nome="Enviar" clique={() => {setErroCampos(true)}}></Botao>
                        )
                        }
                        {verificiar_formulario() == false && carregamento != true &&(
                            <Botao tipo="interno" nome="Enviar" clique={() => {post() , setCarregamento(true)}}></Botao>
                        )
                        }
                        {redirecionar == true && resposta != null &&(
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

export default Contato