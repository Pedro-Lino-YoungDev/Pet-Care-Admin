import Style from "../Style/Sobre.module.css"

function Sobre() {
    return(
        <div className={Style.ContainerMinimal}>
            <div className={Style.ContainerTranslucido}>
                <h1>
                    Sobre nós
                </h1>
                <h3>
                    Quem somos?
                </h3>
                <p>
                    Uma equipe de 4 pessoas que surgiu da vontade comum em ajudar os animais. Isso se deu 
                    através de um projeto de conclusão de curso no IFPE -<span className={Style.Italic}>
                    {" Campus "}</span>Garanhuns no qual 3 alunos se reuniram com um professor para realizar
                    esse trabalho.
                </p>
            </div>
            <div className={Style.ContainerVerde}>
                <h1>
                   Pet Care
                </h1>
                <h3>
                    Nossa maior missão é ajudar os animais
                </h3>
                <p>
                    Com base em um levantamento de dados prévio e também o senço comum nós da
                    <span className={Style.Bold}>
                        {" Pet Care "}
                    </span>
                    desenvolvemos este site para ajudar no controle de animais nas ruas, tendo como
                    beneficio tanto uma melhora para os animais, mas também uma melhora para as pessoas 
                    que irão usufruir de uma segurança e saúde nas ruas, como também uma melhor 
                    qualidade  no ambiente, tanto no que diz respeito a limpeza e na diminiuição 
                    de possiveis ataques de animais.
                </p>

            </div>
        </div>
    )
}
export default Sobre;
