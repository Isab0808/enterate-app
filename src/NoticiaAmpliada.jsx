import "./styles/NoticiaAmpliada.css";
import { useState, useEffect } from "react";

import { IoArrowBackCircleOutline } from "react-icons/io5";

import { Media } from "./components/Media";

export function NoticiaAmpliada(props) {
  const [backMedia, setBackMedia] = useState(false);

  function differentClose() {
    setBackMedia(true);
  }

  return (
    <div>
      {backMedia ? (
        <Media />
      ) : (
        <div className="divmain-feed">
          <div className="divcerrar-feed">
            <a className="iconcerrar-feed" onClick={() => differentClose()}>
              <IoArrowBackCircleOutline size={30} />
            </a>
          </div>
          <div className="noticia-feed">
            <div
              className="noticia-ampliada-feed"
              key={props.data.id}
              id="noticia1Container"
            >
              <div className="title-new-ampliada-feed">
                {props.data.data.title}
              </div>
              <div className="content-new-ampliada-feed">
                {props.data.data.content}
              </div>
              <div className="img-container-ampliada-feed">
                <img
                  className="imgNew-ampliada-feed"
                  src={props.data.data.imgUrl}
                />
              </div>
              <div className="source-new-ampliada-feed">
                {props.data.data.source}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
