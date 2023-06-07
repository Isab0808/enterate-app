import "./styles/CreateContent.css";
import texture from "./images/texture2.png";

import { useState, useEffect } from "react";

import { AddNews } from "./AddNews";
import { Menu } from "./components/Menu";

import React, { useRef } from "react";
import { Category } from "./components/Category";

export function CreateContent() {
  const fileInput = useRef(null);

  const [showAddNews, setShowAddNews] = useState(false);
  const [showAddMedia, setShowAddMedia] = useState(false);

  const [video, setVideo] = useState();

  const handleFileInput = async (event) => {
    try {
      // const storageRef = ref(storage, "tendencias/" + v4());
      // await uploadBytes(storageRef, event.target.files[0]);
      // const url = await getDownloadURL(storageRef);
      // uploadData(url);
      await setVideo(event.target.files[0]);
      setShowAddMedia(true);
    } catch (error) {
      console.error(error);
    }
  };

  // function uploadData(url) {
  //   const newsCollection = collection(db, "news");
  //   addDoc(newsCollection, {
  //     author: "Isabella",
  //     category: "Politica",
  //     short:
  //       "Noticia de ultima hora por posible dictadura del presidente petro ",
  //     download: url,
  //   })
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.error(error.message);
  //     });
  // }

  const addNews = () => {
    setShowAddNews(true);
  };

  const handleUploadClick = () => {
    document.getElementById("file").click();
  };

  return (
    <div>
      {showAddNews ? (
        <div>
          <AddNews />
          <Menu />
        </div>
      ) : showAddMedia ? (
        <Category datos={{ video: video }} type="video" />
      ) : (
        <div className="add" id="addNewscontent">
          <div className="add-content">
            <div className="texture">
              <h3>Crear Contenido</h3>
              <img src={texture} alt="" />
            </div>
            <div className="uploadsContent">
              <a onClick={handleUploadClick}>
                <span>Video/Imagen</span>
              </a>
              <input
                type="file"
                id="file"
                className="files"
                name="filename"
                accept="image/*, video/*"
                onChange={handleFileInput}
                ref={fileInput}
              />
            </div>
            <div className="LoadNews">
              <a onClick={addNews}>
                <span>Cargar Noticias</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
