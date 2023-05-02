import "./styles/AddNews.css";

import logo from "./images/logo.png";
import { AiFillCloseCircle } from "react-icons/ai";

export function AddNews() {
  return (
    <div className="app">
      <div className="content" id="content">
        <div className="traer-noticias">
          <a className="iconcerrar">
            <AiFillCloseCircle />
          </a>

          <div className="nueva-publicacin">Nueva publicación</div>
          <img className="buscador-icon" alt="" src={logo} />

          <div className="hoy">Hoy</div>
          <div className="noticias" id="noticiasText">
            Noticias
          </div>
          <div className="noticia">
            <div className="noticia2">
              <div className="ley-de-sometimiento">
                Ley de sometimiento: Cepeda pide al fiscal entregar sus
                recomendaciones completas
              </div>
              <div className="el-pas">El País</div>
              <div className="gustavo-petro-envi">
                Ley de sometimiento: Cepeda pide al fiscal entregar sus
              </div>
              <img className="imagen-icon1" alt="" src={logo} />
            </div>
            <div className="noticia1" id="noticia1Container">
              <div className="ley-de-sometimiento">
                Presidente Petro insiste en transición energética tras tragedia
                en Sutatausa
              </div>
              <div className="gustavo-petro-envi">
                Gustavo Petro envió sus condolencias a las familias de
              </div>
              <div className="el-pas1">El País</div>
              <img className="imagen-icon1" alt="" src={logo} />
            </div>
          </div>
          <div className="traer-noticias-child"></div>
        </div>
      </div>
    </div>
  );
}
