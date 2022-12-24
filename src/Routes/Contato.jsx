import Style from "../Style/Contato.module.css"


function Contato() {
    return(
        <div className={Style.ContainerMinimal}>
            <div className={Style.ContainerBlock}>
                <h1 className={Style.ContainerBlockH1}>
                    <img className={Style.ContainerBlockImgL} src="/Imagens/PedroLino.jpg" alt=""/>
                </h1>
                <h2 className={Style.ContainerBlockH2}>
                    Pedro Lino
                    <p className={Style.espaço}></p>
                    <p className={Style.ContainerBlockP}>
                        &emsp;Desenvolvedor especializado em Front-End com forte conhecimento em React.Js,
                        foi de vital importância para o desenvolvimento do projeto. Nascido em 2003 o jovem 
                        Jupience estuda atualmente no IFPE -<span className={Style.Italic}>{" Campus "}
                        </span>Garanhuns.
                    </p>
                    <h4 className={Style.ContainerBlockH4}>
                        contato:
                    </h4>
                    <p className={Style.espaço}></p>
                    <p className={Style.ContainerBlockP}>
                        E-mail: <a href="mailto:pedrolinoyoungdev@gmail.com">pedrolinoyoungdev@gmail.com</a>
                        <br />
                        GitHub: <a href="https://github.com/Pedro-Lino-YoungDev">PedroLino YoungDev</a>
                        <br />
                    </p>
                </h2>
            </div>


            <div className={Style.ContainerBlockinvertido}>
                <h1 className={Style.ContainerBlockH1R}>
                    <img className={Style.ContainerBlockImgR}  src="/Imagens/JoãoVitor.jpg" alt="" />
                </h1>
                <h2 className={Style.ContainerBlockH2R}>
                    João Vitor Clemente
                    <p className={Style.espaço}></p>
                    <p className={Style.ContainerBlockPR}>
                        &emsp;Estudante do IFPE -<span className={Style.Italic}>{" Campus "}
                        </span>Garanhuns, o jovem de 19 anos é desenvolvedor Back-End. Compreende 
                        conhecimentos usados para desenvolver uma aplicação RESTful na linguagem PHP 
                        em conjunto do framework Laravel, além de manipular banco de dados PostgreSQL 
                        e MySQL.
                    </p>
                    <h4 className={Style.ContainerBlockH4R}>
                        contato:
                    </h4>
                    <p className={Style.espaço}></p>
                    <p className={Style.ContainerBlockP}>
                        E-mail: <a href="mailto:isidorojoao21@gmail.com">isidorojoao21@gmail.com</a>
                        <br />
                        GitHub: <a href="https://github.com/vitoroambicioso">github.com/vitoroambicioso</a>
                        <br />
                    </p>
                </h2>
            </div>
            <div className={Style.ContainerBlock}>
                <h1 className={Style.ContainerBlockH1}>
                    <img className={Style.ContainerBlockImgL} src="/Imagens/IslanEliezer.jpg" alt="" />
                </h1>
                <h2 className={Style.ContainerBlockH2}>
                    Islan Elizer
                    <p className={Style.espaço}></p>
                    <p className={Style.ContainerBlockP}>
                        &emsp;Estudante com foco em Designer e experiencia do usuário, foi responsavel por
                        auxiliar no designer do site e também contribuiu na documentação. Nascido em 
                        2004 o jovem Jupience estuda atualmente no IFPE -<span className={Style.Italic}>
                        {" Campus "}</span>Garanhuns.
                    </p>
                    <h4 className={Style.ContainerBlockH4}>
                        contato:
                    </h4>
                    <p className={Style.espaço}></p>
                    <p className={Style.ContainerBlockP}>
                        E-mail: <a href="mailto:iecs@discente.ifpe.edu.br">iecs@discente.ifpe.edu.br</a>
                        <br />
                        GitHub: <a href="https://github.com/islanifpe">Islan IFPE</a>
                        <br />
                    </p>
                </h2>

            </div>
            {
                console.clear()
            }
        </div>
    )
}
export default Contato
