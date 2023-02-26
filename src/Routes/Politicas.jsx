import Style from "../Style/Politicas.module.css"


function Politicas() {
    return(
        <div className={Style.ContainerMinimal}>
            <div className={Style.ContainerTranslucido}>
                <h2>
                    Políticas da Pet Care
                </h2>
                <h3>
                    Ao acessar nossos serviços você está disposto a ceder dados pessoais como:
                </h3>
                <ul>
                    <li>
                        Email
                    </li>
                    <li>
                        Nome
                    </li>
                    <li>
                        Foto de perfil
                    </li>
                </ul>
                <h3>
                    Ao cadastrar a denúncia 
                </h3>
                <ul>
                    <li>
                        O usuário só poderá editar os dados enviados em até 1 dia após o cadastro.
                    </li>
                    <li>
                        O usuário deve enviar ao menos 1 foto do animal, sendo possível adicinar no máximo
                        3.
                    </li>
                    <li>
                        O usuário não poderá excluir as denúncias cadastradas.
                    </li>
                    <li>
                        Caso o animal que você cadastrou já tenha sido cadastrado por outra pessoa, a sua denúncia será excluída.
                    </li>
                    <li>
                        se ouver incongruência na sua denúncia a mesma será excluída.
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default Politicas
