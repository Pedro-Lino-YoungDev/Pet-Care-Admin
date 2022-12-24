import Style from '../Style/ModificarCadastroDoUsuario.module.css'
import {useState} from 'react'
import axios from 'axios';
import { Navigate, useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode'


function modificarcadastrodousuario() {



    if (localStorage.getItem("token") != null) {

        const DataAtual = new Date();
        const HorarioTokenFormatado = parseInt(DataAtual.valueOf()/1000);

        const token_jwt = localStorage.getItem("token");
        const TokenDecodificado = jwtDecode(token_jwt);


        if (TokenDecodificado.exp > HorarioTokenFormatado) {

            const location = useLocation();
            const { from } = location.state;

            const [foto,setFoto] = useState(from.photo);
            const [nome,setNome] = useState(from.name);
            const [senha,setSenha] = useState();
            const [novaSenha, setNovaSenha] = useState();
            const [senhaVerificada, setSenhaVerificada] = useState();
            const [validador,setValidador] = useState(false);
            const [cancelar,setCancelar] = useState(false);

            const [resposta,setResposta] = useState();
            const [erro,setErro] = useState();

            const [chave, setChave] = useState("1");
            const [erroGeral, setErroGeral] = useState();
            const [texto, setTexto] = useState();
            const FotoGeral = "data:image/png;base64,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"

            const validar_opcoes = () =>{
                if (foto == from.photo) {
                    if(nome == null || nome == ""){
                        return "Seu nome não foi preenchido"
                    }
                    else if(nome == from.name && validador == true){
                        if(senha != null && novaSenha != null && senhaVerificada != null && novaSenha != senha && senhaVerificada == novaSenha){
                            return "modificando apenas a senha"
                        }
                        else if(senha != null && novaSenha != null && senhaVerificada != null && novaSenha != senha && senhaVerificada != novaSenha){
                            return "sua nova senha está diferente na verificação"
                        }
                        else if(senha != null && novaSenha != null && senhaVerificada != null && novaSenha == senha){
                            return "sua nova senha está igual a sua senha atual"
                        }
                        else if(senha != null && novaSenha != null && senhaVerificada == null){
                            return "seu campo de confirmar a senha não está preenchido"
                        }
                        else if(senha != null ){
                            return "Você não preencheu sua nova senha"
                        }
                        else if(senha == null){
                            return "Sua senha não está preenchida"
                        }
                    }
                    else if(nome == from.name && validador == false){
                        if (senha == null) {
                            return "Sua senha não está preenchida"
                        }
                        else{
                            return "Você não modificou nada no seu cadastro"
                        }
                    }
                    else if (nome != from.name && validador == true){
                        if(senha != null && novaSenha != null && senhaVerificada != null && novaSenha != senha && senhaVerificada == novaSenha){
                            return "modificando senha e nome"
                        }
                        else if(senha != null && novaSenha != null && senhaVerificada != null && novaSenha != senha && senhaVerificada != novaSenha){
                            return "sua nova senha está diferente na verificação"
                        }
                        else if(senha != null && novaSenha != null && senhaVerificada != null && novaSenha == senha){
                            return "sua nova senha está igual a sua senha atual"
                        }
                        else if(senha != null && novaSenha != null && senhaVerificada == null){
                            return "seu campo de confirmar a senha não está preenchido"
                        }
                        else if(senha != null){
                            return "Você não preencheu sua nova senha"
                        }
                        else if(senha == null){
                            return "Sua senha não está preenchida"
                        }
                    }
                    else if(nome != from.name && validador == false){
                        if(senha != null){
                            return "modificando apenas o nome"
                        }
                        else {
                            return "Sua senha não está preenchida"
                        }
                    }
                }
                else{
                    if(nome == null || nome == ""){
                        return "Seu nome não foi preenchido"
                    }
                    else if(nome == from.name && validador == true){
                        if(senha != null && novaSenha != null && senhaVerificada != null && novaSenha != senha && senhaVerificada == novaSenha){
                            return "modificando senha e foto"
                        }
                        else if(senha != null && novaSenha != null && senhaVerificada != null && novaSenha != senha && senhaVerificada != novaSenha){
                            return "sua nova senha está diferente na verificação"
                        }
                        else if(senha != null && novaSenha != null && senhaVerificada != null && novaSenha == senha){
                            return "sua nova senha está igual a sua senha atual"
                        }
                        else if(senha != null && novaSenha != null && senhaVerificada == null){
                            return "seu campo de confirmar a senha não está preenchido"
                        }
                        else if(senha != null ){
                            return "Você não preencheu sua nova senha"
                        }
                        else if(senha == null){
                            return "Sua senha não está preenchida"
                        }
                    }
                    else if(nome == from.name && validador == false){
                        if (senha == null) {
                            return "Sua senha não está preenchida"
                        }
                        else{
                            return "modificando apenas a foto"
                        }
                    }
                    else if (nome != from.name && validador == true){
                        if(senha != null && novaSenha != null && senhaVerificada != null && novaSenha != senha && senhaVerificada == novaSenha){
                            return "modificando tudo"
                        }
                        else if(senha != null && novaSenha != null && senhaVerificada != null && novaSenha != senha && senhaVerificada != novaSenha){
                            return "sua nova senha está diferente na verificação"
                        }
                        else if(senha != null && novaSenha != null && senhaVerificada != null && novaSenha == senha){
                            return "sua nova senha está igual a sua senha atual"
                        }
                        else if(senha != null && novaSenha != null && senhaVerificada == null){
                            return "seu campo de confirmar a senha não está preenchido"
                        }
                        else if(senha != null){
                            return "Você não preencheu sua nova senha"
                        }
                        else if(senha == null){
                            return "Sua senha não está preenchida"
                        }
                    }
                    else if(nome != from.name && validador == false){
                        if(senha == null){
                            return "Sua senha não está preenchida"
                        }
                        else {
                            return "modificando nome e foto"
                        }
                    }

                }
            }
            const dados_post = (e) =>{
                if(e == "sem senha nova"){
                    if (foto != null) {
                        return{
                            "photo": foto,
                            "name": nome,
                            "email": from.email,
                            "password": senha,
                            "token" : token_jwt
                        }
                    }
                    else{
                        return{
                                "photo":FotoGeral,
                                "name": nome,
                                "email": from.email,
                                "password": senha,
                                "token" : token_jwt
                        }
                    }
                }
                else if (e == "com senha nova"){
                    if (foto != null) {
                            return{
                                "photo":foto,
                                "name": nome,
                                "email": from.email,
                                "password": senha,
                                "newPassword": senhaVerificada,
                                "token" : token_jwt
                            }
                        }
                    else{
                        return{
                            "photo":FotoGeral,
                            "name": nome,
                            "email": from.email,
                            "password": senha,
                            "newPassword": senhaVerificada,
                            "token" : token_jwt
                        }
                    }
                }

            }
            const set_nome = (value) => {
                if (value == null || value == "") {
                    setNome(null);
                }
                else{
                    setNome(value);
                }
            }
            const set_senha = (value) =>{
                if (value == null || value == "") {
                    setSenha(null);
                }
                else{
                    setSenha(value);
                }        
            }
            const set_nova_senha = (value) =>{
                if (value == null || value == "") {
                    setNovaSenha(null);
                }
                else{
                    setNovaSenha(value);
                }        
            }
            const set_nova_senha_verificada = (value) =>{
                if (value == null || value == "") {
                    setSenhaVerificada(null);
                }
                else{
                    setSenhaVerificada(value);
                }
            }
            const validar = () =>{
                setValidador(!validador)
            }

            const put = (e) => {
                axios.put('https://backend-petcare.herokuapp.com/admin/'+from.id,dados_post(e))
                .then((res) => setResposta(res.data.message))
                .catch((res) => setErro(res.response.data.message))   
            }
            const converter_imagem = (e) =>{
                if(e != undefined && e != null){
                    const imagemCarregada = e[0];
                    const arquivo = new FileReader ();

                    arquivo.onload = function (arquivoCarregado) {
                        const image= arquivoCarregado.target.result;
                        setFoto(image);
                    }
                    arquivo.readAsDataURL(imagemCarregada);
                }
            }

            return(
                <div className={Style.ContainerMinimal}>
                    {
                        console.clear()
                    }
                    <form className={Style.form} action="Cadastro" method="Post" encType="multipart/form-data">
                            <div className={Style.ItemForm}>
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
                                    <a className={Style.Logout} onClick={() => {setFoto(null) , setTexto("Adicionar Imagem") , setChave("2"), setErroGeral(null), console.clear()}}>X</a>
                                )
                                }
                                <input className={Style.InputFile} key={chave} type="file" accept="image/*" name="image" id="PrimeiraImg" onChange ={(e) => {converter_imagem(e.target.files) , setTexto("") , setChave("1"), console.clear()}}/>
                            </div>
                        <div className={Style.ItemForm}>
                            <label className={Style.Label} htmlFor="Nome">Nome:</label>
                            <input className={Style.Input}  value={nome} type="Text" id= "Nome" placeholder= "Exemplo: Caramelo" onChange={(e) => {set_nome(e.target.value), setErroGeral(null), console.clear()}}/>
                        </div>
                        <div className={Style.ItemForm}>
                            <label className={Style.Label} htmlFor="Email">Email:</label>
                            <input className={Style.Input} value={from.email} type="Text" id= "Email" placeholder= "Exemplo: Caramelo" disabled/>
                        </div>
                        <div className={Style.ItemForm}>
                            <label className={Style.Label} htmlFor="senha">Senha Atual:</label>
                            <input className={Style.Input} value={senha} type="password" id= "Senha"onChange={(e) => {set_senha(e.target.value), setErroGeral(null) , setErro(null), console.clear()}}/>
                        </div>
                        <div>
                            <br />
                            <label className={Style.Label} htmlFor="check">Deseja Modificar a Senha?</label>
                            <input className={Style.Input} type="checkbox" id= "check" checked={validador} onChange={(e) => {validar(), set_nova_senha("") , set_nova_senha_verificada(""), setErroGeral(null), console.clear()}}/>
                        </div>
                        {validador == true &&(
                        <div className={Style.ItemForm}>
                            <label className={Style.Label} htmlFor="Nome">Nova Senha:</label>
                            <input className={Style.Input} value={novaSenha} type="password" id= "SenhaNova"onChange={(e) => {setNovaSenha(e.target.value), setErroGeral(null), console.clear()}}/>
                        </div>
                        )
                        }
                        {validador == true &&(
                        <div className={Style.ItemForm}>
                            <label className={Style.Label} htmlFor="Nome">Confirmar Nova Senha:</label>
                            <input className={Style.Input} value={senhaVerificada} type="password" id= "SenhaVerificada"onChange={(e) => {setSenhaVerificada(e.target.value), setErroGeral(false), console.clear()}}/>
                        </div>
                        )
                        }
                        {erro == "login attempt failed" &&(
                            <h4 className={Style.erro}>                
                                Oops! a sua senha está incorreta     
                            </h4>
                        )
                        }
                    </form>
                    {erroGeral != null &&(
                        <h4 className={Style.erro}>
                            {erroGeral}
                        </h4>
                    )
                    }
                    {validar_opcoes() == "Seu nome não foi preenchido" &&(
                        <div className={Style.DivBtn}>
                            <a className={Style.Btn} onClick={() => setErroGeral("Seu nome não foi preenchido")}>Enviar</a>
                        </div>
                    )
                    }
                    {validar_opcoes() == "Você não modificou nada no seu cadastro" &&(
                        <div className={Style.DivBtn}>
                            <a className={Style.Btn} onClick={() => setErroGeral("Você não modificou nada no seu cadastro")}>Enviar</a>
                        </div>
                    )
                    }
                    {validar_opcoes() == "Sua senha não está preenchida" &&(
                        <div className={Style.DivBtn}>
                            <a className={Style.Btn} onClick={() => setErroGeral("Sua senha não está preenchida")}>Enviar</a>
                        </div>      
                    )
                    }
                    {validar_opcoes() == "Você não preencheu sua nova senha" &&(
                        <div className={Style.DivBtn}>
                            <a className={Style.Btn} onClick={() => setErroGeral("Você não preencheu sua nova senha")}>Enviar</a>
                        </div>   
                    )
                    }
                    {validar_opcoes() == "seu campo de confirmar a senha não está preenchido" &&(
                        <div className={Style.DivBtn}>
                            <a className={Style.Btn} onClick={() => setErroGeral("seu campo de confirmar a senha não está preenchido")}>Enviar</a>
                        </div>   
                    )
                    }
                    {validar_opcoes() == "sua nova senha está igual a sua senha atual" &&(
                        <div className={Style.DivBtn}>
                            <a className={Style.Btn} onClick={() => setErroGeral("sua nova senha está igual a sua senha atual")}>Enviar</a>
                        </div>   
                    )
                    }
                    {validar_opcoes() == "sua nova senha está diferente na verificação" &&(
                        <div className={Style.DivBtn}>
                            <a className={Style.Btn} onClick={() => setErroGeral("sua nova senha está diferente na verificação")}>Enviar</a>
                        </div>   
                    )
                    }
                    {validar_opcoes() == "modificando apenas a foto" &&(
                        <div className={Style.DivBtn}>
                            <a className={Style.Btn} onClick={() => put("sem senha nova")}>Enviar</a>
                        </div>   
                    )
                    }
                    {validar_opcoes() == "modificando apenas o nome" &&(
                        <div className={Style.DivBtn}>
                            <a className={Style.Btn} onClick={() => put("sem senha nova")}>Enviar</a>
                        </div>   
                    )
                    }
                    {validar_opcoes() == "modificando nome e foto" &&(
                        <div className={Style.DivBtn}>
                            <a className={Style.Btn} onClick={() => put("sem senha nova")}>Enviar</a>
                        </div>   
                    )
                    }
                    {validar_opcoes() == "modificando apenas a senha" &&(
                        <div className={Style.DivBtn}>
                            <a className={Style.Btn} onClick={() => put("com senha nova")}>Enviar</a>
                        </div>   
                    )
                    }
                    {validar_opcoes() == "modificando senha e foto" &&(
                        <div className={Style.DivBtn}>
                            <a className={Style.Btn} onClick={() => put("com senha nova")}>Enviar</a>
                        </div>   
                    )
                    }
                    {validar_opcoes() == "modificando senha e nome" &&(
                        <div className={Style.DivBtn}>
                            <a className={Style.Btn} onClick={() => put("com senha nova")}>Enviar</a>
                        </div>   
                    )
                    }
                    {validar_opcoes() == "modificando tudo" &&(
                        <div className={Style.DivBtn}>
                            <a className={Style.Btn} onClick={() => put("com senha nova")}>Enviar</a>
                        </div>   
                    )
                    }
                    <div className={Style.DivBtn}>
                        <a className={Style.Btn} onClick={() => setCancelar(true)}>
                            Cancelar
                        </a>
                    </div>
                    {cancelar == true &&(
                        <Navigate to="/usuario"/>
                    )
                    }
                    {resposta == "records updated successfully with new passowrd" && foto != null&&(
                        localStorage.setItem("foto",foto),
                        <Navigate to="/home"/>
                    )
                    }
                    {resposta == "records updated successfully with old password" && foto != null &&(
                        localStorage.setItem("foto",foto),
                        <Navigate to="/home"/>
                    )
                    }
                    {resposta == "records updated successfully with old password" && foto == null&&(
                        localStorage.setItem("foto",FotoGeral),
                        <Navigate to="/home"/>
                    )
                    }
                    {resposta == "records updated successfully with old password" && foto == null &&(
                        localStorage.setItem("foto",FotoGeral),
                        <Navigate to="/home"/>
                    )
                    }
                    {erro == "token has expired" &&(
                        <Navigate to="/login"/>
                    )
                    }
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
export default modificarcadastrodousuario