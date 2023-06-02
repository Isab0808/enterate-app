import "../styles/Category.css";

import { useState, useEffect } from "react";

import { db } from "../modules/firebase";
import { collection, addDoc } from "firebase/firestore";

import { AiOutlineCloseCircle } from "react-icons/ai";

export function Category(props) {
  const [categorias, setCategorias] = useState({
    categoria1: false,
    categoria2: false,
    categoria3: false,
    categoria4: false,
  });

  const [textareaValue, setTextareaValue] = useState("");

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  console.log(props.datos.data);

  const handleButtonPublish = () => {
    const categoriasTrue = Object.entries(categorias)
      .filter(([_, valor]) => valor === true)
      .map(([clave, _]) => clave);

    const datos = {
      description: textareaValue,
      title: props.datos.data.title,
      content: props.datos.data.content,
      source: props.datos.data.source,
      date: new Date(),
      imgUrl: "",
      categories: categoriasTrue,
    };

    const newsCollection = collection(db, "tendencias");

    addDoc(newsCollection, datos)
      .then((response) => {
        console.log(response);
        //cambiar de pestaña
      })
      .catch((error) => {
        console.error(error.message);
      });
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
            <p>{props.datos.data.title}</p>
          </div>
        </div>
        {/* <img className={styles.pestaafondoIcon} alt="" src="/pestaafondo.svg" /> */}
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
            <div className="categora1">Categoría 1</div>
          </div>
          <div className="categoria2">
            <input
              type="checkbox"
              name="categoria2"
              onChange={handleCheckboxChange}
            />
            <div className="categora1">Categoría 2</div>
          </div>
          <div className="categoria3">
            <input
              type="checkbox"
              name="categoria3"
              onChange={handleCheckboxChange}
            />
            <div className="categora1">Categoría 3</div>
          </div>
          <div className="categoria4">
            <input
              type="checkbox"
              name="categoria4"
              onChange={handleCheckboxChange}
            />
            <div className="categora1">Categoría 4</div>
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
