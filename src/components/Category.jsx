import "../styles/Category.css";

import { useState, useEffect } from "react";

import { AiOutlineCloseCircle } from "react-icons/ai";

export function Category() {
  const [categorias, setCategorias] = useState({
    categoria1: false,
    categoria2: false,
    categoria3: false,
    categoria4: false,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCategorias((prevCategorias) => ({
      ...prevCategorias,
      [name]: checked,
    }));
  };

  useEffect(() => {
    console.log(categorias);
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
        </div>
        {/* <img className={styles.pestaafondoIcon} alt="" src="/pestaafondo.svg" /> */}
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
            <div className="botonpublicarChild" />
            <div className="publicar">Publicar</div>
          </div>
        </div>
        <div className="inputdescripccion" />
      </div>
    </div>
  );
}
