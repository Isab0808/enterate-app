import { useState, useEffect } from "react";
import "../styles/Media.css";

import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "../modules/firebase";
import { v4 } from "uuid";

export function Media() {
  const [videos, setVideos] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    getNews();
  }, []);

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

  return (
    <div>
      <div className="news" id="news">
        <div>
          {news.map((item) => {
            return (
              <div className="content-media" key={item.id}>
                <div className="multimedia">
                  <video controls autoPlay>
                    <source src={item.data.download} type="video/mp4" />
                  </video>
                </div>
                <div className="description">
                  <h6>{item.data.category}</h6>
                  <h4 id="short-description">{item.data.author}</h4>
                  <p>
                    {item.data.short}
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
