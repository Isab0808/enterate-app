import { useState, useEffect } from "react";
import "../styles/Media.css";

import {
  AiOutlineHeart,
  AiOutlineDoubleRight,
  AiFillHeart,
} from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { BsSend } from "react-icons/bs";
import { BiBookmark } from "react-icons/bi";
import { IoReaderOutline } from "react-icons/io5";

import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "../modules/firebase";

import { NoticiaAmpliada } from "../NoticiaAmpliada";

export function Media() {
  const [videos, setVideos] = useState([]);
  const [news, setNews] = useState([]);
  const [notice, setNotice] = useState([]);

  const [join, setJoin] = useState([]);

  const [ampliada, setAmpliada] = useState(null);

  const [isLike, setIsLike] = useState([]);

  const options = [
    "Reforma pensional",
    "Reforma a la salud",
    "Reforma laboral",
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);

  useEffect(() => {
    getNews();
    getNotices();
  }, []);

  function getNotices() {
    const newsCollection = collection(db, "tendencias");
    getDocs(newsCollection)
      .then((response) => {
        const tr = response.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
        setNotice(tr);
      })
      .catch((error) => console.log(error.message));
    return newsCollection;
  }

  function getNews() {
    const newsCollection = collection(db, "news");
    getDocs(newsCollection)
      .then((response) => {
        const nw = response.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
        setNews(nw);
        getVideos(nw);
      })
      .catch((error) => console.log(error.message));
    return newsCollection;
  }

  function getVideos(nws) {
    const v = nws.map((path) => {
      const videoRef = ref(storage, path.data.url);
      return getDownloadURL(videoRef);
    });
    Promise.all(v)
      .then((urls) => {
        setVideos(urls);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  const compareByCategoria = (a, b) => {
    const categoriasOrden = [
      "Reforma a la Salud",
      "Reforma Laboral",
      "Reforma Pensional",
    ];
    const categoriaA = categoriasOrden.indexOf(a.data.category[0]);
    const categoriaB = categoriasOrden.indexOf(b.data.category[0]);

    return categoriaA - categoriaB;
  };

  useEffect(() => {
    const combined = [...news, ...notice];
    const shuffled = combined.sort(() => Math.random() - 0.5);
    const filtered = shuffled.filter((item) =>
      item.data.category.includes(selectedOption)
    );
    setJoin(filtered);
  }, [selectedOption, news, notice]);

  const handleOptionChange = () => {
    const currentIndex = options.indexOf(selectedOption);
    const nextIndex = (currentIndex + 1) % options.length;
    setSelectedOption(options[nextIndex]);

    const combined = [...news, ...notice];
    const shuffled = combined.sort(() => Math.random() - 0.5);
    const filtered = shuffled.filter((item) =>
      item.data.category.includes(selectedOption)
    );
    setJoin(filtered);
  };

  const handleLike = (id, index) => {
    // Lógica para manejar el evento de "Me gusta"
    setIsLike([...isLike, id]);
    // Encontrar el índice del elemento con el id dado en el array 'join'
    console.log(index);
    console.log("entrada:");
    console.log(join);
    // Crear una nueva copia del array 'join'
    //const updatedJoin = [...join];
    const updatedJoin = join.slice(index + 1);
    console.log("ordenar");
    console.log(updatedJoin);
    const base = join[index];
    console.log(base);
    // Filtrar los elementos con orientacion 'derecha' o 'centro'
    const rightAndCenter = updatedJoin.filter(
      (item) => item.data.orientacion !== base.data.orientacion
    );
    // Filtrar los elementos con orientacion 'izquierda'
    const left = updatedJoin.filter(
      (item) => item.data.orientacion === base.data.orientacion
    );
    const sortedJoin = [
      ...join.slice(0, index + 1),
      ...rightAndCenter,
      ...left,
    ];
    console.log("fin:");
    console.log(sortedJoin);
    // Actualizar el estado con el array 'sortedJoin'
    setJoin(sortedJoin);
  };

  const handleSave = (id) => {
    // Lógica para manejar el evento de "Guardar"
    console.log("Guardar: ", id);
  };

  const handleAmpliarNoticia = (data) => {
    setAmpliada(data);
  };

  return (
    <div>
      {ampliada ? (
        <NoticiaAmpliada data={ampliada} />
      ) : (
        <div>
          <div className="options">
            <h4 id="tendencias">{selectedOption}</h4>
            <a>
              <i onClick={handleOptionChange}>
                <AiOutlineDoubleRight size={18} />
              </i>
            </a>
          </div>
          <div className="news" id="news">
            <div>
              {join.map((item, index) => {
                return (
                  <div className="content-media" key={item.id}>
                    <div className="multimedia">
                      {item.data.type === "video" ? (
                        <video controls>
                          <source src={item.data.download} type="video/mp4" />
                        </video>
                      ) : (
                        <div className="titulo-content">
                          <p className="titulo-noticia">{item.data.title}</p>
                          <p className="fuente-noticia">- {item.data.source}</p>
                        </div>
                      )}
                      <div className="actions">
                        <button
                          className="action-button"
                          onClick={() => handleLike(item.id, index)}
                        >
                          {isLike.includes(item.id) ? (
                            <AiFillHeart size={30} color="#F9B166" />
                          ) : (
                            <AiOutlineHeart size={30} />
                          )}
                        </button>
                        <button className="action-button">
                          <BiComment size={30} />
                        </button>
                        <button
                          className="action-button"
                          onClick={() => handleSave(item.id)}
                        >
                          <BiBookmark size={30} />
                        </button>
                        <button className="action-button">
                          <BsSend size={28} />
                        </button>
                        {item.data.type === "texto" && (
                          <button
                            className="action-button"
                            onClick={() => handleAmpliarNoticia(item)}
                          >
                            <IoReaderOutline size={32} />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="description">
                      <h6>{item.data.category[0]}</h6>
                      <h4 id="short-description">{item.data.author}</h4>
                      <p>{item.data.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
