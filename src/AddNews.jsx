import "./styles/AddNews.css";
import { useState, useEffect } from "react";

import logo from "./images/logo.png";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";

import { collection, getDocs } from "firebase/firestore";
import { db, storage } from "./modules/firebase";

export function AddNews() {
  const [newNews, setNewNews] = useState([]);

  useEffect(() => {
    getNewNews();
  }, []);

  function getNewNews() {
    const newsCollection = collection(db, "noticias-nuevas");
    getDocs(newsCollection)
      .then((response) => {
        const tr = response.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
        console.log(tr);
        setNewNews(tr);
      })
      .catch((error) => console.log(error.message));
    return newsCollection;
  }

  return (
    <div className="app">
      <div className="content" id="content">
        <div className="traer-noticias">
          <a className="iconcerrar">
            <AiOutlineCloseCircle />
          </a>

          <div className="nueva-publicacin">Nueva publicación</div>
          {/* <img className="buscador-icon" alt="" src={logo} /> */}

          <div className="buscador-icon">
            <div className="container-3">
              <span className="icon">{/* <i class="fa fa-search"></i> */}</span>
              <input type="search" id="search" placeholder="Buscar noticia" />
            </div>
          </div>

          <div className="hoy">Hoy</div>
          <div className="noticias" id="noticiasText">
            Noticias
          </div>
          <div className="noticia">
            {newNews.map((item) => {
              return (
                <div className="noticiaTotal">
                  <div
                    className="noticia1"
                    key={item.id}
                    id="noticia1Container"
                  >
                    <div className="title-new">{item.data.title}</div>
                    <div className="content-new">{item.data.content}</div>
                    <div className="source-new">{item.data.source}</div>
                  </div>
                  <div className="img-container">
                    <img
                      className="imgNew"
                      src="https://www.eltiempo.com/files/article_main_1200/files/crop/uploads/2023/05/22/646c191fb46ff.r_1684807491405.0-0-1531-919.jpeg"
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="traer-noticias-child"></div>
        </div>
      </div>
    </div>
  );
}
