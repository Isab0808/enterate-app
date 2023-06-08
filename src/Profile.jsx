import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./modules/firebase.js";
import texture from "./images/texture-profile.png";
import photoDefault from "./images/profile.png";
import "./styles/Profile.css";

import { FiLogOut } from "react-icons/fi";
import { RxTable } from "react-icons/rx";

import { db } from "./modules/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export function Profile() {
  const [user, setUser] = useState(null);

  async function logout() {
    await signOut(auth).catch((error) => {
      console.error(error);
    });
  }

  useEffect(() => {
    auth.onAuthStateChanged(async (u) => {
      console.log(u);
      const u2 = {
        displayName: u.displayName,
        email: u.email,
        photoURL: u.photoURL,
      };
      if (u2.displayName == null) {
        const d = await getDocumentByEmail(u2.email);
        console.log(d);
        u2.displayName = d.name + " " + d.lastname;
      }
      if (u2.photoURL == null) {
        u2.photoURL = photoDefault;
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

  if (!user) {
    return null;
  }
  return (
    <div className="profile" id="profile">
      <div className="texture-profile">
        <a id="logout" className="logout" onClick={() => logout()}>
          <i>
            <FiLogOut size={25} />
          </i>
        </a>
        <div className="profile-img">
          <h3>Profile</h3>
          <img src={user.photoURL} alt="" />
          <h2>{user.displayName}</h2>
        </div>
        <img src={texture} alt="texture-profile" />
      </div>
      <div className="profile-content">
        <div className="options-profile">
          <a>
            <RxTable size={30} />
          </a>
        </div>
        <div className="profile-publish"></div>
      </div>
    </div>
  );
}
