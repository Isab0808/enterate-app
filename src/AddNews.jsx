import "./styles/AddNews.css";
import { useState, useEffect } from "react";

import logo from "./images/logo.png";
import { MdOutlineCancel } from "react-icons/md";
import { BsCheckCircle } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";

import { collection, getDocs } from "firebase/firestore";
import { db, storage } from "./modules/firebase";

import { Category } from "./components/Category";

export function AddNews() {
  const [newNews, setNewNews] = useState([]);

  const [selectedNews, setSelectedNews] = useState(null);
  const [addCategory, setAddCateory] = useState(false);

  useEffect(() => {
    getNewNews();
  }, []);

  function handleClickNews(item) {
    setSelectedNews(item);
  }

  function confirmCategory() {
    setAddCateory(true);
  }

  function differentClose() {
    if (selectedNews != null) setSelectedNews(null);
    else {
      console.log("Retroceder a la pantalla anterior");
    }
  }

  function getNewNews() {
    const newsCollection = collection(db, "noticias-nuevas");
    getDocs(newsCollection)
      .then((response) => {
        const tr = response.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
        setNewNews(tr);
      })
      .catch((error) => console.log(error.message));
    return newsCollection;
  }

  return (
    <div>
      {addCategory ? (
        <Category datos={selectedNews} type="text" />
      ) : (
        <div className="app">
          <div className="content" id="content">
            <div className="traer-noticias">
              <a className="iconcerrar" onClick={() => differentClose()}>
                <MdOutlineCancel size={30} />
              </a>
              {selectedNews != null ? (
                <a className="iconconfirmar" onClick={() => confirmCategory()}>
                  <BsCheckCircle size={28} style={{ fontWeight: 100 }} />
                </a>
              ) : null}

              <div className="nueva-publicacin">Nueva publicación</div>
              {/* <img className="buscador-icon" alt="" src={logo} /> */}

              <div className="buscador-icon">
                <div className="container-3">
                  <span className="icon">
                    {/* <i class="fa fa-search"></i> */}
                  </span>
                  <input
                    type="search"
                    id="search"
                    placeholder="Buscar noticia"
                  />
                </div>
              </div>

              <div className="hoy">Hoy</div>
              <div className="noticias" id="noticiasText">
                Noticias
              </div>

              {!selectedNews ? (
                <div className="noticia">
                  {newNews.map((item) => {
                    return (
                      <div className="noticiaTotal">
                        <div
                          className="noticia1"
                          key={item.id}
                          id="noticia1Container"
                          onClick={() => handleClickNews(item)}
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
              ) : (
                <div className="noticia">
                  <div
                    className="noticia1-ampliada"
                    key={selectedNews.id}
                    id="noticia1Container"
                  >
                    <div className="title-new-ampliada">
                      {selectedNews.data.title}
                    </div>
                    <div className="content-new-ampliada">
                      {selectedNews.data.content}
                    </div>
                    <div className="img-container-ampliada">
                      <img
                        className="imgNew-ampliada"
                        src="https://www.eltiempo.com/files/article_main_1200/files/crop/uploads/2023/05/22/646c191fb46ff.r_1684807491405.0-0-1531-919.jpeg"
                      />
                    </div>
                    <div className="source-new-ampliada">
                      {selectedNews.data.source}
                    </div>
                  </div>
                </div>
              )}
              <div className="traer-noticias-child"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
