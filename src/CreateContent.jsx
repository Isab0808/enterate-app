import "./styles/CreateContent.css";
import texture from "./images/texture2.png";

import { v4 } from "uuid";

import { storage } from "./modules/firebase";
import { db } from "./modules/firebase";
import { collection, addDoc } from "firebase/firestore";

import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

import React, { useRef } from "react";

export function CreateContent() {
  const fileInput = useRef(null);

  const handleFileInput = async (event) => {
    try {
      const storageRef = ref(storage, "tendencias/" + v4());
      await uploadBytes(storageRef, event.target.files[0]);
      const url = await getDownloadURL(storageRef);
      uploadData(url);
    } catch (error) {
      console.error(error);
    }
  };

  function uploadData(url) {
    const newsCollection = collection(db, "news");
    addDoc(newsCollection, {
      author: "Isabella",
      category: "Politica",
      short:
        "Noticia de ultima hora por posible dictadura del presidente petro ",
      download: url,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  const handleUploadClick = () => {
    document.getElementById("file").click();
  };

  return (
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
          <a>
            <span>Cargar Noticias</span>
          </a>
        </div>
      </div>
    </div>
  );
}
