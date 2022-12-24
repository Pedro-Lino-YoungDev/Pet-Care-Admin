import Style from '../Style/Denuncia.module.css'
import { Navigate, useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode'
import Botao from '../Components/Botao'



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

        

        if (decodificado.exp > HorarioTokenFormatado) {

            const location = useLocation();
            const { from } = location.state;

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

            //validando a data da denúncia;
            if(AnoAtual == AnoDenuncia+ 1){
                if(MesDenuncia == 12 && MesAtual == 1){
                    if(DiaAtual == 1 && DiaDenuncia == 31){
                        if (HoraAtual < HoraDenuncia ) {
                            validador = true;
                        }
                        else if(HoraAtual == HoraDenuncia && MinutosAtuais < MinutosDenuncia){
                            validador = true;
                        }
                        else{
                            validador = false;
                        }
                    }
                    else{
                        validador = false;
                    }
                }
                else{
                    validador = false
                }
            }
            else if (AnoAtual > AnoDenuncia+1){
                validador = false;
            }
            else{
                if(MesAtual == MesDenuncia+1){
                    if (ano_bissexto(AnoDenuncia) == true){
                        //meses com 31 dias == 1, 3, 5, 7, 8, 10, 12.
                        if(MesDenuncia == 1 || MesDenuncia == 3 || MesDenuncia == 5 || MesDenuncia == 7 || MesDenuncia == 8 || MesDenuncia == 10){
                            if (DiaAtual == 1 && DiaDenuncia == 31) {
                                if (HoraAtual < HoraDenuncia ) {
                                    validador = true;
                                }
                                else if(HoraAtual == HoraDenuncia && MinutosAtuais < MinutosDenuncia){
                                    validador = true;
                                }
                                else{
                                    validador = false;
                                }
                            }
                            else{
                                validador = false;
                            }
                        }
                        else if(MesDenuncia == 2){
                            if (DiaAtual == 1 && DiaDenuncia == 29) {
                                if (HoraAtual < HoraDenuncia) {
                                    validador = true;
                                }
                                else if(HoraAtual == HoraDenuncia && MinutosAtuais < MinutosDenuncia){
                                    validador = true;
                                }
                                else{
                                    validador = false;
                                }
                            }
                            else{
                                validador = false;
                            }
                        }
                        else{
                            if (DiaAtual == 1 && DiaDenuncia == 30) {
                                if (HoraAtual < HoraDenuncia ) {
                                    validador = true;
                                }
                                else if(HoraAtual == HoraDenuncia && MinutosAtuais < MinutosDenuncia){
                                    validador = true;
                                }
                                else{
                                    validador = false;
                                }
                            }
                            else{
                                validador = false;
                            }
                        }
                    }
                    else{
                        if(MesDenuncia == 1 || MesDenuncia == 3 || MesDenuncia == 5 || MesDenuncia == 7 || MesDenuncia == 8 || MesDenuncia == 10){
                            if (DiaAtual == 1 && DiaDenuncia == 31) {
                                if (HoraAtual < HoraDenuncia ) {
                                    validador = true;
                                }
                                else if(HoraAtual == HoraDenuncia && MinutosAtuais < MinutosDenuncia){
                                    validador = true;
                                }
                                else{
                                    validador = false;
                                }
                            }
                            else{
                                validador = false;
                            }
                        }
                        else if(MesDenuncia == 2){
                            if (DiaAtual == 1 && DiaDenuncia == 28) {
                                if (HoraAtual < HoraDenuncia) {
                                    validador = true;
                                }
                                else if(HoraAtual == HoraDenuncia && MinutosAtuais < MinutosDenuncia){
                                    validador = true;
                                }
                                else{
                                    validador = false;
                                }
                            }
                            else{
                                validador = false;
                            }
                        }
                        else{
                            if (DiaAtual == 1 && DiaDenuncia == 30) {
                                if (HoraAtual < HoraDenuncia ) {
                                    validador = true;
                                }
                                else if(HoraAtual == HoraDenuncia && MinutosAtuais < MinutosDenuncia){
                                    validador = true;
                                }
                                else{
                                    validador = false;
                                }
                            }
                            else{
                                validador = false;
                            }
                        }
                    }
                }
                else if(MesAtual > MesDenuncia+1){
                    validador = false;
                }
                else{
                    if (DiaAtual == DiaDenuncia+1){
                        if (HoraAtual < HoraDenuncia) {
                            validador = true;
                        }
                        else if(HoraAtual == HoraDenuncia && MinutosAtuais < MinutosDenuncia){
                            validador = true;
                        }
                        else{
                            validador = false;
                        }
                    }
                    else if(DiaAtual>DiaDenuncia+1){
                        validador = false
                    }
                    else{
                        validador = true;
                    }
                }
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
                            <p>
                                {from.tipo}
                            </p>
                        </div>
                
                        <div>
                            <h4>
                                Cor do animal:
                            </h4>
                            <p>
                                {from.cor}
                            </p>
                        </div>
                
                        <div>
                            <h4> 
                                Rua:
                            </h4>
                            <p>
                                {from.rua}
                            </p>
                        </div>
                
                        <div>
                            <h4>
                                Bairro:
                            </h4>
                            <p>
                                {from.bairro}
                            </p>
                        </div>
                
                        <div>
                            <h4>
                                Ponto de Referência:
                            </h4>
                            <p>
                                {from["pontoDeReferencia"]}
                            </p>
                        </div>
                        <div>
                            <h4>
                                Data de Cadastro:
                            </h4>
                            <p>
                            {formatar_data(from["created_at"])} as {formatar_horario(from["created_at"])}
                            </p>
                        </div>
                        <div>
                            <h4>
                                Ultima Atualização:
                            </h4>
                            <p>
                            {formatar_data(from["updated_at"])} as {formatar_horario(from["updated_at"])}
                            </p>
                        </div>
                        <div>
                             <h4>
                                Descrição
                             </h4>
                            <p>{from.descricao}</p>
                        </div>
                        
                        
                        <div className={Style.ContainerBtn}> 
                            {validador == true &&(
                                <Botao tipo="redirecionar" nome="Modificar" estado={{from:from}} rota="/modificardenuncia"></Botao>
                            )
                            }
                        </div>
                        
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

export default Denuncia;