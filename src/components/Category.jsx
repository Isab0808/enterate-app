import "../styles/Category.css";

import { useState, useEffect } from "react";

import { v4 } from "uuid";

import { db } from "../modules/firebase";
import { collection, addDoc } from "firebase/firestore";
import { storage } from "../modules/firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

import { AiOutlineCloseCircle } from "react-icons/ai";

export function Category(props) {
  const [categorias, setCategorias] = useState({
    categoria1: false,
    categoria2: false,
    categoria3: false,
  });

  const [isOpen, setIsOpen] = useState(true);

  const [textareaValue, setTextareaValue] = useState("");

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  const saveText = (categoriasTrue) => {
    const datos = {
      description: textareaValue,
      title: props.datos.data.title,
      content: props.datos.data.content,
      source: props.datos.data.source,
      date: new Date(),
      imgUrl: "",
      categories: categoriasTrue,
    };

    const newsCollection = collection(db, "noticias");

    addDoc(newsCollection, datos)
      .then((response) => {
        console.log(response);
        //cambiar de pestaña
        setIsOpen(false);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const saveVideo = async (categoriasTrue) => {
    try {
      const storageRef = ref(storage, "tendencias/" + v4());
      await uploadBytes(storageRef, props.datos.video);
      const url = await getDownloadURL(storageRef);
      uploadData(url, categoriasTrue);
    } catch (error) {
      console.error(error);
    }
  };

  function uploadData(url, categoriasTrue) {
    const newsCollection = collection(db, "noticias");
    addDoc(newsCollection, {
      author: "Isabella",
      category: "Politica",
      description: textareaValue,
      short:
        "Noticia de ultima hora por posible dictadura del presidente petro ",
      download: url,
      categories: categoriasTrue,
    })
      .then((response) => {
        console.log(response);
        setIsOpen(false);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  const handleButtonPublish = () => {
    const categoriasTrue = Object.entries(categorias)
      .filter(([_, valor]) => valor === true)
      .map(([clave, _]) => clave);

    if (props.type === "text") {
      saveText(categoriasTrue);
    } else if (props.type === "video") {
      saveVideo(categoriasTrue);
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCategorias((prevCategorias) => ({
      ...prevCategorias,
      [name]: checked,
    }));
  };

  useEffect(() => {
    //console.log(categorias);
  }, [categorias]);

  // if (!isOpen) {
  //   return null;
  // }

  return (
    <div className="app">
      <div className="categora">
        <div className="encabezado">
          <img className="tramaIcon" alt="" src="/src/images/category.png" />
          {/* <img className="iconcancelar" alt="" src={AiOutlineCloseCircle} /> */}
          <a className="iconcancelar">
            <AiOutlineCloseCircle />{" "}
          </a>
          <div className="nuevaPublicacin">Nueva publicación</div>
          <div className="new-title">
            {props.type == "text" ? (
              <p>{props.datos.data.title}</p>
            ) : (
              <video controls>
                <source src={props.datos.video} type="video/mp4" />
              </video>
            )}
          </div>
        </div>
        <div className="description-news">
          <textarea
            type="text"
            className="description-input"
            placeholder="Escribe una descripción"
            onChange={handleTextareaChange}
          />
        </div>
        <div className="content-category">
          <div className="seleccionaUnaCategora">Selecciona una categoría</div>
          <div className="iconcategoria">
            {/* Contenido del icono de categoría */}
          </div>
          <div className="categoria1">
            <input
              type="checkbox"
              name="categoria1"
              onChange={handleCheckboxChange}
            />
            <div className="categora1">Reforma Pensional</div>
          </div>
          <div className="categoria2">
            <input
              type="checkbox"
              name="categoria2"
              onChange={handleCheckboxChange}
            />
            <div className="categora1">Reforma a la Salud</div>
          </div>
          <div className="categoria3">
            <input
              type="checkbox"
              name="categoria3"
              onChange={handleCheckboxChange}
            />
            <div className="categora1">Reforma Laboral</div>
          </div>
          <div className="botonpublicar">
            <button className="publicar" onClick={handleButtonPublish}>
              Publicar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
