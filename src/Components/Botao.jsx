import Style from '../Style/Botao.module.css';
import {Link} from 'react-router-dom';

function Botao({tipo, nome, rota, clique, estado}){
    if (tipo == "redirecionar") {
        return <Link className={Style.Btn} state={estado} to ={rota}>{nome}</Link> 
    }
    else if (tipo == "interno") {
        return <Link className={Style.Btn} onClick={clique} >{nome}</Link>
    }

}

export default Botao;