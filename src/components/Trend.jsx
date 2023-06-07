import { useState, useEffect } from "react";
import "../styles/Media.css";

import { collection, getDocs } from "firebase/firestore";
import { db, storage } from "../modules/firebase";

import { AiOutlineHeart, AiOutlineSave } from "react-icons/ai";

export function Trend() {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    getTrends();
  }, []);

  function getTrends() {
    const newsCollection = collection(db, "tendencias");
    getDocs(newsCollection)
      .then((response) => {
        const tr = response.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
        setTrends(tr);
      })
      .catch((error) => console.log(error.message));
    return newsCollection;
  }

  const handleLike = (id) => {
    // Lógica para manejar el evento de "Me gusta"
    console.log("Me gusta: ", id);
  };

  const handleSave = (id) => {
    // Lógica para manejar el evento de "Guardar"
    console.log("Guardar: ", id);
  };

  return (
    <div>
      <div className="news" id="news">
        <div>
          {trends.map((item) => {
            return (
              <div className="content-media" key={item.id}>
                <div className="multimedia">
                  <img src={item.data.imgUrl} />
                </div>
                <div className="description">
                  <div className="actions">
                    <button
                      className="action-button"
                      onClick={() => handleLike(item.id)}
                    >
                      <AiOutlineHeart />
                    </button>
                    <button
                      className="action-button"
                      onClick={() => handleSave(item.id)}
                    >
                      <AiOutlineSave />
                    </button>
                  </div>
                  <h6>{item.data.category}</h6>
                  <h4 id="short-description">{item.data.title}</h4>
                  <p>
                    {item.data.content}
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
