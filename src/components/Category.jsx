import "../styles/Category.css";

import { useState, useEffect } from "react";

import { v4 } from "uuid";

import { db } from "../modules/firebase";
import { collection, addDoc } from "firebase/firestore";
import { storage } from "../modules/firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { auth } from "../modules/firebase.js";

import { AiOutlineCloseCircle } from "react-icons/ai";
import { async } from "@firebase/util";

export function Category(props) {
  const [categorias, setCategorias] = useState({
    reforma_pensional: false,
    reforma_a_la_salud: false,
    reforma_laboral: false,
  });

  const [isOpen, setIsOpen] = useState(true);

  const [textareaValue, setTextareaValue] = useState("");

  const [user, setUser] = useState(null);

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  const saveText = async (categoriasTrue) => {
    const datos = {
      description: textareaValue,
      title: props.datos.data.title,
      content: props.datos.data.content,
      source: props.datos.data.source,
      imgUrl: "",
      category: categoriasTrue,
      type: "texto",
      author: user,
    };

    const newsCollection = collection(db, "tendencias");

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

  useEffect(() => {
    auth.onAuthStateChanged(async (u) => {
      const u2 = {
        displayName: u.displayName,
        email: u.email,
      };
      if (u2.displayName == null) {
        const d = await getDocumentByEmail(u2.email);
        console.log(d);
        u2.displayName = d.name + " " + d.lastname;
      }
      setUser(u2);
    });
  }, []);

  async function getDocumentByEmail(email) {
    const noticiasCollection = collection(db, "users");
    const q = query(noticiasCollection, where("email", "==", email));

    try {
      const querySnapshot = await getDocs(q);
      let documents = {};
      querySnapshot.forEach((doc) => {
        // Aquí puedes obtener los datos de cada documento que coincide con el correo electrónico
        const data = doc.data();
        documents = {
          name: data.name,
          lastname: data.lastname,
        };
      });
      return documents;
    } catch (error) {
      console.error("Error al obtener los documentos:", error);
      return [];
    }
  }

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

  async function uploadData(url, categoriasTrue) {
    const newsCollection = collection(db, "news");
    addDoc(newsCollection, {
      author: user.displayName,
      description: textareaValue,
      download: url,
      category: categoriasTrue,
      type: "video",
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
    console.log(Object.entries(categorias));
    const categoriasTrue = Object.entries(categorias)
      .filter(([_, valor]) => valor === true)
      .map(([clave, _]) => clave)
      .map((valor) => valor.replace("_", " "))
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1));

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
              name="reforma_pensional"
              onChange={handleCheckboxChange}
            />
            <div className="categora1">Reforma Pensional</div>
          </div>
          <div className="categoria2">
            <input
              type="checkbox"
              name="reforma_a_la_salud"
              onChange={handleCheckboxChange}
            />
            <div className="categora1">Reforma a la Salud</div>
          </div>
          <div className="categoria3">
            <input
              type="checkbox"
              name="reforma_laboral"
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
