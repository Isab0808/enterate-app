import { useState, useEffect } from "react";
import "../styles/Media.css";

import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "../modules/firebase";

export function Media() {
  const [videos, setVideos] = useState([]);
  const [news, setNews] = useState([]);
  const [notice, setNotice] = useState([]);

  const [join, setJoin] = useState([]);

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
    const combineLists = () => {
      const combined = [...news, ...notice];
      //const shuffled = combined.sort(() => Math.random() - 0.5);

      const ordenado = combined.sort(compareByCategoria);
      setJoin(ordenado);
    };

    combineLists();
  }, [news, notice]);

  useEffect(() => {
    console.log(join);
  }, [join]);

  return (
    <div>
      <div className="news" id="news">
        <div>
          {join.map((item) => {
            return (
              <div className="content-media" key={item.id}>
                <div className="multimedia">
                  {item.data.type === "video" ? (
                    <video controls>
                      <source src={item.data.download} type="video/mp4" />
                    </video>
                  ) : (
                    <img src={item.data.imgUrl} />
                  )}
                </div>
                <div className="description">
                  <h6>{item.data.category[0]}</h6>
                  <h4 id="short-description">{item.data.author}</h4>
                  <p>
                    {item.data.description}
                    <a>Ver más</a>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
