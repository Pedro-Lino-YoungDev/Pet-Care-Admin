import Style from '../Style/Footer.module.css'
import Link from './Link'

function footer(){
  return(
    <>
      <footer className={Style.Footer}>
        <div className={Style.FooterItem1}>
          <Link tipo="navegação" nome ="Sobre" url="/sobre"/>
        </div>
        <div  className={Style.FooterItem2}>
          <Link tipo="navegação" nome ="Políticas" url="politicas_da_empresa"/>
        </div>
        <div className={Style.FooterItem3}>
          <Link tipo="navegação" nome ="Contato" url="/contato"/>
        </div>
      </footer>
      <div className={Style.Copyright}><h4 className={Style.h4}>© 2022 Copyright:
        <Link tipo="navegação" nome ="PetCare" url="/contato"/>
        </h4> 
      </div>
    </>
  )
}

export default footer;