import Style from '../Style/Link.module.css'
import {Link} from 'react-router-dom'

function link({tipo,nome,url}) {
    if (tipo == "navegação") {
        return <Link className={Style.Link} to ={url}> {nome}</Link> 
    }

    else if (tipo == "interno"){
        return <Link className={Style.LinkInterno} to ={url}> {nome}</Link> 
    }
}

export default link